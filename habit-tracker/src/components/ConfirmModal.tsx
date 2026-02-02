"use client";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white p-6 rounded-lg w-80">
        <h2 id="modal-title" className="text-lg font-bold mb-2">
          {title}
        </h2>
        <p className="mb-4">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-3 py-1 border rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
