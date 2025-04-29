import AuthToken from "@/src/constants/token/AuthToken";
import { getFullData } from "@/src/functions/storage/Storage";
import api from "@/src/utils/api/Axios";
import { userContext } from "@/src/utils/context/ContextApi";

const useFetchProduct = () => {
  const { setTotalLikes, setTotalViews } = userContext();
  const fetchProduct = async ({ setProduct, setLoading }: any) => {
    const fullLoginId = await getFullData(AuthToken.UserInfo);
    await api
      .post("/api/product/fetch-product", {
        id: fullLoginId._id,
      })
      .then((res) => {
        setProduct(res.data.data);
        setTotalLikes(res.data?.totalLikesCount || 0);
        setTotalViews(res.data?.totalViewsCount || 0);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return { fetchProduct };
};

export default useFetchProduct;
