import api from "@/src/utils/api/Axios";
import { userContext } from "@/src/utils/context/ContextApi";

const useSearchEngine = () => {
  const { locationSearch } = userContext();
  const searchEngine = (query: string, setResults: any) => {
    api
      .post("/api/search/main-engine", {
        query,
        location: locationSearch,
      })
      .then((res) => {
        setResults(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    searchEngine,
  };
};

export default useSearchEngine;
