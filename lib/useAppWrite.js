import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function useAppWrite(fn) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof fn !== "function") return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fn();
        if (!response) throw new Error("No data returned");
        setData(response);
      } catch (error) {
        Alert.alert("Error", error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const refetch = () => fetchData();
  return { data, refetch };
}


