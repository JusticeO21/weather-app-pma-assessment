import { WeatherIcon } from '../atoms';
import { Card, Text } from '../atoms';

interface DayCardProps {
  day: string;
  temp_min: number;
  temp_max: number;
  description: string;
  icon: string;
}

export const DayCard = ({
  day,
  temp_min,
  temp_max,
  description,
  icon,
}: DayCardProps) => {
  return (
    <Card
      variant="default"
      className="flex flex-col items-center justify-center py-3 hover:shadow-md transition-shadow gap-2 !bg-gray-50"
    >
      <Text variant="caption" className="font-bold">
        {day}
      </Text>
      <div>
        <WeatherIcon as="icon" icon={icon} className="w-15 h-15" />
      </div>
      <div className="flex items-center gap-2">
        <Text variant="body" className="text-gray-800 text-sm">
          {Math.round(temp_max)}°C
        </Text>
        <Text variant="body" className="text-gray-500 text-sm">
          {Math.round(temp_min)}°C
        </Text>
      </div>
      <Text variant="caption" className="text-sm font-bold">
        {description}
      </Text>
    </Card>
  );
};
