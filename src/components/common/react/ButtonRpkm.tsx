import { cn } from '@/lib/utils';
import { type AnchorHTMLAttributes, type ReactNode } from 'react';

/**
 * ButtonRpkm
 * @example
 * // Basic usage
 * <ButtonRpkm href="/path">Click me</ButtonRpkm>
 * 
 * @example
 * // Different colors and sizes
 * <ButtonRpkm href="/path" color="blue" size="lg">Large Blue Button</ButtonRpkm>
 * <ButtonRpkm href="/path" variant="stroke" color="pink">Outlined Pink</ButtonRpkm>
 * 
 * @example
 * // With icon
 * <ButtonRpkm href="/path" color="purple" icon={<Icon name="play" />}>
 *   Start Game
 * </ButtonRpkm>
 * 
 * Features:
 * - Fill variant: Gradient backgrounds with different patterns based on size
 * - Stroke variant: SVG-generated borders with edge cuts
 * - 4 color themes: purple, blue, pink, black
 * - 4 sizes: xs (104px), sm (128px), md (176px), lg (256px)
 * - Large buttons get a special triple-point gradient effect
 * 
 * @param {('fill'|'stroke')} variant - Button style (default: 'fill')
 * @param {('purple'|'blue'|'pink'|'black')} color - Color theme (default: 'purple') 
 * @param {('xs'|'sm'|'md'|'lg')} size - Button size (default: 'md')
 * @param {boolean} disabled - Disabled state
 * @param {string} className - Additional CSS classes
 * @param {ReactNode} icon - Icon element to display
 * @param {ReactNode} children - Button content
 */

export type RpkmColorName = 'purple' | 'blue' | 'pink' | 'black';

export interface ButtonRpkmProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> {
  variant?: 'fill' | 'stroke';
  color?: RpkmColorName;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
  icon?: ReactNode;
  children: ReactNode;
}

export default function ButtonRpkm({ 
  variant = 'fill',
  color = 'purple',
  size = 'md',
  disabled = false,
  className = '',
  href,
  target,
  rel,
  icon,
  children,
  ...restProps
}: ButtonRpkmProps) {
  // Color configuration for different variants
  const colorConfig = {
    purple: {
      fill: {
        base: 'text-white drop-shadow-[0px_2px_5px_rgba(255,255,255,0.3)]',
        disabled: 'disabled:opacity-50'
      },
      stroke: {
        base: 'bg-transparent text-[#8a2be4] relative',
        disabled: 'disabled:opacity-50'
      }
    },
    blue: {
      fill: {
        base: 'text-white drop-shadow-[0px_2px_5px_rgba(255,255,255,0.3)]',
        disabled: 'disabled:opacity-50'
      },
      stroke: {
        base: 'bg-transparent text-[#00ffff] relative',
        disabled: 'disabled:opacity-50'
      }
    },
    pink: {
      fill: {
        base: 'text-white drop-shadow-[0px_2px_5px_rgba(255,255,255,0.3)]',
        disabled: 'disabled:opacity-50'
      },
      stroke: {
        base: 'bg-transparent text-[#ff1493] relative',
        disabled: 'disabled:opacity-50'
      }
    },
    black: {
      fill: {
        base: 'text-white drop-shadow-[0px_2px_5px_rgba(255,255,255,0.3)]',
        disabled: 'disabled:opacity-50'
      },
      stroke: {
        base: 'bg-transparent text-[#2b2d42] relative',
        disabled: 'disabled:opacity-50'
      }
    }
  };

  // Size configuration for different button sizes
  const sizeConfig = {
    xs: { 
      classes: 'px-3 py-2 text-sm',
      width: 'w-26',
      height: 'min-h-10',
      iconSize: 16
    },
    sm: { 
      classes: 'px-4 py-3 text-base',
      width: 'w-32',
      height: 'min-h-12',
      iconSize: 18
    },
    md: { 
      classes: 'px-5 py-3 text-lg',
      width: 'w-44',
      height: 'min-h-12',
      iconSize: 20
    },
    lg: { 
      classes: 'px-6 py-3 text-xl',
      width: 'w-64',
      height: 'min-h-12',
      iconSize: 24
    }
  };

  // Get current configurations
  const currentColorConfig = colorConfig[color][variant];
  const currentSizeConfig = sizeConfig[size];

  // Generate button classes using cn utility
  const buttonClasses = cn(
    // Base styles
    'relative inline-flex items-center justify-center font-medium',
    'transition-all duration-200 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:cursor-not-allowed',
    
    // Size and typography
    currentSizeConfig.classes,
    currentSizeConfig.width,
    currentSizeConfig.height,
    'font-ibm-plex-sans-thai',
    
    // Color and state
    currentColorConfig.base,
    currentColorConfig.disabled,
    
    // Edge cuts for RPKM style
    'cut-edge-all',
    
    // Additional classes
    'focus:outline-2 focus:outline-white/30 focus:outline-offset-2 text-decoration-none',
    variant === 'stroke' && 'bg-no-repeat bg-center bg-contain',
    disabled && 'pointer-events-none',
    
    // Custom classes
    className
  );

  // Generate gradient background for fill variants
  const getGradientStyle = (): string => {
    if (variant !== 'fill') return '';
    
    // Figma color palette
    const colors = {
      purple: '#8a2be4',
      blue: '#00ffff',
      pink: '#ff1493',
      black: '#2b2d42',
      navy: '#2b2d42',
      subBlack: '#000000'
    };
    
    const mainColor = colors[color];
    const navyColor = colors.navy;
    
    // Special handling for black buttons
    const primaryColor = color === 'black' ? navyColor : mainColor;
    const secondaryColor = color === 'black' ? colors.subBlack : navyColor;
    
    // Different gradient patterns based on size
    if (size === 'lg') {
      return `linear-gradient(90deg, ${primaryColor} 0%, ${secondaryColor} 50%, ${primaryColor} 100%)`;
    } else {
      return `linear-gradient(90deg, ${primaryColor} 0%, ${secondaryColor} 100%)`;
    }
  };

  // Generate SVG border for stroke variants
  const getSvgBorder = (): string => {
    if (variant !== 'stroke') return '';
    
    const colors = {
      purple: '#8a2be4',
      blue: '#00ffff',
      pink: '#ff1493',
      black: '#2b2d42'
    };
    
    const strokeColor = colors[color];
    const widthClass = currentSizeConfig.width;
    
    // Size to pixel mapping for SVG generation
    const dimensions = {
      'w-26': { width: 104, height: 40 },
      'w-32': { width: 128, height: 48 },
      'w-44': { width: 176, height: 48 },
      'w-64': { width: 256, height: 48 }
    };
    
    const { width, height } = dimensions[widthClass as keyof typeof dimensions] || { width: 176, height: 48 };
    const cutSize = 20;
    
    // Create SVG path with edge cuts
    const svgPath = `M${cutSize},0 L${width},0 L${width},${height - cutSize} L${width - cutSize},${height} L0,${height} L0,${cutSize} Z`;
    
    const svgDataUrl = `data:image/svg+xml,${encodeURIComponent(`
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <path d="${svgPath}" stroke="${strokeColor}" stroke-width="2" fill="none"/>
      </svg>
    `)}`;
    
    return `url("${svgDataUrl}")`;
  };

  // Build inline styles
  const inlineStyle: React.CSSProperties = {
    ...(variant === 'fill' && { background: getGradientStyle() }),
    ...(variant === 'stroke' && { backgroundImage: getSvgBorder() })
  };

  return (
    <a 
      href={href}
      target={target}
      rel={rel}
      className={buttonClasses}
      style={inlineStyle}
      data-variant={variant}
      data-color={color}
      data-size={size}
      aria-disabled={disabled}
      {...restProps}
    >
      <div className="flex items-center w-full relative z-10 overflow-hidde cursor-pointer">
        {icon && (
          <div className="flex-shrink-0">
            {icon}
          </div>
        )}
        <div className="flex-1 flex justify-center overflow-hidden">
          <div className="text-center leading-tight">
            {children}
          </div>
        </div>
      </div>
    </a>
  );
}