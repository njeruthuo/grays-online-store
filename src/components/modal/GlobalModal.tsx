import { ModalProps } from "../checkout";

const GlobalModal: React.FC<ModalProps> = ({
  open,
  close,
  title,
  children,
  className
}) => {
  if (!open) return null;
  return (
    <div
      className={`${className} fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/30 z-50`}
    >
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={close} className="text-gray-600 hover:text-gray-900">
            ✖
          </button>
        </div>

        {/* Body */}
        <div className="p-6">{children}</div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 border-t">
          <button
            onClick={close}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default GlobalModal