import { AnalyticsResponse, Category, Purchase } from '@/libs/types';
import { get, getAll, patch, post } from './api-client';

const endpoint = '/purchases';

export const getPurchases = () => getAll<Purchase>(endpoint);
export const createPurchase = (data: Purchase) =>
	post<Purchase>(endpoint, data);
export const editPurchases = (data: Purchase) =>
	patch<Purchase>(endpoint, data, data.id);

export const getAnalytics = (userId: string) =>
	get<AnalyticsResponse>(endpoint + '/analytics', undefined, {
		params: {
			userId,
		},
	});

export const getPurchaseByCourseUser = (courseId: string, userId: string) =>
	get<Purchase>(endpoint + '/usercourse', undefined, {
		params: {
			userId,
			courseId,
		},
	});
