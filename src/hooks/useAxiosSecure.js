import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";

const instance = axios.create({
  // baseURL: "https://for-mission-scic11-server-template.vercel.app/",
  baseURL: "https://for-mission-scic11-server-template.vercel.app/",
});

const useAxiosSecure = () => {
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (user?.accessToken && !loading) {
      console.log("🚀 ~ useAxiosSecure ~ accessToken:", user.accessToken);

      const requestInterceptor = instance.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${user?.accessToken}`;
        console.log(config);
        return config;
      });

      return () => {
        instance.interceptors.request.eject(requestInterceptor);
      };
    }
  }, [loading, user]);

  return instance;
};

export default useAxiosSecure;
