import { useContext, useMemo } from "react";
import { useForm } from "react-hook-form";

import UserProgressContext from "../../store/UserProgressContext";
import { useCartContext } from "../../store/CartContext";
import Input from "./Input";
import Modal from "./Modal";
import Button from "./Button";
import { currencyFormatter } from "../../util/formatting";
import useHttp, { CustomerType } from "../../hooks/useHttp";

export default function FormModal() {
  const { mealsTotalPrice, meals, clearCart } = useCartContext();
  const { progress, setUserProgress } = useContext(UserProgressContext);

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm<CustomerType>();

  // Memoized config to prevent infinite loop
  const config = useMemo(
    () => ({
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }),
    []
  );

  const { sendRequest, isLoading, clearData, error } = useHttp(
    "http://localhost:3000/orders",
    config,
    null
  );

  async function submitFormData(formData: CustomerType) {
    const formattedData = {
      order: {
        items: meals,
        customer: formData,
      },
    };

    clearData();
    await sendRequest(formattedData);
    setUserProgress("thanks");
    clearCart();
    reset();
  }

  return (
    <Modal isOpen={progress === "checkout"}>
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
        />
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
          />
          <Input
            id="city"
            label="City"
            type="text"
            {...register("city", {
              required: "The city must have at least 3 characters",
              minLength: 3,
            })}
          />
        </div>
        {errors["postal-code"] && (
          <p className="error">{errors["postal-code"].message}</p>
        )}
        {errors.city && <p className="error">{errors.city.message}</p>}
        {error && (
          <div className="error">
            <h2>Failed to submit order</h2>
            <p>try again.</p>
          </div>
        )}
        <div className="modal-actions">
          <Button
            textOnly
            className="text-button"
            type="button"
            onClick={() => setUserProgress("")}
          >
            Close
          </Button>
          <Button type="submit" disabled={isLoading}>
            Go to Checkout
          </Button>
        </div>
      </form>
    </Modal>
  );
}
