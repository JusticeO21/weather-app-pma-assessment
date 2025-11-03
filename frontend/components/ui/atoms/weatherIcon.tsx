import Image from 'next/image';
import { cn } from '@/lib/utils';

interface WeatherIconProps {
  icon: string;
  className?: string;
  priority?: boolean;
  as?: 'icon' | 'image';
}

/**
 * WeatherIcon Component
 *
 * Renders the appropriate weather icon based on the condition.
 *
 * @param condition - Weather condition type
 * @param size - Icon size in pixels
 * @param className - Additional CSS classes
 */

const weatherImages: Record<string, string> = {
  Clear: '/images/clear.png',
  Clouds: '/images/clouds.png',
  Rain: '/images/rain.png',
  Drizzle: '/images/drizzle.png',
  Thunderstorm: '/images/thunderstorm.png',
  Snow: '/images/snow.png',
  Mist: '/images/mist.png',
};

export const WeatherIcon = ({
  icon,
  className = '',
  as = 'image',
  priority = false,
}: WeatherIconProps) => {
  return (
    <div className={cn('relative w-24 h-24', className)}>
      <Image
        src={
          as === 'image'
            ? weatherImages[icon]
            : `https://openweathermap.org/img/wn/${icon}.png`
        }
        alt="j"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={100}
        loading={priority ? 'eager' : 'lazy'}
        priority={priority}
      />
    </div>
  );
};
