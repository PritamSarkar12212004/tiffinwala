import api from "@/src/utils/api/Axios";
import { userContext } from "@/src/utils/context/ContextApi";

const useStatusProductApi = () => {
  const { setProductReloader } = userContext();

  const updateStatus = async (
    productId: string,
    setStatusLoading: any,
    postStatus: string
  ) => {
    try {
      await api
        .post("/api/product/status-product", {
          productId,
          postStatus,
        })
        .then((res) => {
          setStatusLoading(false);
          setProductReloader(res.data);
        })
        .catch((err) => {
          console.log(err);
          setStatusLoading(false);
        });
    } catch (error) {
      console.error("Error updating product status:", error);

      throw error;
    }
  };
  return {
    updateStatus,
  };
};

export default useStatusProductApi;
