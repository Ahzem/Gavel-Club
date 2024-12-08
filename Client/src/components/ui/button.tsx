import * as React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className = '',
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    icon,
    iconPosition = 'left',
    children,
    ...props
  }, ref) => {
    const [coords, setCoords] = React.useState({ x: -1, y: -1 });
    const [isRippling, setIsRippling] = React.useState(false);

    React.useEffect(() => {
      if (coords.x !== -1 && coords.y !== -1) {
        setIsRippling(true);
        setTimeout(() => setIsRippling(false), 300);
      } else {
        setIsRippling(false);
      }
    }, [coords]);

    React.useEffect(() => {
      if (!isRippling) setCoords({ x: -1, y: -1 });
    }, [isRippling]);

    const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      setCoords({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      });
    };

    const buttonClass = `btn btn--${variant} btn--${size} ${
      loading ? 'btn--loading' : ''
    } ${disabled ? 'btn--disabled' : ''} ${className}`;

    return (
      <button
        className={buttonClass}
        ref={ref}
        disabled={disabled || loading}
        onClick={createRipple}
        {...props}
      >
        {loading && <span className="btn__spinner" />}
        <span className="btn__content">
          {iconPosition === 'left' && icon && <span className="btn__icon">{icon}</span>}
          {children}
          {iconPosition === 'right' && icon && <span className="btn__icon">{icon}</span>}
        </span>
        {isRippling && (
          <span
            className="btn__ripple"
            style={{
              left: coords.x,
              top: coords.y
            }}
          />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';