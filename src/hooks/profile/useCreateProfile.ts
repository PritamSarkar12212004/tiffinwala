import compressImage from "@/src/functions/compresser/ImageCompreser";
import api from "@/src/utils/api/Axios";
import uploadToCloudinary from "@/src/utils/cloudinary/Cloudinary";
import {
  getTemData,
  removeTemData,
  setFullData,
} from "@/src/functions/storage/Storage";
import AuthToken from "@/src/constants/token/AuthToken";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { userContext } from "@/src/utils/context/ContextApi";

const useCreateProfile = () => {
  const router = useRouter();
  const { setUserProfile } = userContext();
  const createProfile = async (
    formData: any,
    image: any,
    setIsLoading: any
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
          removeTemData(AuthToken.TemLogin);
          setIsLoading(false);
          router.replace("/(main)/(tab)" as any);
        })
        .catch((err) => {
          if (err.status === 400) {
            Alert.alert("Error", "User already exists please sign in");
          } else if (err.status === 500) {
            Alert.alert("Error", "Server Error");
          }
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  return { createProfile };
};

export default useCreateProfile;
