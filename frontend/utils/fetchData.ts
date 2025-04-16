import { Exercise } from '@/types/exercise';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';


export const fetchData = async <T>(endpoint: string, params: Record<string, any> = {}): Promise<T> => {
    try {
        const url = `${API_URL}${endpoint}`;
        const response = await axios.get<{ data: T; success: boolean }>(url, { params });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const getExercises = async (params: Record<string, any> = {}): Promise<Exercise[]> => {
    return fetchData<Exercise[]>('/exercises', params);
};

/* export const getExerciseById = async (id: string): Promise<Exercise> => {
    return fetchData<Exercise>(`/exercises/${id}`);
}; */


export const getBodyPartList = async (): Promise<string[]> => {
    return fetchData<string[]>('/exercises/bodyPartList');
};


export const getExercisesByBodyPart = async (bodyPart: string): Promise<Exercise[]> => {
    return fetchData<Exercise[]>(`/exercises/bodyPart/${bodyPart}`);
};


export const getSimilarExercises = async (id: string): Promise<Exercise[]> => {
    return fetchData<Exercise[]>(`/exercises/${id}/similar`);
};

export const searchExercises = async (term: string): Promise<Exercise[]> => {
    return fetchData<Exercise[]>('/exercises', { search: term });
};

export const exerciseOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY || ''
    }
};

export const youtubeOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY || ''
    }
};
export const getExerciseById = async (id: string): Promise<Exercise> => {
    const exercise = await fetchData<Exercise>(`/exercises/${id}`);
    
    // Fallback para gifUrl si no está presente
    return {
      ...exercise,
      gifUrl: exercise.gifUrl || 
        `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}/gif`
    };
  };
