import { useEffect } from "react";

function Toast({ message, type = "error", onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const baseClasses =
    "fixed top-4 right-4 p-4 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out";
  const typeClasses = {
    error: "bg-red-50 text-red-600 border border-red-200",
    success: "bg-green-50 text-green-600 border border-green-200",
    info: "bg-blue-50 text-blue-600 border border-blue-200",
  };

  return (
    <div
      className={`${baseClasses} ${typeClasses[type]} animate-slideIn`}
      role="alert"
    >
      <div className="flex items-center">
        {type === "error" && (
          <svg
            className="w-5 h-5 mr-2 animate-bounce"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {type === "success" && (
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        )}
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
}

export default Toast;
