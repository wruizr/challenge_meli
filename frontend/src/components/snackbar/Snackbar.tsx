import { useEffect } from "react";
import "./Snackbar.css";

interface SnackbarProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export const Snackbar: React.FC<SnackbarProps> = ({
  message,
  type,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return <div className={`ml-snackbar ${type}`}>{message}</div>;
};
