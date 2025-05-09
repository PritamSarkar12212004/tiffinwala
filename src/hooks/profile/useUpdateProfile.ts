import { Alert } from "react-native";
import compressImage from "@/src/functions/compresser/ImageCompreser";
import uploadToCloudinary from "@/src/utils/cloudinary/Cloudinary";
import api from "@/src/utils/api/Axios";
import { userContext } from "@/src/utils/context/ContextApi";
import {
  removeFullData,
  removeLocationData,
  setFullData,
  setLocationData,
} from "@/src/functions/storage/Storage";
import AuthToken from "@/src/constants/token/AuthToken";
import { useNavigation } from "expo-router";
import UtilsToken from "@/src/constants/token/UtilsToken";

const useUpdateProfile = () => {
  const { userProfile, setUserProfile } = userContext();
  const navigation = useNavigation();
  const updateProfile = async (
    profile: any,
    setIsLoading: any,
    setUploadingProduct: any,
    setUploadDoneModal: any
  ) => {
    try {
      const { profileImage } = profile;
      const compressImageFunction = await compressImage(profileImage);
      if (!compressImageFunction) {
        Alert.alert("Error", "Please upload a valid image");
        setIsLoading(false);
        return;
      } else {
        const cloudinaryResponse = await uploadToCloudinary(
          compressImageFunction,
          "image"
        );
        const response = await api.post("/api/user/profile-update", {
          profileData: profile,
          image: cloudinaryResponse,
          id: userProfile?._id,
        });

        if (response.data.success) {
          // First update the storage and context
          await removeFullData(AuthToken.UserInfo);
          await setFullData(AuthToken.UserInfo, response.data.data);
          setUserProfile(response.data.data);
          removeLocationData(UtilsToken.Location);
          setLocationData(UtilsToken.Location, response.data.data.User_Address);

          setUploadDoneModal(true);
          setTimeout(() => {
            setUploadingProduct(false);
            setIsLoading(false);
            navigation.goBack();
          }, 1000);
        } else {
          setUploadingProduct(false);
          Alert.alert("Error", "Failed to update profile");
          setIsLoading(false);
        }
      }
    } catch (error) {
      setUploadingProduct(false);
      console.log(error);
      Alert.alert("Error", "Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };
  return { updateProfile };
};

export default useUpdateProfile;
