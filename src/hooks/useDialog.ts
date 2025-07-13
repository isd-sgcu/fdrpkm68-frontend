import { useCallback, useEffect, useState } from "react";

// Interface for the global DialogManager
interface DialogManagerAPI {
  open: (dialogId: string) => void;
  close: (dialogId: string) => void;
  closeAll: () => void;
  isOpen: (dialogId: string) => boolean;
  getOpenDialogs: () => string[];
  getDialogStack: () => string[];
}

// Types for dialog events
interface DialogEventDetail {
  dialogId?: string;
  level?: number;
  remaining?: number;
  from?: string | null;
  to?: string;
  trigger?: HTMLElement;
  target?: HTMLElement;
  dialog?: string | null;
  component?: string;
}

interface DialogState {
  isOpen: boolean;
  level: number;
}

interface UseDialogReturn {
  // State
  isOpen: boolean;
  level: number;
  openDialogs: string[];
  dialogStack: string[];

  // Actions
  open: () => void;
  close: () => void;
  toggle: () => void;
  closeAll: () => void;

  // Advanced actions
  cascade: (nextDialogId: string) => void;
  isDialogOpen: (dialogId: string) => boolean;

  // Event handlers
  onOpen: (
    callback: (event: CustomEvent<DialogEventDetail>) => void
  ) => () => void;
  onClose: (
    callback: (event: CustomEvent<DialogEventDetail>) => void
  ) => () => void;
  onConfirm: (
    callback: (event: CustomEvent<DialogEventDetail>) => void
  ) => () => void;
  onCascade: (
    callback: (event: CustomEvent<DialogEventDetail>) => void
  ) => () => void;
}

export function useDialog(dialogId: string): UseDialogReturn {
  const [state, setState] = useState<DialogState>({
    isOpen: false,
    level: 0,
  });

  const [openDialogs, setOpenDialogs] = useState<string[]>([]);
  const [dialogStack, setDialogStack] = useState<string[]>([]);

  // Get dialog manager from global window object
  const getDialogManager = useCallback((): DialogManagerAPI | null => {
    return (
      (window as Window & { DialogManagerV2?: DialogManagerAPI })
        ?.DialogManagerV2 ?? null
    );
  }, []);

  // Open dialog
  const open = useCallback(() => {
    const manager = getDialogManager();
    if (manager) {
      manager.open(dialogId);
    }
  }, [dialogId, getDialogManager]);

  // Close dialog
  const close = useCallback(() => {
    const manager = getDialogManager();
    if (manager) {
      manager.close(dialogId);
    }
  }, [dialogId, getDialogManager]);

  // Toggle dialog
  const toggle = useCallback(() => {
    if (state.isOpen) {
      close();
    } else {
      open();
    }
  }, [state.isOpen, open, close]);

  // Close all dialogs
  const closeAll = useCallback(() => {
    const manager = getDialogManager();
    if (manager) {
      manager.closeAll();
    }
  }, [getDialogManager]);

  // Cascade to another dialog
  const cascade = useCallback(
    (nextDialogId: string) => {
      // Trigger cascade by clicking a virtual element
      const cascadeEvent = new CustomEvent("dialog-cascade", {
        detail: { from: dialogId, to: nextDialogId },
      });
      document.dispatchEvent(cascadeEvent);

      const manager = getDialogManager();
      if (manager) {
        manager.open(nextDialogId);
      }
    },
    [dialogId, getDialogManager]
  );

  // Check if a specific dialog is open
  const isDialogOpen = useCallback(
    (targetDialogId: string): boolean => {
      const manager = getDialogManager();
      return manager ? manager.isOpen(targetDialogId) : false;
    },
    [getDialogManager]
  );

  // Event handler helpers
  const onOpen = useCallback(
    (
      callback: (event: CustomEvent<DialogEventDetail>) => void
    ): (() => void) => {
      const handler = (event: Event): void => {
        const customEvent = event as CustomEvent<DialogEventDetail>;
        if (customEvent.detail.dialogId === dialogId) {
          callback(customEvent);
        }
      };

      document.addEventListener("dialog-open", handler);
      return () => document.removeEventListener("dialog-open", handler);
    },
    [dialogId]
  );

  const onClose = useCallback(
    (
      callback: (event: CustomEvent<DialogEventDetail>) => void
    ): (() => void) => {
      const handler = (event: Event): void => {
        const customEvent = event as CustomEvent<DialogEventDetail>;
        if (customEvent.detail.dialogId === dialogId) {
          callback(customEvent);
        }
      };

      document.addEventListener("dialog-close", handler);
      return () => document.removeEventListener("dialog-close", handler);
    },
    [dialogId]
  );

  const onConfirm = useCallback(
    (
      callback: (event: CustomEvent<DialogEventDetail>) => void
    ): (() => void) => {
      const handler = (event: Event): void => {
        const customEvent = event as CustomEvent<DialogEventDetail>;
        if (customEvent.detail.dialog === dialogId) {
          callback(customEvent);
        }
      };

      document.addEventListener("dialog-confirm", handler);
      return () => document.removeEventListener("dialog-confirm", handler);
    },
    [dialogId]
  );

  const onCascade = useCallback(
    (
      callback: (event: CustomEvent<DialogEventDetail>) => void
    ): (() => void) => {
      const handler = (event: Event): void => {
        const customEvent = event as CustomEvent<DialogEventDetail>;
        if (
          customEvent.detail.from === dialogId ||
          customEvent.detail.to === dialogId
        ) {
          callback(customEvent);
        }
      };

      document.addEventListener("dialog-cascade", handler);
      return () => document.removeEventListener("dialog-cascade", handler);
    },
    [dialogId]
  );

  // Listen to dialog events and update state
  useEffect((): (() => void) => {
    const handleDialogOpen = (event: Event): void => {
      const customEvent = event as CustomEvent<DialogEventDetail>;
      if (customEvent.detail.dialogId === dialogId) {
        setState((prev) => ({
          ...prev,
          isOpen: true,
          level: customEvent.detail.level ?? 0,
        }));
      }

      // Update global state
      const manager = getDialogManager();
      if (manager) {
        setOpenDialogs(manager.getOpenDialogs());
        setDialogStack(manager.getDialogStack());
      }
    };

    const handleDialogClose = (event: Event): void => {
      const customEvent = event as CustomEvent<DialogEventDetail>;
      if (customEvent.detail.dialogId === dialogId) {
        setState((prev) => ({
          ...prev,
          isOpen: false,
          level: 0,
        }));
      }

      // Update global state
      const manager = getDialogManager();
      if (manager) {
        setOpenDialogs(manager.getOpenDialogs());
        setDialogStack(manager.getDialogStack());
      }
    };

    const handleDialogCloseAll = (): void => {
      setState((prev) => ({
        ...prev,
        isOpen: false,
        level: 0,
      }));
      setOpenDialogs([]);
      setDialogStack([]);
    };

    // Add event listeners
    document.addEventListener("dialog-open", handleDialogOpen);
    document.addEventListener("dialog-close", handleDialogClose);
    document.addEventListener("dialog-close-all", handleDialogCloseAll);

    // Initialize state from dialog manager
    const manager = getDialogManager();
    if (manager) {
      const isCurrentlyOpen = manager.isOpen(dialogId);
      const currentOpenDialogs = manager.getOpenDialogs();
      const currentStack = manager.getDialogStack();

      setState((prev) => ({
        ...prev,
        isOpen: isCurrentlyOpen,
        level: currentStack.indexOf(dialogId) + 1,
      }));

      setOpenDialogs(currentOpenDialogs);
      setDialogStack(currentStack);
    }

    // Cleanup
    return () => {
      document.removeEventListener("dialog-open", handleDialogOpen);
      document.removeEventListener("dialog-close", handleDialogClose);
      document.removeEventListener("dialog-close-all", handleDialogCloseAll);
    };
  }, [dialogId, getDialogManager]);

  return {
    // State
    isOpen: state.isOpen,
    level: state.level,
    openDialogs,
    dialogStack,

    // Actions
    open,
    close,
    toggle,
    closeAll,

    // Advanced actions
    cascade,
    isDialogOpen,

    // Event handlers
    onOpen,
    onClose,
    onConfirm,
    onCascade,
  };
}

// Hook for managing multiple dialogs
export function useDialogs(dialogIds: string[]): {
  dialogs: Record<string, UseDialogReturn>;
  globalState: {
    openDialogs: string[];
    dialogStack: string[];
    anyOpen: boolean;
  };
  closeAll: () => void;
  openDialog: (dialogId: string) => void;
  closeDialog: (dialogId: string) => void;
  toggleDialog: (dialogId: string) => void;
  isDialogOpen: (dialogId: string) => boolean;
} {
  // Create individual dialog hooks
  const dialogs = dialogIds.reduce(
    (acc, id) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      acc[id] = useDialog(id);
      return acc;
    },
    {} as Record<string, UseDialogReturn>
  );

  const [globalState, setGlobalState] = useState({
    openDialogs: [] as string[],
    dialogStack: [] as string[],
    anyOpen: false,
  });

  const getDialogManager = useCallback((): DialogManagerAPI | null => {
    return (
      (window as Window & { DialogManagerV2?: DialogManagerAPI })
        ?.DialogManagerV2 ?? null
    );
  }, []);

  const closeAll = useCallback(() => {
    const manager = getDialogManager();
    if (manager) {
      manager.closeAll();
    }
  }, [getDialogManager]);

  // Update global state when any dialog changes
  useEffect(() => {
    const updateGlobalState = (): void => {
      const manager = getDialogManager();
      if (manager) {
        const openDialogs = manager.getOpenDialogs();
        const dialogStack = manager.getDialogStack();

        setGlobalState({
          openDialogs,
          dialogStack,
          anyOpen: openDialogs.length > 0,
        });
      }
    };

    // Listen to all dialog events
    document.addEventListener("dialog-open", updateGlobalState);
    document.addEventListener("dialog-close", updateGlobalState);
    document.addEventListener("dialog-close-all", updateGlobalState);

    // Initial state
    updateGlobalState();

    return (): void => {
      document.removeEventListener("dialog-open", updateGlobalState);
      document.removeEventListener("dialog-close", updateGlobalState);
      document.removeEventListener("dialog-close-all", updateGlobalState);
    };
  }, [getDialogManager]);

  return {
    dialogs,
    globalState,
    closeAll,
    openDialog: (dialogId: string) => dialogs[dialogId]?.open(),
    closeDialog: (dialogId: string) => dialogs[dialogId]?.close(),
    toggleDialog: (dialogId: string) => dialogs[dialogId]?.toggle(),
    isDialogOpen: (dialogId: string) => dialogs[dialogId]?.isOpen ?? false,
  };
}

export default useDialog;
