import { useCallback, useState } from "react";

type Status = "waiting" | "loading" | "error" | "success";

export default function getMeals() {
  const [process, setProcess] = useState<Status>("waiting");

  const request = useCallback(async () => {
    setProcess("loading");
    try {
      const response = await fetch("http://localhost:3000/meals");

      if (!response.ok) {
        throw new Error("Fetching error");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  function clearError() {
    setProcess("waiting");
  }

  return { request, process, setProcess, clearError };
}
