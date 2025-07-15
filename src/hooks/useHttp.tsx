import { useCallback, useEffect, useState } from "react";
import { MealType } from "../store/CartContext";

// Define payload shape
export type CustomerType = {
  name: string;
  email: string;
  street: string;
  "postal-code": string;
  city: string;
};

type OrderPayload = {
  order: {
    items: MealType[];
    customer: CustomerType;
  };
};

type Config = {
  method: string;
  body?: OrderPayload; // body is optional, especially for GET
  headers?: Record<string, string>;
};

// Generic response type for useHttp
async function sendHttpRequest<T = unknown>(
  url: string,
  config: Config
): Promise<T> {
  const response = await fetch(url, {
    method: config.method,
    headers: config.headers,
    body: config.body ? JSON.stringify(config.body) : undefined,
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong, failed to send request."
    );
  }

  return resData;
}

// Hook with generic <T> for response type
export default function useHttp<T>(
  url: string,
  config: Config,
  initialData: T
) {
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async (payload?: OrderPayload) => {
      setIsLoading(true);
      setError(null);
      try {
        const resData = await sendHttpRequest<T>(url, {
          ...config,
          body: payload, // payload is passed in here
        });
        setData(resData);
      } catch (err: any) {
        setError(err.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if (!config.body && config.method === "GET") {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
}
