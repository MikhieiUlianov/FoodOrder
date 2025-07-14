import Button from "./Button";
import Modal from "./Modal";

type ThanksModalProps = {
  isThanksModalActive: boolean;
  setIsThanksModalActive: (atg: boolean) => void;
};

export default function ThanksModal({
  isThanksModalActive,
  setIsThanksModalActive,
}: ThanksModalProps) {
  return (
    <Modal isOpen={isThanksModalActive}>
      <h2>Success!</h2>
      <p>Your order was submitted successfully.</p>
      <p>We will get back you with more details via email next few mminutes.</p>
      <Button onClick={() => setIsThanksModalActive(false)}>Okay</Button>
    </Modal>
  );
}
