import AuthToken from "@/src/constants/token/AuthToken";
import { getFullData } from "@/src/functions/storage/Storage";
import api from "@/src/utils/api/Axios";

const useFilterProductApi = () => {
  const filterProduct = async (filters: any, setData: any) => {
    const fullLogin = await getFullData(AuthToken.UserInfo);
    try {
      const response = await api
        .post("/api/product/filter-data-product", {
          filters,
          locationData: fullLogin.User_Address,
        })
        .then((res) => {
          setData(res.data.products);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return {
    filterProduct,
  };
};

export default useFilterProductApi;
