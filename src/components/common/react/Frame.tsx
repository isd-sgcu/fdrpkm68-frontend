import React, { useMemo } from 'react';
import type { ReactNode } from 'react';

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
  size?: 'lg' | 'md' | 'sm' | 'xs';
  color?: 'blue' | 'purple';
  className?: string;
  noWrapper?: boolean;
  children: ReactNode;
}

const Frame: React.FC<FrameProps> = ({ 
  size = 'lg', 
  color = 'blue',
  className = '',
  noWrapper = false,
  children
}) => {
  const frameSvg = `/images/frame/frame-${color}-${size}.svg`;

  // Size configuration with aspect ratios and minimum heights
  const sizeConfig = {
    lg: {
      aspectRatio: '346/550',
      minHeight: '550px',
    },
    md: {
      aspectRatio: '346/430',
      minHeight: '430px',
    },
    sm: {
      aspectRatio: '346/340',
      minHeight: '340px',
    },
    xs: {
      aspectRatio: '346/248',
      minHeight: '248px',
    }
  };

  const config = sizeConfig[size];

  // Generate stable unique ID that doesn't change on re-renders
  const frameId = useMemo(() => 
    `frame-${Math.random().toString(36).substr(2, 9)}`, 
    []
  );
  
  const contentClipClass = `frame-content-clip-${frameId}`;
  const containerClass = `frame-container-${frameId}`;

  // Size-specific content margins
  const contentMargins = {
    lg: '8% 10%',
    md: '6% 9%',
    sm: '5% 8%',
    xs: '4% 7%'
  };

  // CSS styles as a string
  const styles = `
    .${contentClipClass} {
      scrollbar-width: thin;
      scrollbar-color: rgba(0, 0, 0, 0.3) transparent;
      margin: ${contentMargins[size]};
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
      
      .${contentClipClass} {
        margin: 3% 5% !important;
      }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      
      <div 
        className={`${containerClass} relative w-full max-h-screen overflow-visible ${className}`}
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
            backgroundSize: '100% 100%',
          }}
        />
        
        {/* Content area with proper clipping */}
        <div className={`absolute inset-0 flex content-area ${contentClipClass} overflow-y-auto overflow-x-hidden`}>
          {noWrapper ? children : (
            <div className="text-center w-full max-w-full px-8 py-6">
              {children}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Frame;
