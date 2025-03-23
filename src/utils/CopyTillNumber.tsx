import { MPESATILLNUMBER } from '@/constants/constant';
import React from 'react'

const CopyTillNumber = () => {
    const [copied, setCopied] = React.useState(false);
    const copyToClipboard = () => {
      const textToCopy = MPESATILLNUMBER.toString();
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2s
      });
    };
  return (
    <div className="flex  space-x-4 my-2 place-items-center">
      <p>{MPESATILLNUMBER}</p>
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
  );
}

export default CopyTillNumber