import api from "@/src/utils/api/Axios";
import { userContext } from "@/src/utils/context/ContextApi";

const useLikeProductApi = () => {
  const { setIsSubPagePopUpVisible } = userContext();
  const likeController = async (
    userId: string,
    productId: string,
    isFavorite: boolean,
    setIsFavorite: (isFavorite: boolean) => void
  ) => {
    try {
      api
        .post("/api/product/like-product", {
          userId,
          productId,
        })
        .then((res) => {
          if (res.data.message === "liked") {
            setIsFavorite(true);
          } else {
            setIsFavorite(false);
          }
        })
        .catch((err) => {
          setIsSubPagePopUpVisible({
            status: true,
            message: "Error liking product",
          });
        });
    } catch (error) {
      setIsSubPagePopUpVisible({
        status: true,
        message: "Error liking product",
      });
    }
  };

  return { likeController };
};

export default useLikeProductApi;
