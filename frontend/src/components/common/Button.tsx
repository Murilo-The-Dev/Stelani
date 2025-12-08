import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-semibold transition-all',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400',
          'disabled:opacity-50 disabled:pointer-events-none',
          'active:scale-95',
          {
            'bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:from-purple-500 hover:to-pink-500 shadow-md hover:shadow-lg':
              variant === 'default',
            'border-2 border-purple-300 bg-transparent hover:bg-purple-50 text-purple-600':
              variant === 'outline',
            'hover:bg-purple-100 text-purple-700': variant === 'ghost',
          },
          {
            'h-11 px-6 py-2': size === 'default',
            'h-9 px-4 text-sm': size === 'sm',
            'h-12 px-8 text-lg': size === 'lg',
            'h-10 w-10': size === 'icon',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;