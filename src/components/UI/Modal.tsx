import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type ModalProps = { children: ReactNode; isOpen: boolean; className?: string };

export default function Modal({
  children,
  isOpen,
  className = "",
}: ModalProps) {
  const modal = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      modal.current?.showModal();
    } else {
      modal.current?.close();
    }
  }, [isOpen]);

  return createPortal(
    <dialog ref={modal} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById("modal")!
  );
}
