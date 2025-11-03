import { WeatherRecord } from '@/types/record';

/**
 * Fetches all saved weather records from the API
 * @returns {Promise<WeatherRecord[]>} A promise that resolves to an array of weather records
 * @throws {Error} If the request fails or returns a non-OK status
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://weather-app-pma-assessment-production.up.railway.app";
export async function fetchRecords(): Promise<WeatherRecord[]> {
    try {
        const response = await fetch(`${API_URL}/records`);
        if (!response.ok) {
            throw new Error(`Failed to fetch records: ${response.statusText}`);
        }
        const data = await response.json();
        return data.data
    } catch (error) {
        console.error('Error fetching records:', error);
        throw error;
    }
}

/**
 * Filters weather records by location
 * @param {string} location - The location to filter by
 * @returns {Promise<WeatherRecord[]>} A promise that resolves to filtered weather records
 * @throws {Error} If the request fails or returns a non-OK status
 */
export async function filterRecords(location: string): Promise<WeatherRecord[]> {
    try {
        const response = await fetch(`${API_URL}/records/filter?location=${location}`);
        if (response.status === 404) {
            return [];
        }
        if (!response.ok) {
            throw new Error(`Failed to filter records: ${response.statusText}`);
        }
        const data = await response.json();
        return data.data
    } catch (error) {
        console.error('Error filtering records:', error);
        throw error;
    }
}

/**
 * Fetches a single weather record by ID
 * @param {number} id - The ID of the record to fetch
 * @returns {Promise<WeatherRecord>} A promise that resolves to the requested weather record
 * @throws {Error} If the request fails, record is not found, or returns a non-OK status
 */
export async function fetchRecord(id: number): Promise<WeatherRecord> {
    try {
        const response = await fetch(`${API_URL}/records/${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch record ${id}: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data)
        return data.data
    } catch (error) {
        console.error(`Error fetching record ${id}:`, error);
        throw error;
    }
}

/**
 * Deletes a weather record by ID
 * @param {number} id - The ID of the record to delete
 * @returns {Promise<void>} A promise that resolves when the record is successfully deleted
 * @throws {Error} If the request fails or returns a non-OK status
 */
export async function deleteRecord(id: number): Promise<void> {
    try {
        const response = await fetch(`${API_URL}/records/${id}`, {
            method: 'DELETE',
        });
        
        if (!response.ok) {
            throw new Error(`Failed to delete record ${id}: ${response.statusText}`);
        }
    } catch (error) {
        console.error(`Error deleting record ${id}:`, error);
        throw error;
    }
}

/**
 * Saves a new weather record
 * @param {Omit<WeatherRecord, 'id' | 'saved_on'>} data - The weather data to save
 * @returns {Promise<WeatherRecord>} A promise that resolves to the saved record
 * @throws {Error} If the request fails or returns a non-OK status
 */
export async function saveWeatherRecord(
    data: Omit<WeatherRecord, 'id' | 'saved_on'>
): Promise<WeatherRecord> {
    try {
        const response = await fetch(`${API_URL}/records/save`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Failed to save record: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error saving weather record:', error);
        throw error;
    }
}


export const exportRecords = async (id?: number): Promise<void> => {
    let URL = `${API_URL}/records/export`;
    if (id) URL = `${URL}?id=${id}`;

    const response = await fetch(URL, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
        },
    });

    if (!response.ok) {
        let errorMessage = 'Failed to export data';
        try {
            const errorData = await response.json();
            console.log(errorData);
            
            errorMessage = errorData.detail || errorMessage;
        } catch (e) {
            // If we can't parse JSON error, use status text
            errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
    }

    const blob = await response.blob();
    
    if (blob.type === 'application/json') {
        const errorData = JSON.parse(await blob.text());
        throw new Error(errorData.detail || 'Invalid export data received');
    }

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", id ? `weather_record_${id}.csv` : 'weather_records.csv');
    document.body.appendChild(link);
    link.click();
    
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
};
