import api from "@/src/utils/api/Axios";
import { useNavigation } from "expo-router";

const useUserFetchData = () => {
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
          console.log(err);
          navigation.goBack();
        });
    } catch (error) {
      console.log(error);
      navigation.goBack();
    }
  };
  return {
    fetchUserData,
  };
};

export default useUserFetchData;
