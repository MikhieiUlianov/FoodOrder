import { ComponentPropsWithoutRef } from "react";

type InputProps = {
  label: string;
  id: string;
} & ComponentPropsWithoutRef<"input">;

export default function Input({ label, id, ...otherProps }: InputProps) {
  return (
    <div className="control">
      <label htmlFor={id}>{label}</label>
      <input name={id} id={id} {...otherProps} />
    </div>
  );
}
