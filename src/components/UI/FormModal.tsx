import { useCartContext } from "../../store/cart-context";
import Input from "./Input";
import Modal from "./Modal";
import Button from "./Button";
import { currencyFormatter } from "../../util/formatting";

type FormModalProps = {
  isFormActive: boolean;
  setIsFormActive: (arg: boolean) => void;
};

export default function FormModal({
  isFormActive,
  setIsFormActive,
}: FormModalProps) {
  const { mealsTotalPrice } = useCartContext();
  return (
    <Modal isOpen={isFormActive}>
      <div>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(mealsTotalPrice)}</p>
      </div>
      <Input id="name" label="Full Name" type="text" />
      <Input id="emailname" label="E-Mail Address" type="email" />
      <Input id="street" label="Street" type="text" />
      <div className="control-row">
        <Input id="code" label="Postal Code" type="text" />
        <Input id="city" label="City" type="text" />
      </div>

      <div className="modal-actions">
        <Button
          textOnly
          className="text-button"
          onClick={() => setIsFormActive(false)}
        >
          Close
        </Button>
        <Button onClick={() => setIsFormActive(false)}>Go to Checkout</Button>
      </div>
    </Modal>
  );
}
