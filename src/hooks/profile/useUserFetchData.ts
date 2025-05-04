import api from "@/src/utils/api/Axios";
import { userContext } from "@/src/utils/context/ContextApi";
import { useNavigation } from "expo-router";

const useUserFetchData = () => {
  const { setIsSubPagePopUpVisible } = userContext();
  const navigation = useNavigation();
  const fetchUserData = (userId: string, setVenderData: any) => {
    try {
      api
        .post("/api/user/fetch-userData", {
          userId,
        })
        .then((res) => {
          setVenderData(res.data.data);
        })
        .catch((err) => {
          setIsSubPagePopUpVisible({
            status: true,
            message: "Something went wrong",
          });
        });
    } catch (error) {
      setIsSubPagePopUpVisible({
        status: true,
        message: "Something went wrong",
      });
    }
  };
  return {
    fetchUserData,
  };
};

export default useUserFetchData;
