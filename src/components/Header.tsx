import { useState } from "react";
import logoImg from "../assets/logo.jpg";
import { useCartContext } from "../store/cart-context";
import Button from "./UI/Button";
import CartModal from "./UI/CartModal";

export default function Header() {
  const [isModalActive, setIsModalActive] = useState(false);
  const { meals } = useCartContext();

  const totalAmount = meals.reduce((sum, m) => sum + m.quantity, 0);

  return (
    <>
      <CartModal
        isModalActive={isModalActive}
        setIsModalActive={setIsModalActive}
      />
      <header id="main-header">
        <div id="title">
          <img src={logoImg} alt="A restaurant" />
          <h1>ReactFood</h1>
        </div>
        <nav>
          <Button textOnly onClick={() => setIsModalActive((prev) => !prev)}>
            Cart ({totalAmount})
          </Button>
        </nav>
      </header>
    </>
  );
}
