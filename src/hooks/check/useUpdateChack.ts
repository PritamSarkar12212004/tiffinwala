import api from "@/src/utils/api/Axios";
import { userContext } from "@/src/utils/context/ContextApi";
import * as Application from "expo-application";

const useUpdateChack = () => {
  const { setIsUpdateAvailable } = userContext();
  const appId = Application.applicationId;
  const appName = Application.applicationName;
  const appVersion = Application.nativeApplicationVersion;
  const checkUpdate = async () => {
    try {
      const data = await api.post("/api/check/app-version", {
        appId,
        appName,
        appVersion,
      });
      if (data.data.update) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
  return { checkUpdate };
};

export default useUpdateChack;
