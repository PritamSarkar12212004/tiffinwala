import { getFullData } from "@/src/functions/storage/Storage";
import AuthToken from "@/src/constants/token/AuthToken";
import api from "@/src/utils/api/Axios";
const useMainDataFetch = () => {
  const fullLogin = getFullData(AuthToken.UserInfo);
  const fetchMainData = async (setMainData: any, setLoading: any) => {
    api
      .post("/api/product/fetch-mainData-product", {
        locationData: fullLogin.User_Address,
      })
      .then((res) => {
        if (!res.data.products) {
          setMainData(false);
          setLoading(false);
        }
        setMainData(res.data.products);
        setLoading(false);

      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return {
    fetchMainData,
  };
};

export default useMainDataFetch;
