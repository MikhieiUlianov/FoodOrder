import { useCallback, useState } from "react";
import { MealType } from "../store/cart-context";

type Status = "waiting" | "loading" | "error" | "success";

type FormData = {
  order: {
    items: MealType[];
    customer: {
      name: string | null;
      email: string | null;
      street: string | null;
      "postal-code": string | null;
      city: string | null;
    };
  };
};
export function useGetMeals() {
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

export function usePostFormData() {
  const [process, setProcess] = useState<Status>("waiting");

  const request = useCallback(async (formData: FormData) => {
    setProcess("loading");
    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

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
