import { useState, useActionState } from "react";

import { useCartContext } from "../../store/cart-context";
import Input from "./Input";
import Modal from "./Modal";
import Button from "./Button";
import { currencyFormatter } from "../../util/formatting";
import { hasMinLength, isEmail, isNotEmpty } from "../../util/validation";
import ThanksModal from "./ThanksModal";
import { usePostFormData } from "../../hooks/useHttp";

type FormModalProps = {
  isFormActive: boolean;
  setIsFormActive: (arg: boolean) => void;
};

export default function FormModal({
  isFormActive,
  setIsFormActive,
}: FormModalProps) {
  const { clearError, request, setProcess, process } = usePostFormData();
  const { mealsTotalPrice, meals } = useCartContext();
  const [isThanksModalActive, setIsThanksModalActive] = useState(false);

  async function handleSubmitAction(
    prevState: string[] | null,
    formData: FormData
  ) {
    const name = formData.get("name");
    const email = formData.get("email");
    const street = formData.get("street");
    const code = formData.get("postal-code");
    const city = formData.get("city");

    let errors: string[] = [];

    if (typeof name !== "string" || !hasMinLength(name, 6)) {
      errors.push("The Name must have at least 6 characters");
    }
    if (typeof email !== "string" || !isEmail(email)) {
      errors.push("Enter valid email");
    }
    if (typeof street !== "string" || !isNotEmpty(street)) {
      errors.push("The field cannot be empty");
    }
    if (typeof code !== "string" || !isNotEmpty(code)) {
      errors.push("Enter valid code");
    }
    if (typeof city !== "string" || !hasMinLength(city, 4)) {
      errors.push("At least 4 characters");
    }

    const hasErrors = errors.length > 0;
    if (hasErrors)
      return {
        errors,
        enteredValues: {
          userName: name,
          email,
          street,
          city,
          code,
        },
      };
    clearError();
    await request({
      order: {
        items: meals,
        customer: {
          name: typeof name === "string" ? name : null,
          email: typeof email === "string" ? email : null,
          street: typeof street === "string" ? street : null,
          "postal-code": typeof code === "string" ? code : null,
          city: typeof city === "string" ? city : null,
        },
      },
    });
    setProcess("success");
    setIsFormActive(false);
    setIsThanksModalActive(true);
    return { errors };
  }

  const [formState, formAction] = useActionState(handleSubmitAction, {
    errors: null,
  });

  return (
    <>
      {isThanksModalActive && (
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
        <form action={formAction}>
          <Input
            id="name"
            label="Full Name"
            type="text"
            defaultValue={formState.enteredValues?.userName}
          />
          <Input
            id="email"
            label="E-Mail Address"
            type="email"
            defaultValue={formState.enteredValues?.email}
          />
          <Input
            id="street"
            label="Street"
            type="text"
            defaultValue={formState.enteredValues?.street}
          />
          <div className="control-row">
            <Input
              id="postal-code"
              label="Postal Code"
              type="text"
              defaultValue={formState.enteredValues?.code}
            />
            <Input
              id="city"
              label="City"
              type="text"
              defaultValue={formState.enteredValues?.city}
            />
          </div>
          {formState.errors &&
            formState.errors.map((error: string, index: number) => {
              if (error !== null) {
                return (
                  <li className="error" key={index}>
                    {error}
                  </li>
                );
              }
            })}
          <div className="modal-actions">
            <Button
              textOnly
              className="text-button"
              onClick={() => setIsFormActive(false)}
            >
              Close
            </Button>
            <Button type="submit" disabled={process === "loading"}>
              Go to Checkout
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
