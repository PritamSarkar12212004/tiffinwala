import compressImage from "@/src/functions/compresser/ImageCompreser";
import api from "@/src/utils/api/Axios";
import uploadToCloudinary from "@/src/utils/cloudinary/Cloudinary";
import {
  getTemData,
  removeTemData,
  setFullData,
  setLocationData,
} from "@/src/functions/storage/Storage";
import AuthToken from "@/src/constants/token/AuthToken";
import { Alert } from "react-native";
import { userContext } from "@/src/utils/context/ContextApi";
import { useRouter } from "expo-router";
import UtilsToken from "@/src/constants/token/UtilsToken";
const useCreateProfile = () => {
  const router = useRouter();
  const { setUserProfile, setUserTemLocation } = userContext();
  const createProfile = async (
    formData: any,
    image: any,
    setIsLoading: any,
    setUploadingProduct: any,
    setUploadDoneModal: any
  ) => {
    setIsLoading(true);
    const compressImageFunction = await compressImage(image);
    if (!compressImageFunction) {
      Alert.alert("Error", "Please upload a valid image");
      setIsLoading(false);
      return;
    } else {
      const cloudinaryResponse = await uploadToCloudinary(
        compressImageFunction,
        "image"
      );
      await api
        .post("/api/user/profile-create", {
          profileData: formData,
          image: cloudinaryResponse,
          phone: getTemData(AuthToken.TemLogin),
        })
        .then((res) => {
          setFullData(AuthToken.UserInfo, res.data.data);
          setUserProfile(res.data.data);
          setLocationData(UtilsToken.Location, res.data.data.User_Address);
          setUserTemLocation(res.data.data.User_Address);
          removeTemData(AuthToken.TemLogin);
          setIsLoading(false);
          setUploadDoneModal(true);
          setTimeout(() => {
            router.replace("/(main)/(tab)" as any);
          }, 1000);
        })
        .catch((err) => {
          if (err.status === 400) {
            Alert.alert("Error", "User already exists please sign in");
          } else if (err.status === 500) {
            Alert.alert("Error", "Server Error");
          }
          setIsLoading(false);
          setUploadingProduct(false);
        })
        .finally(() => {
          setIsLoading(false);
          setUploadingProduct(false);
        });
    }
  };
  return { createProfile };
};

export default useCreateProfile;
