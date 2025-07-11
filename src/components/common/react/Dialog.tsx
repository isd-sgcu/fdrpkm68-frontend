import React, { useEffect, useRef, type ReactNode } from 'react';
import { useDialog } from '../../../hooks/useDialog';
import '../../../lib/dialogManager'; // Ensure DialogManager is initialized

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
  className = '',
  onOpen,
  onClose,
  onConfirm,
  backdrop = true,
  closeOnBackdrop = true,
}: DialogProps) {
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
    const unsubscribeOpen = hookOnOpen(() => onOpen?.()); 
    const unsubscribeClose = hookOnClose(() => onClose?.());
    const unsubscribeConfirm = hookOnConfirm(() => onConfirm?.());

    return () => {
      unsubscribeOpen();
      unsubscribeClose();
      unsubscribeConfirm();
    };
  }, [hookOnOpen, hookOnClose, hookOnConfirm, onOpen, onClose, onConfirm]);

  // Handle backdrop clicks
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      close();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dialogRef}
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-[440px] h-screen z-50 flex items-center justify-center animate-fade-in ${className}`}
      style={{ zIndex: 1000 + level }}
      onClick={backdrop ? handleBackdropClick : undefined}
    >
      {backdrop && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md fadein" onClick={close} />
      )}
      <div
        className="relative rounded-lg shadow-lg w-full max-w-sm max-h-[80vh] overflow-auto mx-4 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

// Simple dialog content components for convenience
export function DialogHeader({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

export function DialogBody({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`${className}`}>
      {children}
    </div>
  );
}

export function DialogFooter({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`px-6 py-4 border-t border-gray-200 flex justify-end space-x-2 ${className}`}>
      {children}
    </div>
  );
}

export default Dialog;