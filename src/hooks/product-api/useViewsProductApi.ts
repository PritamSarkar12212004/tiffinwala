import api from "@/src/utils/api/Axios";
import { useNavigation } from "expo-router";

const useViewsProductApi = () => {
  const navigation = useNavigation();
  const viewsProduct = async (postId: string) => {
    try {
      await api.post("/api/product/views-product", {
        postId,
      });
    } catch (error) {
      console.log(error);
      navigation.goBack();
    }
  };

  return { viewsProduct };
};

export default useViewsProductApi;
