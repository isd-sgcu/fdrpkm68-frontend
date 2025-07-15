import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Utility to show a global snackbar.
 * @param message - The message to display.
 * @param type - 'error' | 'info' | 'success'
 */
export function showSnackbar(
  message: string,
  type: "error" | "info" | "success" = "info"
): void {
  if (typeof window === "undefined") {
    return;
  }
  window.dispatchEvent(
    new CustomEvent("snackbar", {
      detail: { message, type },
    })
  );
}
