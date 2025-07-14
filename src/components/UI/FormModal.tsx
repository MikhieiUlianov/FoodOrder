import { useState } from "react";
import { useForm } from "react-hook-form";

import { useCartContext } from "../../store/cart-context";
import Input from "./Input";
import Modal from "./Modal";
import Button from "./Button";
import { currencyFormatter } from "../../util/formatting";
import ThanksModal from "./ThanksModal";
import { CustomerType, usePostFormData } from "../../hooks/useHttp";

type FormModalProps = {
  isFormActive: boolean;
  setIsFormActive: (arg: boolean) => void;
};

export default function FormModal({
  isFormActive,
  setIsFormActive,
}: FormModalProps) {
  const { clearError, request, setProcess, process } = usePostFormData();
  const [isThanksModalActive, setIsThanksModalActive] = useState(false);
  const { mealsTotalPrice, meals } = useCartContext();
  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm<CustomerType>();
  function handleNextModalOpen() {
    setIsFormActive(false);
    setIsThanksModalActive(true);
  }

  async function submitFormData(formData: CustomerType) {
    const formattedData = {
      order: {
        items: meals,
        customer: {
          name: formData.name,
          email: formData.email,
          street: formData.street,
          "postal-code": formData["postal-code"],
          city: formData.city,
        },
      },
    };
    clearError();
    await request(formattedData);
    console.log(formattedData);
    setProcess("success");
    reset();
    handleNextModalOpen();
  }
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
        <form onSubmit={handleSubmit(submitFormData)}>
          <Input
            id="name"
            label="Full Name"
            type="text"
            {...register("name", {
              required: "The name must have at least 6 characters",
              minLength: 6,
            })}
          />{" "}
          {errors.name && <p className="error">{errors.name.message}</p>}
          <Input
            id="email"
            label="E-Mail Address"
            type="email"
            {...register("email", {
              required: "Please enter valid email",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Incorrect email address",
              },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
          <Input
            id="street"
            label="Street"
            type="text"
            {...register("street", {
              required: "The street must have at least 4 characters",
              minLength: 4,
            })}
          />
          {errors.street && <p className="error">{errors.street.message}</p>}
          <div className="control-row">
            <Input
              id="postal-code"
              label="Postal Code"
              type="text"
              {...register("postal-code", {
                required: "The code must have at least 6 characters",
                minLength: 6,
              })}
            />{" "}
            {errors["postal-code"] && (
              <p className="error">{errors["postal-code"].message}</p>
            )}
            <Input
              id="city"
              label="City"
              type="text"
              {...register("city", {
                required: "The city must have at least 3 characters",
                minLength: 3,
              })}
            />{" "}
            {errors.city && <p className="error">{errors.city.message}</p>}
          </div>
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
