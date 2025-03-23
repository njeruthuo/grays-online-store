
import whatsappIcon from "@/assets/whatsapp-512.webp";
import CopyTillNumber from "@/utils/CopyTillNumber";

const PaymentInfo = () => {
  

  return (
    <div className="fixed right-4 bottom-16 z-40 flex flex-col items-end gap-2">
      <div className="bg-white px-2 py-1 rounded-lg shadow-md">
        <h2 className="font-bold mb-2">MPESA Till Number</h2>
        <CopyTillNumber/>
      </div>
      <a
        href={`https://wa.me/+254741627205?text=${encodeURIComponent(
          "Hello there, can I have..."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={whatsappIcon}
          className="rounded-full h-12"
          alt="WhatsApp Support"
        />
      </a>
    </div>
  );
};

export default PaymentInfo;
