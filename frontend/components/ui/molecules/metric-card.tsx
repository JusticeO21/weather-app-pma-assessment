import { ReactNode } from 'react';
import { Card, Text } from '../atoms';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  icon?: ReactNode;
  status?: {
    label: string;
    emoji: string;
  };
  indicator?: ReactNode;
}

/**
 * MetricCard Component
 *
 * Displays a weather metric with title, value, and optional status indicator.
 *
 * @param title - Metric title
 * @param value - Metric value
 * @param unit - Unit of measurement
 * @param subtitle - Additional subtitle text
 * @param icon - Optional icon element
 * @param status - Status label with emoji
 * @param indicator - Visual indicator element
 */
export const MetricCard = ({
  title,
  value,
  unit,
  subtitle,
  icon,
  status,
  indicator,
}: MetricCardProps) => {
  return (
    <Card variant="highlight" className="flex flex-col bg-gray-50">
      <Text variant="caption" className="mb-4">
        {title}
      </Text>
      <div className="flex items-end justify-between flex-1">
        <div>
          <div className="flex items-baseline gap-1 mb-2">
            <Text variant="h2" className="text-gray-900">
              {value}
            </Text>
            {unit && (
              <Text variant="body" className="text-gray-600">
                {unit}
              </Text>
            )}
          </div>
          {subtitle && (
            <div className="flex items-center gap-2">
              {icon}
              <Text variant="caption" className="text-gray-500">
                {subtitle}
              </Text>
            </div>
          )}
          {status && (
            <div className="flex items-center gap-2 mt-2">
              <Text variant="body" className="text-gray-700">
                {status.label}
              </Text>
              <span className="text-xl">{status.emoji}</span>
            </div>
          )}
        </div>
        {indicator && <div className="ml-4">{indicator}</div>}
      </div>
    </Card>
  );
};
