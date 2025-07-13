import { MealType } from "./Meals.jsx";
import { currencyFormatter } from "../util/formatting.jsx";
import Button from "./UI/Button.jsx";

export default function Meal({ name, price, description, image }: MealType) {
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${image}`} alt="alt for img" />
        <div>
          <h3>{name}</h3>

          <p className="meal-item-price">{currencyFormatter.format(price)}</p>
          <p className="description">{description}</p>
        </div>
        <p className="meal-item-actions">
          <Button>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
