const Input: React.FC<InputType> = ({
  name,
  onChange,
  className,
  type,
  id,
  placeholder,
  value,
}) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      className={`${className} ring ring-slate-700  p-2 rounded-md focus:outline-none focus:ring-blue-500 hover:ring-blue-400`}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
  );
};
export default Input;

interface InputType {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
  type: string;
  id: string | undefined;
  placeholder: string;
}
