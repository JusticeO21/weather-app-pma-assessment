import { ReactNode } from 'react';

interface TextProps {
  children: ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'label';
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'label';
}

/**
 * Text Component
 *
 * A typography component with predefined variants for consistent text styling.
 *
 * @param children - Text content
 * @param variant - Typography variant
 * @param as - HTML element to render
 * @param className - Additional CSS classes
 */
export const Text = ({
  children,
  variant = 'body',
  as,
  className = '',
}: TextProps) => {
  const variants = {
    h1: 'text-7xl font-light',
    h2: 'text-3xl font-semibold',
    h3: 'text-xl font-semibold',
    h4: 'text-lg font-semibold',
    body: 'text-base',
    caption: 'text-sm text-gray-600',
    label: 'text-xs text-gray-500 uppercase tracking-wide',
  };

  const defaultElement = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    body: 'p',
    caption: 'p',
    label: 'span',
  };

  const Tag = as || defaultElement[variant];
  const Element = Tag as React.ElementType;

  return (
    <Element className={`${variants[variant]} ${className}`}>
      {children}
    </Element>
  );
};
