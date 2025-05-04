import api from "@/src/utils/api/Axios";
import { userContext } from "@/src/utils/context/ContextApi";
const useDeleteProductApi = () => {
  const { setProductReloader, setIsSubPagePopUpVisible } = userContext();
  const deleteProduct = async (productId: string, setDeleteLoading: any) => {
    if (!productId) console.log("productId is null");
    await api
      .post("/api/product/delete-product", {
        productId: productId,
      })
      .then((res) => {
        setProductReloader(res.data);
        setDeleteLoading(false);
      })
      .catch((err) => {
        setIsSubPagePopUpVisible({
          status: true,
          message: "Error deleting product",
        });
        setDeleteLoading(false);
      });
  };
  return {
    deleteProduct,
  };
};

export default useDeleteProductApi;
