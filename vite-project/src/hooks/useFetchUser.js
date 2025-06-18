import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BACKEND_LIVE;

const useFetchUser = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // fix initial value

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/admin/auth/getAllAdmin`);
        console.log("Fetched user data:", res.data.data); // ✅ See actual array
        setUser(res.data.data); // ✅ Set correct data
      } catch (err) {
        console.error("Failed to fetch users", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};

export default useFetchUser;
