import { useEffect, useState } from "react";

import { useGetMeals } from "../hooks/useHttp";
import Meal from "./Meal";
import { MealType } from "../store/CartContext";

export default function Meals() {
  const [meals, setMeals] = useState<MealType[]>([]);

  const { process, request, setProcess, clearError } = useGetMeals();

  useEffect(() => {
    clearError();
    request()
      .then((meals) => setMeals(meals))
      .then(() => setProcess("success"));
  }, []);

  return (
    <ul id="meals">
      {process === "error" && <p>Error</p>}
      {process === "loading" && <p>Loading...</p>}
      {process !== "loading" &&
        process !== "error" &&
        meals.map((meal) => <Meal key={meal.id} meal={meal} />)}
    </ul>
  );
}
