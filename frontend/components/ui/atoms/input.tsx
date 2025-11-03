import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

/**
 * Input Component
 *
 * A styled input field component with error handling support.
 *
 * @param error - Error message to display
 * @param className - Additional CSS classes
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={`w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-400 ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';
