import type { ChangeEventHandler } from "react";

interface InputProps {
  name: string;
  className?: string;
  type?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  placeholder?: string;
}

export default function Input({
  name,
  className = "",
  type = "text",
  onChange,
  value,
  placeholder,
}: InputProps) {
  return (
    <input
      name={name}
      className={className}
      type={type}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  );
}
