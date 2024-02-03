import { Category } from '@/libs/types';
import { getAll } from './api-client';

const endpoint = '/categories';

export const getCategories = () => getAll<Category>(endpoint);
