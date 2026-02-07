import { useState } from "react";

const EmergencyCall = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCall = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Floating button above chatbot */}
      <div className="fixed bottom-28 right-6 flex flex-col items-end gap-2 z-50">
        <button
          onClick={toggleCall}
          className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
        >
          <i className="fa-solid fa-hospital"></i>
        </button>

        {isOpen && (
          <div className="w-60 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 flex flex-col items-center">
            <h2 className="font-semibold text-red-600 text-center mb-2">
              Emergency Call
            </h2>
            <p className="text-sm text-gray-600 text-center mb-4">
              Click the button below to call the hospital (108) immediately.
            </p>

            <a
              href="tel:+91108"
              className="bg-red-600 hover:bg-red-700 text-white w-full text-center py-2 rounded-xl font-medium transition-all duration-300"
            >
              Call 108 📞
            </a>

            <button
              onClick={toggleCall}
              className="mt-2 text-gray-500 hover:text-gray-700 text-sm"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default EmergencyCall;
