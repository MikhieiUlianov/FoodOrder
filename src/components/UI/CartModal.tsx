import { useContext } from "react";

import { useCartContext } from "../../store/CartContext";
import Modal from "./Modal";
import Button from "./Button";
import { currencyFormatter } from "../../util/formatting";
import UserProgressContext from "../../store/UserProgressContext";

export default function CartModal() {
  const { meals, onAdd, onRemove, mealsTotalPrice } = useCartContext();
  const { progress, setUserProgress } = useContext(UserProgressContext);

  return (
    <Modal isOpen={progress === "cart"} className="cart">
      <h2>Your Cart</h2>
      <ul>
        {meals.map((meal) => (
          <li className="cart-item" key={meal.id}>
            <p>
              {meal.name}-{meal.quantity}x{" "}
              {currencyFormatter.format(meal.price)}
            </p>
            <p className="cart-item-actions">
              <button onClick={() => onRemove(meal.id)}>-</button>
              {meal.quantity}
              <button onClick={() => onAdd(meal)}>+</button>
            </p>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        {currencyFormatter.format(mealsTotalPrice)}
      </div>
      <div className="modal-actions">
        <Button
          textOnly
          className="text-button"
          onClick={() => setUserProgress("")}
        >
          Close
        </Button>
        {meals.length > 0 && (
          <Button onClick={() => setUserProgress("checkout")}>
            Go to Checkout
          </Button>
        )}
      </div>
    </Modal>
  );
}
