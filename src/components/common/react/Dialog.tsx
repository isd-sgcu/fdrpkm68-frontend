import React, { type ReactNode, useEffect, useRef } from "react";

import { useDialog } from "../../../hooks/useDialog";
import "../../../lib/dialogManager";

// Ensure DialogManager is initialized

interface DialogProps {
  id: string;
  children: ReactNode;
  className?: string;
  onOpen?: () => void;
  onClose?: () => void;
  onConfirm?: () => void;
  backdrop?: boolean;
  closeOnBackdrop?: boolean;
}

export function Dialog({
  id,
  children,
  className = "",
  onOpen,
  onClose,
  onConfirm,
  backdrop = true,
  closeOnBackdrop = true,
}: DialogProps): ReactNode {
  const dialogRef = useRef<HTMLDivElement>(null);
  const {
    isOpen,
    level,
    close,
    onOpen: hookOnOpen,
    onClose: hookOnClose,
    onConfirm: hookOnConfirm,
  } = useDialog(id);

  // Handle custom callbacks
  useEffect(() => {
    const unsubscribeOpen = hookOnOpen((): void => onOpen?.());
    const unsubscribeClose = hookOnClose((): void => onClose?.());
    const unsubscribeConfirm = hookOnConfirm((): void => onConfirm?.());

    return (): void => {
      unsubscribeOpen();
      unsubscribeClose();
      unsubscribeConfirm();
    };
  }, [hookOnOpen, hookOnClose, hookOnConfirm, onOpen, onClose, onConfirm]);

  // Handle backdrop clicks
  const _handleBackdropClick = (e: React.MouseEvent): void => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      close();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Escape" && closeOnBackdrop && isOpen) {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return (): void => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, closeOnBackdrop, close]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={dialogRef}
      className={`animate-fade-in fixed top-0 left-1/2 z-50 flex h-screen w-full max-w-[440px] -translate-x-1/2 transform items-center justify-center ${className}`}
      style={{ zIndex: 1000 + level }}
      role="dialog"
      aria-modal="true"
    >
      {backdrop && (
        <button
          type="button"
          className="fadein absolute inset-0 cursor-default bg-black/60 backdrop-blur-md"
          onClick={close}
          aria-label="Close dialog"
        />
      )}
      <div
        className="animate-scale-in relative mx-4 max-h-[80vh] w-full max-w-sm overflow-auto rounded-lg shadow-lg"
        role="document"
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  );
}

// Simple dialog content components for convenience
export function DialogHeader({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}): ReactNode {
  return (
    <div className={`border-b border-gray-200 px-6 py-4 ${className}`}>
      {children}
    </div>
  );
}

export function DialogBody({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}): ReactNode {
  return <div className={`${className}`}>{children}</div>;
}

export function DialogFooter({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}): ReactNode {
  return (
    <div
      className={`flex justify-end space-x-2 border-t border-gray-200 px-6 py-4 ${className}`}
    >
      {children}
    </div>
  );
}

export default Dialog;
