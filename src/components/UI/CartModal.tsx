import { useState } from "react";

import { useCartContext } from "../../store/cart-context";
import Modal from "./Modal";
import Button from "./Button";
import { currencyFormatter } from "../../util/formatting";

type CartModalProps = {
  setIsModalActive: (arg: boolean) => void;
  isModalActive: boolean;
};
export default function CartModal({
  isModalActive,
  setIsModalActive,
}: CartModalProps) {
  const [isFormActive, setIsFormActive] = useState(false);

  const { meals, onAdd, onRemove, mealsTotalPrice } = useCartContext();

  return (
    <>
      <Modal isOpen={isModalActive} className="cart">
        <h2>Your Cart</h2>
        <ul>
          {meals.map((meal) => (
            <li className="cart-item" key={meal.name}>
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
            onClick={() => setIsModalActive(false)}
          >
            Close
          </Button>
          <Button onClick={() => setIsFormActive(true)}>Go to Checkout</Button>
        </div>
      </Modal>
    </>
  );
}
