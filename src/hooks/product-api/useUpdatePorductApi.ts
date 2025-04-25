import { useState } from "react";
import ImageCompreser from "../../functions/compresser/ImageCompreser";
import { PostData2 } from "@/src/components/interface/AllInterface";
import uploadToCloudinary from "@/src/utils/cloudinary/Cloudinary";
import { getFullData } from "@/src/functions/storage/Storage";
import AuthToken from "@/src/constants/token/AuthToken";
import api from "@/src/utils/api/Axios";
import { useNavigation } from "expo-router";
import { userContext } from "@/src/utils/context/ContextApi";

const useUpdatePorductApi = () => {
  const { setProductReloader } = userContext();

  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploadedMenuItems, setUploadedMenuItems] = useState<string[]>([]);
  const navigation = useNavigation();
  const updateProduct = async (
    data: PostData2,
    setUploadingProduct: any,
    setUploadDoneModal: any
  ) => {
    const fullLoginId = getFullData(AuthToken.UserInfo);

    try {
      setError(null);
      setProgress(0);
      setUploadedImages([]);
      setUploadedMenuItems([]);

      const {
        productId,
        address,
        availableDays,
        description,
        images,
        foodTypes,
        latitude,
        longitude,
        mealTypes,
        menuItems,
        price,
        title,
      } = data;

      // Calculate total steps for progress tracking
      const totalSteps = images.length + menuItems.length;
      let completedSteps = 0;

      // Compress all images in parallel with progress tracking
      const compressedImages = await Promise.all(
        images.map(async (image: string) => {
          try {
            const compressed = await ImageCompreser(image);
            completedSteps++;
            setProgress((completedSteps / totalSteps) * 100);
            return compressed;
          } catch (err) {
            console.error("Error compressing image:", err);
            completedSteps++;
            setProgress((completedSteps / totalSteps) * 100);
            return image; // Return original image if compression fails
          }
        })
      );

      // Compress menu item images in parallel with progress tracking
      const compressedMenuItems = await Promise.all(
        menuItems.map(async (item) => {
          try {
            const compressedImage = await ImageCompreser(item.image);
            completedSteps++;
            setProgress((completedSteps / totalSteps) * 100);
            return {
              ...item,
              image: compressedImage,
            };
          } catch (err) {
            console.error("Error compressing menu item image:", err);
            completedSteps++;
            setProgress((completedSteps / totalSteps) * 100);
            return item; // Return original item if compression fails
          }
        })
      );

      // Upload main images to Cloudinary
      const mainImageUploadPromises = compressedImages.map((image) =>
        uploadToCloudinary(image, "image")
          .then((url) => {
            setUploadedImages((prev) => [...prev, url]);
            return url;
          })
          .catch((err) => {
            console.error("Error uploading image to Cloudinary:", err);
            throw err;
          })
      );

      // Upload menu item images to Cloudinary
      const menuItemUploadPromises = compressedMenuItems.map((item) =>
        uploadToCloudinary(item.image, "image")
          .then((url) => {
            setUploadedMenuItems((prev) => [...prev, url]);
            return { ...item, image: url };
          })
          .catch((err) => {
            console.error(
              "Error uploading menu item image to Cloudinary:",
              err
            );
            throw err;
          })
      );

      // Wait for all uploads to complete
      const [uploadedMainImages, uploadedMenuItemsWithUrls] = await Promise.all(
        [
          Promise.all(mainImageUploadPromises),
          Promise.all(menuItemUploadPromises),
        ]
      );

      // Create final data with uploaded image URLs
      const finalData = {
        productId,
        title,
        description,
        price,
        foodTypes,
        images: uploadedMainImages, // This will now be an array of URLs
        address,
        latitude,
        longitude,
        availableDays,
        mealTypes,
        menuItems: uploadedMenuItemsWithUrls,
        userId: fullLoginId._id,
      };

      // call api to upload product

      api
        .post("/api/product/update-product", finalData)
        .then((res) => {
          setProductReloader(res.data);

          setUploadDoneModal(true);
          setTimeout(() => {
            setUploadingProduct(false);
            navigation.goBack();
          }, 1000);
        })
        .catch((err) => {
          setUploadingProduct(false);
          console.log(err);
        });

      return finalData;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to upload product";
      console.error("Error in uploadProduct:", errorMessage);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setTimeout(() => {
        setUploadingProduct(false);
      }, 1000);
      setProgress(0);
    }
  };

  return {
    updateProduct,
    error,
    progress,
    uploadedImages,
    uploadedMenuItems,
  };
};

export default useUpdatePorductApi;
