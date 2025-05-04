import api from "@/src/utils/api/Axios";
import { userContext } from "@/src/utils/context/ContextApi";

const useSearchEngine = () => {
  const { locationSearch, setIsSubPagePopUpVisible } = userContext();
  const searchEngine = (query: string, setResults: any, setLoading: any) => {
    api
      .post("/api/search/main-engine", {
        query,
        location: locationSearch,
      })
      .then((res) => {
        setResults(res.data.products);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((err) => {
        setIsSubPagePopUpVisible({
          status: true,
          message: "Error searching product",
        });
      });
  };

  return {
    searchEngine,
  };
};

export default useSearchEngine;
