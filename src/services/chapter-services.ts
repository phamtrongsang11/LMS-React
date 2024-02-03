import { Chapter, UserProgress, chapterResponse } from '@/libs/types';
import { deleteOne, get, getAll, patch, post } from './api-client';
import { AxiosRequestConfig } from 'axios';

const endpoint = '/chapters';

export const getChapters = () => getAll<Chapter>(endpoint);

export const getChapter = (id: string, config?: AxiosRequestConfig) =>
	get<Chapter>(endpoint, id, config);

export const createChapter = (data: Chapter) => post<Chapter>(endpoint, data);

export const editChapter = (data: Chapter) =>
	patch<Chapter>(endpoint, data, data.id);

export const deleteChapter = (id: string) => deleteOne<Chapter>(endpoint, id);

type reorderChapterProps = { id: string; position: number }[];
export const reorderChapter = (data: reorderChapterProps) =>
	patch<reorderChapterProps>(endpoint + '/reorder', data);

export const editChapterPublished = ({
	id,
	isPublished,
}: {
	id: string;
	isPublished: boolean;
}) =>
	!isPublished
		? patch<Chapter>(endpoint + `/${id}/publish`)
		: patch<Chapter>(endpoint + `/${id}/unpublish`);

export const getAllInfoChapter = (
	courseId: string,
	chapterId: string,
	userId: string
) =>
	get<chapterResponse>(endpoint + '/allinfo', undefined, {
		params: {
			courseId,
			chapterId,
			userId,
		},
	}).then((res) => {
		if (!res.userProgress) {
			get<UserProgress>('/userprogresses', undefined, {
				params: {
					userId,
					chapterId,
				},
			}).then((userProgress) => (res.userProgress = userProgress));
		}
		return res;
	});

export const getChaptersByCourse = (courseId: string) =>
	getAll<Chapter>(endpoint + '/course', {
		params: {
			courseId,
		},
	});
