'use client';
import { WeekForecast, TodaysHighlights } from '@/components/ui/organisms';

export function Home() {
  return (
    <div className="flex flex-col gap-10">
      <WeekForecast />
      <TodaysHighlights />
    </div>
  );
}
