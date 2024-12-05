import * as React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const buttonVariants = ({
  variant = 'primary',
  size = 'md',
  className = ''
}: Partial<ButtonProps> = {}): string => {
  return `btn btn--${variant} btn--${size} ${className}`;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
    const buttonClass = `btn btn--${variant} btn--${size} ${className}`;
    
    return (
      <button className={buttonClass} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';