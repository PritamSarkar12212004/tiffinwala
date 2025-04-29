import api from "@/src/utils/api/Axios";

const useViewsProductApi = () => {
  const viewsProduct = async (postId: string) => {
    await api.post("/api/product/views-product", {
      postId,
    });
  };

  return { viewsProduct };
};

export default useViewsProductApi;
