import { useEffect, useState, useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../providers/AuthProvider";

export default function useRole() {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.accessToken) return;

    axiosSecure("/get-user-role")
      .then((res) => {
        setRole(res.data.role);
      })
      .catch((err) => {
        console.error("Failed to fetch role", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user?.accessToken]);

  return { role, loading };
}
