import {
	Course,
	CourseWithProgress,
	CourseWithProgressResponse,
	UnAndCompleteCourse,
} from '@/libs/types';
import { deleteOne, get, getAll, patch, post } from './api-client';
import { AxiosRequestConfig } from 'axios';

const endpoint = '/courses';

export const getCourses = () => getAll<Course>(endpoint);

export const getCourse = (id: string, config?: AxiosRequestConfig) =>
	get<Course>(endpoint, id, config);

export const createCourse = (data: Course) => post<Course>(endpoint, data);

export const editCourse = (data: Course) =>
	patch<Course>(endpoint, data, data.id);

export const deleteCourse = (id: string) => deleteOne<Course>(endpoint, id);

export const getCourseWithProgress = (
	userId: string,
	title?: string,
	categoryId?: string
) =>
	getAll<CourseWithProgressResponse>(endpoint + '/progress', {
		params: {
			userId,
			title,
			categoryId,
		},
	}).then((res) => {
		const coursesWithProgress: CourseWithProgress[] = res.map((course) => {
			const progress = course.progress;
			return {
				...course.courseResponseDto,
				progress,
			};
		});
		return coursesWithProgress;
	});

export const getUnAndCompleteCourse = (userId: string) =>
	get<UnAndCompleteCourse>(endpoint + '/completed', undefined, {
		params: {
			userId,
		},
	});

export const getCoursesByUser = (userId: string) =>
	getAll<Course>(endpoint + '/user', {
		params: {
			userId,
		},
	});

export const editCoursePublished = ({
	id,
	isPublished,
}: {
	id: string;
	isPublished: boolean;
}) =>
	!isPublished
		? patch<Course>(endpoint + `/${id}/publish`)
		: patch<Course>(endpoint + `/${id}/unpublish`);

export const getCourseWithProgressSingle = (userId: string, courseId: string) =>
	get<CourseWithProgressResponse>(endpoint + '/progress/course', undefined, {
		params: {
			courseId,
			userId,
		},
	}).then((res) => {
		const progress = res.progress;

		const coursesWithProgress: CourseWithProgress = {
			...res.courseResponseDto,
			progress,
		};
		return coursesWithProgress;
	});
