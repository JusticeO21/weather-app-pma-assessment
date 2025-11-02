import { MetricCard } from '@/components/ui/molecules/metric-card';
import { MetricConfig } from '@/types/record';

interface RecordMetricsGridProps {
  metrics: MetricConfig[];
}

/**
 * Grid display of weather metric cards
 */
export const RecordMetricsGrid = ({ metrics }: RecordMetricsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {metrics.map((metric) => (
        <div
          key={metric.title}
          className={metric.fullWidth ? 'md:col-span-2' : ''}
        >
          <MetricCard
            title={metric.title}
            value={metric.value ?? ''}
            unit={metric.unit}
            subtitle={metric.subtitle}
            icon={metric.icon}
          />
        </div>
      ))}
    </div>
  );
};
