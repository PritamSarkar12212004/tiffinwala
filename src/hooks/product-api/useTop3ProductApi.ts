import AuthToken from "@/src/constants/token/AuthToken";
import { getFullData } from "@/src/functions/storage/Storage";
import api from "@/src/utils/api/Axios";
import { userContext } from "@/src/utils/context/ContextApi";

const useTop3ProductApi = () => {
  const { setIsSubPagePopUpVisible } = userContext();
  const top3ProductFinder = async (setData: any) => {
    const fullLogin = await getFullData(AuthToken.UserInfo);
    await api
      .post("/api/product/filter-top-3-product", {
        locationData: fullLogin.User_Address,
      })
      .then((res) => {
        setData(res.data.products);
      })
      .catch((err) => {
        setIsSubPagePopUpVisible({
          status: true,
          message: "Something went wrong",
        });
      });
  };
  return {
    top3ProductFinder,
  };
};

export default useTop3ProductApi;
