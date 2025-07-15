import useHttp from "../hooks/useHttp";
import Meal from "./Meal";
import { MealType } from "../store/CartContext";
import { useMemo } from "react";

export default function Meals() {
  const config = useMemo(() => ({ method: "GET" }), []);
  const {
    error,
    isLoading,
    data: meals,
  } = useHttp<MealType[]>("http://localhost:3000/meals", config, []);

  return (
    <ul id="meals">
      {error && <p>Error</p>}
      {isLoading && <p>Loading...</p>}
      {!error &&
        !isLoading &&
        meals.map((meal) => <Meal key={meal.id} meal={meal} />)}
    </ul>
  );
}
