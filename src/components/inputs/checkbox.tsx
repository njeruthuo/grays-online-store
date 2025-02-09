const Checkbox: React.FC<ICheckBox> = ({
  name,
  id,
  checked,
  onChange,
  className,
}) => {
  return (
    <input
      type="checkbox"
      name={name}
      id={id}
      checked={checked}
      onChange={onChange}
      className={`${className}`}
    />
  );
};
export default Checkbox;

interface ICheckBox {
  name: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  className: string;
}
