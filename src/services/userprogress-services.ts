import { UserProgress } from '@/libs/types';
import { getAll, patch, post } from './api-client';

const endpoint = '/userprogresses';

export const getUserProgresses = () => getAll<UserProgress>(endpoint);

export const createUserProgress = (data: UserProgress) =>
	post<UserProgress>(endpoint, data);

export const editUserProgress = (data: UserProgress) =>
	patch<UserProgress>(endpoint, data, data.id);
