export default function Input({
  name,
  className,
  type,
  onChange,
  value,
  placeholder,
}) {
  return (
    <input
      type={type}
      className={className}
      name={name}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  );
}
