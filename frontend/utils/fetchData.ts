// utils/fetchData.ts
import { Exercise } from '@/types/exercise';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const fetchData = async <T>(endpoint: string, params: Record<string, any> = {}): Promise<T> => {
    try {
        const url = `${API_URL}${endpoint}`;
        const response = await axios.get<{ data: T }>(url, { params });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const getExercises = async (params: Record<string, any> = {}): Promise<Exercise[]> => {
    return fetchData<Exercise[]>('/exercises', params);
};

export const getExerciseById = async (id: string): Promise<Exercise> => {
    return fetchData<Exercise>(`/exercises/${id}`);
};

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