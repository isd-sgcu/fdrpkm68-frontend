/*
 * This components is duplciate from MapDropdown.astro
 */
import React, { useEffect, useRef, useState } from "react";

import { ChevronDown } from "lucide-react";


import { cn } from "@/lib/utils";

export interface MapDropdownProps {
  options: { label: string; value: string }[];
  selectedOption: { label: string; value: string };
  className?: string;
  onChange?: (option: { label: string; value: string }) => void;
  liClassName?: string;
}

const MapDropdown: React.FC<MapDropdownProps> = ({
  options,
  selectedOption,
  className = "",
  onChange,
  liClassName = "",
}) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return (): void => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: {
    label: string;
    value: string;
  }): void => {
    setOpen(false);
    onChange?.(option);
  };

  const handleTriggerClick = (): void => {
    setOpen((prev) => !prev);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        ref={triggerRef}
        className="flex w-full items-center justify-between fill-white text-lg leading-none font-semibold text-white drop-shadow-lg drop-shadow-white/50"
        aria-expanded={open}
        aria-haspopup="true"
        type="button"
        onClick={handleTriggerClick}
      >
        <span className={cn("px-2 text-white drop-shadow-lg", liClassName)}>
          {selectedOption.label}
        </span>
        <div className="flex h-10 w-10 items-center justify-center">
          <ChevronDown size={18} color="white" />
        </div>
      </button>
      <div
        ref={menuRef}
        className={`absolute top-full right-0 left-0 z-10 mt-1 rounded-lg border border-gray-200 bg-white/90 shadow-lg backdrop-blur-sm ${open ? "block" : "hidden"}`}
      >
        <ul>
          {options.map((option) => (
            <li key={option.value}>
              <button
                className={cn(
                  "w-full px-4 py-2 text-left text-lg text-gray-800 transition-colors duration-200 hover:bg-gray-100",
                  liClassName
                )}
                type="button"
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MapDropdown;
