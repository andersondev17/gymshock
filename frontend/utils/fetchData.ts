// utils/fetchData.ts
import axios from 'axios';

interface FetchOptions {
    method: string;
    headers: {
        'x-rapidapi-host': string;
        'x-rapidapi-key': string;
    };
}

const RAPID_API_KEY = process.env.NEXT_PUBLIC_RAPID_API_KEY;

if (!RAPID_API_KEY) {
    throw new Error('RAPID_API_KEY is not defined in environment variables');
}

export const exerciseOptions: FetchOptions = {
    method: 'GET',
    headers: {
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
        'x-rapidapi-key': RAPID_API_KEY
    }
};

export const youtubeOptions: FetchOptions = {
    method: 'GET',
    headers: {
        'x-rapidapi-host': 'youtube-search-and-download.p.rapidapi.com',
        'x-rapidapi-key': RAPID_API_KEY
    }
};


export const fetchData = async <T>(url: string, options: FetchOptions): Promise<T> => {
    try {
        const response = await axios<T>({
            method: options.method,
            url: url,
            headers: options.headers
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};