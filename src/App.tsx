import { useContext } from "react";
import Header from "./components/Header";
import Meals from "./components/Meals";
import UserProgressContext from "./store/UserProgressContext";
import CartModal from "./components/UI/CartModal";
import ThanksModal from "./components/UI/ThanksModal";
import FormModal from "./components/UI/FormModal";

function App() {
  const { progress } = useContext(UserProgressContext);
  return (
    <>
      {progress === "cart" && <CartModal />}
      {progress === "checkout" && <FormModal />}
      {progress === "thanks" && <ThanksModal />}
      <Header />
      <Meals />
    </>
  );
}

export default App;
