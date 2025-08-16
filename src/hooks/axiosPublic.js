import axios from "axios";

const useAxiosPublic = () => {
  const instance = axios.create({
    baseURL: "https://for-mission-scic11-server-template.vercel.app/",
  });

  return instance;
};

export default useAxiosPublic;
