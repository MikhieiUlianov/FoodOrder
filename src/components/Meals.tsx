import { useEffect, useState } from "react";
import getMeals from "../hooks/useHttp";
import Meal from "./Meal";

export type MealType = {
  id?: string;
  name: string;
  price: string;
  description: string;
  image: string;
};

export default function Meals() {
  const [meals, setMeals] = useState<MealType[]>([]);

  const { process, request, setProcess, clearError } = getMeals();

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
        meals.map(({ id, name, price, description, image }) => (
          <Meal
            key={id}
            name={name}
            price={price}
            description={description}
            image={image}
          />
        ))}
    </ul>
  );
}
