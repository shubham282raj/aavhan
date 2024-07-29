import { useEffect, useState } from "react";

const Toast = ({ message, type, onClose }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);

    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 1 / 5;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, 10);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onClose]);

  const styles =
    type === "SUCCESS"
      ? "fixed top-16 xl:top-20 right-4 z-50 p-4 rounded-md bg-green-600 text-white max-w-md select-none "
      : "fixed top-16 xl:top-20 right-4 z-50 p-4 rounded-md bg-red-600 text-white max-w-md select-none";

  return (
    <div className={styles + " overflow-hidden"} onClick={onClose}>
      <div className="flex justify-center items-center">
        <span className="text-lg font-semibold">{String(message)}</span>
      </div>
      <div className="w-full bg-transparent h-1 mt-2 absolute bottom-0 left-0">
        <div
          className="bg-white h-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Toast;
