import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import { useCartContext } from "../store/CartContext";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";

export default function Header() {
  const { meals } = useCartContext();
  const { setUserProgress } = useContext(UserProgressContext);

  const totalAmount = meals.reduce((sum, m) => sum + m.quantity, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={() => setUserProgress("cart")}>
          Cart ({totalAmount})
        </Button>
      </nav>
    </header>
  );
}
