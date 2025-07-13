import logoImg from "../assets/logo.jpg";
import { useCartContext } from "../store/cart-context";
import Button from "./UI/Button";

export default function Header() {
  const { meals } = useCartContext();
  const totalAmount = meals.reduce((sum, m) => sum + m.quantity, 0);
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly>Cart ({totalAmount})</Button>
      </nav>
    </header>
  );
}
