import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Header } from "@/components/navigation";
import { toggleShowCategories } from "@/state/features/ui/theme";
import { useState } from "react";

import whatsappIcon from "@/assets/whatsapp-512.webp";

const MainLayout = () => {
  const dispatch = useDispatch();
  const [copied, setCopied] = useState(false);

  function toggleFilterShow() {
    dispatch(toggleShowCategories());
  }

  const copyToClipboard = () => {
    const textToCopy = "3322892";
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2s
    });
  };

  return (
    <section className="relative">
      <div className="fixed right-0 left-0 z-50 top-0">
        <Header openFilterBar={toggleFilterShow} />
      </div>
      <div className="pt-12">
        <Outlet />
      </div>

      <div className="fixed right-4 bottom-20 z-40 flex flex-col items-end gap-2">
        <div className="bg-white px-2 py-1 rounded-lg shadow-md">
          <h2 className="font-bold mb-2">MPESA Till Number</h2>
          <div className="flex justify-between place-items-center">
            <p>3322892</p>
            <button
              onClick={copyToClipboard}
              className="bg-white flex sm:px-3 px-2 py-1 rounded-lg shadow-md border border-gray-300 text-sm hover:bg-gray-100 transition"
            >
              {copied ? (
                <>Copied!</>
              ) : (
                <div className="text-xs flex place-items-center">
                  <img src="/content_paste_24dp.svg" alt="" />
                  copy
                </div>
              )}
            </button>
          </div>
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
    </section>
  );
};
export default MainLayout;
