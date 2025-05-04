import api from "@/src/utils/api/Axios";
import { userContext } from "@/src/utils/context/ContextApi";

const likeFetchData = () => {
  const { setIsSubPagePopUpVisible } = userContext();
  const likeProductFetch = async (
    userId: string,
    productId: string,
    setIsFavorite: any
  ) => {
    try {
      const res = await api.post("/api/product/like-fetch-product", {
        userId,
        productId,
      });
      if (res.data.isLiked) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
      return res.data;
    } catch (error) {
      setIsSubPagePopUpVisible({
        status: true,
        message: "Something went wrong",
      });
    }
  };
  return {
    likeProductFetch,
  };
};

export default likeFetchData;
