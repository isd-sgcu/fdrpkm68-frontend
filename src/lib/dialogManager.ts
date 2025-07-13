// DialogManager initialization for React components
// This ensures the global DialogManagerV2 is available for useDialog hook

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

class DialogManagerV2 {
  private openDialogs: Set<string> = new Set();
  private dialogStack: string[] = [];

  constructor() {
    this.init();
  }

  private init(): void {
    // Initialize event handlers
    this.handleEscapeKey();
  }

  private handleEscapeKey(): void {
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const topDialog = this.getTopDialog();
        if (topDialog) {
          this.closeDialog(topDialog);
        }
      }
    });
  }

  openDialog(dialogId: string): void {
    if (!this.openDialogs.has(dialogId)) {
      this.openDialogs.add(dialogId);
      this.dialogStack.push(dialogId);

      // Prevent body scroll when dialog is open
      if (this.openDialogs.size === 1) {
        document.body.style.overflow = "hidden";
      }

      const openEvent = new CustomEvent<DialogEventDetail>("dialog-open", {
        detail: { dialogId, level: this.dialogStack.length },
      });
      document.dispatchEvent(openEvent);
    }
  }

  closeDialog(dialogId: string): void {
    if (this.openDialogs.has(dialogId)) {
      this.openDialogs.delete(dialogId);
      const dialogIndex = this.dialogStack.indexOf(dialogId);
      if (dialogIndex !== -1) {
        this.dialogStack.splice(dialogIndex, 1);
      }

      // Restore body scroll when no dialogs are open
      if (this.openDialogs.size === 0) {
        document.body.style.overflow = "";
      }

      const closeEvent = new CustomEvent<DialogEventDetail>("dialog-close", {
        detail: { dialogId, remaining: this.openDialogs.size },
      });
      document.dispatchEvent(closeEvent);
    }
  }

  closeAll(): void {
    const dialogsToClose = [...this.openDialogs];
    this.openDialogs.clear();
    this.dialogStack = [];
    document.body.style.overflow = "";

    // Dispatch close events for all dialogs
    dialogsToClose.forEach((dialogId) => {
      const closeEvent = new CustomEvent<DialogEventDetail>("dialog-close", {
        detail: { dialogId, remaining: 0 },
      });
      document.dispatchEvent(closeEvent);
    });

    const closeAllEvent = new CustomEvent("dialog-close-all");
    document.dispatchEvent(closeAllEvent);
  }

  private getTopDialog(): string | null {
    return this.dialogStack.length > 0
      ? this.dialogStack[this.dialogStack.length - 1]
      : null;
  }

  isOpen(dialogId: string): boolean {
    return this.openDialogs.has(dialogId);
  }

  getOpenDialogs(): string[] {
    return Array.from(this.openDialogs);
  }

  getDialogStack(): string[] {
    return [...this.dialogStack];
  }
}

// Initialize and setup global API
const initializeDialogManager = (): void => {
  if (
    typeof window !== "undefined" &&
    !(window as Window & { DialogManagerV2?: unknown }).DialogManagerV2
  ) {
    const dialogManagerV2 = new DialogManagerV2();

    // Setup global API
    (window as Window & { DialogManagerV2?: unknown }).DialogManagerV2 = {
      open: (dialogId: string): void => dialogManagerV2.openDialog(dialogId),
      close: (dialogId: string): void => dialogManagerV2.closeDialog(dialogId),
      closeAll: (): void => dialogManagerV2.closeAll(),
      isOpen: (dialogId: string): boolean => dialogManagerV2.isOpen(dialogId),
      getOpenDialogs: (): string[] => dialogManagerV2.getOpenDialogs(),
      getDialogStack: (): string[] => dialogManagerV2.getDialogStack(),
    };
  }
};

// Auto-initialize when module is imported
initializeDialogManager();

export { initializeDialogManager };
