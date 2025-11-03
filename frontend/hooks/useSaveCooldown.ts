import { useRef } from 'react';

const COOLDOWN_MS = 3 * 60 * 1000;

export const useSaveCooldown = () => {
  const lastSaveTimes = useRef<Record<string, number>>({});

  const canSave = (location: string) => {
    const lastSave = lastSaveTimes.current[location];
    if (!lastSave) return true;
    return Date.now() - lastSave > COOLDOWN_MS;
  };

  const recordSave = (location: string) => {
    lastSaveTimes.current[location] = Date.now();
  };

  const getRemainingCooldown = (location: string) => {
    const lastSave = lastSaveTimes.current[location];
    if (!lastSave) return 0;
    return Math.max(0, COOLDOWN_MS - (Date.now() - lastSave));
  };

  return { canSave, recordSave, getRemainingCooldown };
};
