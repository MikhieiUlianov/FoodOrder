import { useState } from "react";

import { useCartContext } from "../../store/cart-context";
import Input from "./Input";
import Modal from "./Modal";
import Button from "./Button";
import { currencyFormatter } from "../../util/formatting";
import { FormEvent } from "react";
import { hasMinLength, isEmail, isNotEmpty } from "../../util/validation";
import ThanksModal from "./ThanksModal";

type FormModalProps = {
  isFormActive: boolean;
  setIsFormActive: (arg: boolean) => void;
};

type Errors = {
  name: string | null;
  email: string | null;
  street: string | null;
  code: string | null;
  city: string | null;
};

export default function FormModal({
  isFormActive,
  setIsFormActive,
}: FormModalProps) {
  const { mealsTotalPrice } = useCartContext();
  const [isThanksModalActive, setIsThanksModalActive] = useState(false);
  const [errors, setErrors] = useState<Errors>({
    name: null,
    email: null,
    street: null,
    code: null,
    city: null,
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const formattedData = Object.fromEntries(data.entries());
    const name = formattedData.name;
    const email = formattedData.email;
    const street = formattedData.street;
    const code = formattedData.code;
    const city = formattedData.city;

    const newErrors = {
      name:
        typeof name !== "string" || !hasMinLength(name, 6)
          ? "The Name must have at least 6 characters"
          : null,
      email:
        typeof email !== "string" || !isEmail(email)
          ? "Enter valid email"
          : null,
      street:
        typeof street !== "string" || !isNotEmpty(street)
          ? "The field cannot be empty"
          : null,
      code:
        typeof code !== "string" || !isNotEmpty(code)
          ? "Enter valid code"
          : null,
      city:
        typeof city !== "string" || !hasMinLength(city, 4)
          ? "At least 4 characters"
          : null,
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== null);
    if (hasErrors) return;
    console.log("Form valid, opening ThanksModal");

    setIsFormActive(false); // Close FormModal
    setIsThanksModalActive(true); // Open ThanksModal
  }

  return (
    <>
      {isThanksModalActive && !isFormActive && (
        <ThanksModal
          isThanksModalActive={isThanksModalActive}
          setIsThanksModalActive={setIsThanksModalActive}
        />
      )}
      <Modal isOpen={isFormActive}>
        <div>
          <h2>Checkout</h2>
          <p>Total Amount: {currencyFormatter.format(mealsTotalPrice)}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            id="name"
            label="Full Name"
            type="text"
            errorMessage={errors.name}
          />
          <Input
            id="email"
            label="E-Mail Address"
            type="email"
            errorMessage={errors.email}
          />
          <Input
            id="street"
            label="Street"
            type="text"
            errorMessage={errors.street}
          />
          <div className="control-row">
            <Input
              id="code"
              label="Postal Code"
              type="text"
              errorMessage={errors.code}
            />
            <Input
              id="city"
              label="City"
              type="text"
              errorMessage={errors.city}
            />
          </div>
          <div className="modal-actions">
            <Button
              textOnly
              className="text-button"
              onClick={() => setIsFormActive(false)}
            >
              Close
            </Button>
            <Button type="submit">Go to Checkout</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
