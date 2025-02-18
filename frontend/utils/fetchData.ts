// utils/fetchData.ts
import { APIOptions } from '@/types/exercise';

const API_KEY = process.env.NEXT_PUBLIC_RAPID_API_KEY;

if (!API_KEY) {
    throw new Error('NEXT_PUBLIC_RAPID_API_KEY is not defined');
}

export const exerciseOptions: APIOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
        'X-RapidAPI-Key': API_KEY,
    },
};

export const fetchData = async <T>(url: string): Promise<T> => {
    const response = await fetch(url, exerciseOptions);

    if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data as T;
};