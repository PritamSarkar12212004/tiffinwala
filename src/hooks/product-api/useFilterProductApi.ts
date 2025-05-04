import AuthToken from "@/src/constants/token/AuthToken";
import { getFullData } from "@/src/functions/storage/Storage";
import api from "@/src/utils/api/Axios";
import { userContext } from "@/src/utils/context/ContextApi";

const useFilterProductApi = () => {
  const { setIsSubPagePopUpVisible } = userContext();
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
          setIsSubPagePopUpVisible({
            status: true,
            message: "Error filtering product",
          });
        });
    } catch (error) {
      setIsSubPagePopUpVisible({
        status: true,
        message: "Error filtering product",
      });
    }
  };
  return {
    filterProduct,
  };
};

export default useFilterProductApi;
