import { useState } from 'react';
import { saveWeatherRecord } from '@/lib/api/records';
import { showToast, dismissToast } from '@/lib/toast';
import { useSaveCooldown } from './useSaveCooldown';

interface SaveWeatherRecordParams {
  location: string;
  country: string;
  main: string;
  description: string;
  temp: string;
  humidity: string;
  pressure: string;
  wind: string;
}

/**
 * Custom hook for saving weather records with cooldown and validation
 */
export const useSaveWeatherRecord = () => {
  const [isSaving, setIsSaving] = useState(false);
  const { canSave, recordSave, getRemainingCooldown } = useSaveCooldown();

  const saveRecord = async (data: SaveWeatherRecordParams) => {
    const { location } = data;

    if (!location) {
      showToast('error', 'Location information is missing');
      return;
    }

    // Check cooldown
    if (!canSave(location)) {
      const remainingMs = getRemainingCooldown(location);
      const remainingMinutes = Math.ceil(remainingMs / (60 * 1000));
      showToast(
        'error',
        `Please wait ${remainingMinutes} more minutes before saving data for ${location} again`,
      );
      return;
    }

    if (!data.country || !data.main || !data.description) {
      showToast('error', 'Missing weather data');
      return;
    }

    const loadingId = showToast('loading', 'Saving weather record...');
    setIsSaving(true);

    try {
      await saveWeatherRecord(data);
      recordSave(location);
      showToast('success', 'Weather record saved successfully!');
    } catch (error) {
      console.error('Failed to save record:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to save weather record';
      showToast('error', errorMessage);
    } finally {
      setIsSaving(false);
      dismissToast(loadingId);
    }
  };

  return {
    saveRecord,
    isSaving,
  };
};
