import api from "@/src/utils/api/Axios";

const useUserFetchData = () => {
  const fetchUserData = (userId: string, setVenderData: any) => {
    api
      .post("/api/user/fetch-userData", {
        userId,
      })
      .then((res) => {
        setVenderData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return {
    fetchUserData,
  };
};

export default useUserFetchData;
