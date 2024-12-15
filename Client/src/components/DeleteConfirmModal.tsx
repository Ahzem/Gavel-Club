import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import '../styles/components/delete-confirm-modal.css';

interface DeleteConfirmModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function DeleteConfirmModal({
  title,
  message,
  onConfirm,
  onCancel,
  isLoading
}: DeleteConfirmModalProps) {
  return (
    <motion.div 
      className="delete-confirm-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="delete-confirm-modal"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="delete-confirm-modal__icon">
          <AlertTriangle size={32} />
        </div>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="delete-confirm-modal__actions">
          <button 
            className="button button--secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button 
            className="button button--delete"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}