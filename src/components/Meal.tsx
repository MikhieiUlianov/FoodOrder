import { MealType } from "./Meals";

export default function Meal({ name, price, description, image }: MealType) {
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${image}`} alt="alt for img" />
        <div>
          <h3>{name}</h3>

          <p className="meal-item-price">{price}</p>
          <p className="description">{description}</p>
        </div>
        <p className="meal-item-actions">
          <button>Add to Cart</button>
        </p>
      </article>
    </li>
  );
}
