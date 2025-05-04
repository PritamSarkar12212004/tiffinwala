import api from "@/src/utils/api/Axios";
import { userContext } from "@/src/utils/context/ContextApi";

const useViewsProductApi = () => {
  const { setIsSubPagePopUpVisible } = userContext();
  const viewsProduct = async (postId: string) => {
    try {
      await api.post("/api/product/views-product", {
        postId,
      });
    } catch (error) {
      setIsSubPagePopUpVisible({
        status: true,
        message: "Something went wrong",
      });
    }
  };

  return { viewsProduct };
};

export default useViewsProductApi;
