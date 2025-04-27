import api from "@/src/utils/api/Axios";

const likeFetchData = () => {
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
      console.log(error);
    }
  };
  return {
    likeProductFetch,
  };
};

export default likeFetchData;
