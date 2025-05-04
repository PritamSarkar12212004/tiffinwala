import { useState } from "react";
import ImageCompreser from "../../functions/compresser/ImageCompreser";
import { PostData } from "@/src/components/interface/AllInterface";
import uploadToCloudinary from "@/src/utils/cloudinary/Cloudinary";
import { getFullData } from "@/src/functions/storage/Storage";
import AuthToken from "@/src/constants/token/AuthToken";
import api from "@/src/utils/api/Axios";
import { useNavigation } from "expo-router";
import { userContext } from "@/src/utils/context/ContextApi";

const useCreateProductApi = () => {
  const { setProductReloader, setIsSubPagePopUpVisible } = userContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploadedMenuItems, setUploadedMenuItems] = useState<string[]>([]);
  const navigation = useNavigation();
  const uploadProduct = async (
    data: PostData,
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
            setIsSubPagePopUpVisible({
              status: true,
              message: "Error compressing image",
            });
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
            setIsSubPagePopUpVisible({
              status: true,
              message: "Error compressing menu item image:",
            });
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
            setIsSubPagePopUpVisible({
              status: true,
              message: "Error uploading image to Cloudinary:",
            });
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
            setIsSubPagePopUpVisible({
              status: true,
              message: "Error uploading menu item image to Cloudinary:",
            });
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
        .post("/api/product/create-product", finalData)
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
          setIsSubPagePopUpVisible({
            status: true,
            message: "Error uploading product",
          });
        });

      return finalData;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to upload product";
      setIsSubPagePopUpVisible({
        status: true,
        message: "Error uploading product",
      });
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
    uploadProduct,
    isLoading,
    error,
    progress,
    uploadedImages,
    uploadedMenuItems,
  };
};

export default useCreateProductApi;
