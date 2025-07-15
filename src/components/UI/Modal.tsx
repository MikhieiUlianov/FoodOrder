import { ReactNode, useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import UserProgressContext from "../../store/UserProgressContext";

type ModalProps = { children: ReactNode; isOpen: boolean; className?: string };

export default function Modal({
  children,
  isOpen,
  className = "",
}: ModalProps) {
  const modal = useRef<HTMLDialogElement | null>(null);

  const { setUserProgress } = useContext(UserProgressContext);

  useEffect(() => {
    if (isOpen) {
      modal.current?.showModal();
    } else {
      modal.current?.close();
    }
  }, [isOpen]);

  return createPortal(
    <dialog
      ref={modal}
      className={`modal ${className}`}
      onClose={() => setUserProgress("")}
    >
      {children}
    </dialog>,
    document.getElementById("modal")!
  );
}
