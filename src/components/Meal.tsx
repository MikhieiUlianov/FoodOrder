import { MealType, useCartContext } from "../store/cart-context.js";
import { currencyFormatter } from "../util/formatting.jsx";
import Button from "./UI/Button.jsx";
type MealProps = {
  meal: MealType;
};
export default function Meal({ meal }: MealProps) {
  const { onAdd } = useCartContext();

  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt="alt for img" />
        <div>
          <h3>{meal.name}</h3>

          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={() => onAdd(meal)}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
