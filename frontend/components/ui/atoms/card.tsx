import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'highlight';
}

/**
 * Card Component
 *
 * A reusable card container component with consistent styling.
 *
 * @param children - Content to be rendered inside the card
 * @param className - Additional CSS classes
 * @param variant - Card style variant (default or highlight)
 */
export const Card = ({ children, className = '', variant = 'default' }: CardProps) => {
  const baseStyles = 'rounded-3xl p-6 shadow-sm';
  const variantStyles = {
    default: 'bg-white',
    highlight: 'bg-gray-50/50 backdrop-blur-sm',
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
};
