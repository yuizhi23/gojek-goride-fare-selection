import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  state?: 'default' | 'pressed' | 'disabled' | 'loading';
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

/**
 * Atom/Button Component
 * Part of Gojek Design System
 * 
 * Sizing: Height >= 48px, Radius 8px, Font Inter SemiBold 16/24
 * Colors: Primary #0B6E4F, Primary-Subtle #E8F3EE, Border #8D949E
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  state = 'default',
  isLoading = false,
  fullWidth = true,
  disabled = false,
  children,
  className = '',
  ...props
}) => {
  const isActuallyDisabled = disabled || state === 'disabled' || state === 'loading' || isLoading;
  const isActuallyLoading = state === 'loading' || isLoading;

  const baseStyles = "relative inline-flex items-center justify-center font-semibold text-[16px] leading-[24px] min-h-[48px] h-[48px] rounded-[8px] px-4 transition-all duration-150 select-none cursor-pointer outline-none active:scale-[0.985]";
  const widthStyles = fullWidth ? "w-full" : "w-auto";

  let variantStyles = "";
  if (variant === 'primary') {
    if (isActuallyDisabled && !isActuallyLoading) {
      variantStyles = "bg-[#F3F4F6] text-[#8D949E] border border-[#8D949E] cursor-not-allowed active:scale-100";
    } else {
      variantStyles = "bg-[#0B6E4F] hover:bg-[#08523A] active:bg-[#063B29] text-white";
    }
  } else {
    // secondary
    if (isActuallyDisabled && !isActuallyLoading) {
      variantStyles = "bg-transparent text-[#8D949E] border-[1.5px] border-[#8D949E] cursor-not-allowed active:scale-100";
    } else {
      variantStyles = "bg-transparent text-[#0B6E4F] border-[1.5px] border-[#0B6E4F] hover:bg-[#E8F3EE] active:bg-[#D5EADF]";
    }
  }

  return (
    <button
      disabled={isActuallyDisabled}
      className={`${baseStyles} ${widthStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {isActuallyLoading ? (
        <span className="inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
