
import type { ReactNode } from "react";
import React from "react";

import { X } from "lucide-react";

import { useTheme } from "@/config/ThemeContext";

/**
 * Frame Component
 *
 * @component
 * @example
 * ```tsx
 * <Frame>
 *   <div className="p-6">
 *     <h2>Featured Content</h2>
 *     <p>Your important content goes here</p>
 *   </div>
 * </Frame>
 * ```
 *
 * @example
 * ```tsx
 * // Large purple frame for hero sections
 * <Frame size="lg" color="purple">
 *   <div>Your content</div>
 * </Frame>
 * ```
 *
 * @param {('xs'|'sm'|'md'|'lg')} [size='lg'] - Frame size
 * @param {('blue'|'purple')} [color='blue'] - Frame color theme
 * @param {string} [className] - Additional CSS classes
 * @param {boolean} [noWrapper=false] - Optional prop to disable default wrapper
 * @param {ReactNode} children - Child components to render inside the frame
 */

export interface FrameProps {
  size?: "lg" | "md" | "sm" | "xs";
  color?: "blue" | "purple";
  className?: string;
  noWrapper?: boolean;
  children: ReactNode;
  frameId?: string;
  noScroll?: boolean; // Optional prop to disable scrolling
  onClickX?: () => void;
}

const Frame: React.FC<FrameProps> = ({
  size = "lg",
  color = "blue",
  className = "",
  noWrapper = false,
  children,
  frameId: propFrameId,
  noScroll = false,
  onClickX,
}) => {
  const { theme } = useTheme();

  if (theme.colorVariants && theme.colorVariants !== color) {
    color = theme.colorVariants as "blue" | "purple";
  }

  const frameId = propFrameId ?? "frame"; // fallback to a static id or use index if in a list
  const frameSvg = `/images/frame/frame-${color}-${size}.svg`;

  // Size configuration with aspect ratios and minimum heights
  const sizeConfig = {
    lg: {
      aspectRatio: "346/550",
      minHeight: "550px",
    },
    md: {
      aspectRatio: "346/430",
      minHeight: "430px",
    },
    sm: {
      aspectRatio: "346/340",
      minHeight: "340px",
    },
    xs: {
      aspectRatio: "346/248",
      minHeight: "248px",
    },
  };

  const config = sizeConfig[size];

  // Generate stable unique ID that doesn't change on re-renders
  // const frameId = useMemo(() =>
  //   `frame-${Math.random().toString(36).substr(2, 9)}`,
  //   []
  // );

  const contentClipClass = `frame-content-clip-${frameId}`;
  const containerClass = `frame-container-${frameId}`;

  // Size-specific content margins
  const contentMargins = {
    lg: "8% 10%",
    md: "6% 9%",
    sm: "5% 8%",
    xs: "4% 7%",
  };

  // CSS styles as a string
  const styles = `
    .${contentClipClass} {
      scrollbar-width: thin;
      scrollbar-color: rgba(0, 0, 0, 0.3) transparent;
      // margin: ${contentMargins[size]};
      margin: 3% 5% !important;
    }

    .${contentClipClass}::-webkit-scrollbar {
      width: 4px;
    }

    .${contentClipClass}::-webkit-scrollbar-track {
      background: transparent;
    }

    .${contentClipClass}::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.3);
      border-radius: 2px;
    }

    .${contentClipClass}::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 0, 0, 0.5);
    }

    @media (max-width: 480px) {
      .${containerClass} {
        min-height: 200px !important;
      }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div
        className={`${containerClass} relative max-h-screen w-full overflow-visible ${className}`}
        data-size={size}
        style={{
          aspectRatio: config.aspectRatio,
          minHeight: config.minHeight,
        }}
      >
        {/* Frame SVG background */}
        <div
          className="absolute inset-0 bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${frameSvg}')`,
            backgroundSize: "100% 100%",
          }}
        />

        {/* Content area with proper clipping */}
        <div
          className={`content-area absolute inset-0 flex ${contentClipClass} ${noScroll ? "overflow-visible" : "overflow-auto"}`}
        >
          {noWrapper ? (
            children
          ) : (
            <div className="w-full max-w-full px-8 py-6 text-center">
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Close frame button */}
      {onClickX && (
        <button
          className="cut-edge-t-l-b-r-sm absolute right-[50%] bottom-0 z-10 translate-x-1/2 translate-y-1/2 p-1 text-gray-700 hover:bg-gray-700 focus:outline-none"
          style={{
            backgroundColor: theme.primaryColor,
          }}
          onClick={onClickX}
          aria-label="Close Frame"
        >
          <X size={24} />
        </button>
      )}
    </>
  );
};

export default Frame;
