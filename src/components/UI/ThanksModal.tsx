import { useContext } from "react";
import Button from "./Button";
import Modal from "./Modal";
import UserProgressContext from "../../store/UserProgressContext";

export default function ThanksModal() {
  const { progress, setUserProgress } = useContext(UserProgressContext);
  return (
    <Modal isOpen={progress === "thanks"}>
      <h2>Success!</h2>
      <p>Your order was submitted successfully.</p>
      <p>We will get back you with more details via email next few minutes.</p>
      <Button onClick={() => setUserProgress("")}>Okay</Button>
    </Modal>
  );
}
