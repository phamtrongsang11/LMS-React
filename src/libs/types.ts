export type Course = {
	id: string;
	userId: string;
	title: string;
	description: string;
	imageUrl: string;
	price: number;
	isPublished: boolean;

	categoryId?: string;
	category: Category;

	attachments: Attachment[];
	chapters: Chapter[];
	purchases: Purchase[];

	createdAt?: Date;
	updatedAt?: Date;
};

export type Category = {
	id: string;
	name: string;
	courses: Course[];
};

export type Attachment = {
	id: string;
	name: string;
	url: string;

	courseId?: string;
	course: Course;

	createdAt: Date;
	updatedAt: Date;
};

export type Chapter = {
	id: string;
	title: string;
	description: string;
	videoUrl: string;
	position: number;
	isPublished: boolean;
	isFree: boolean;

	courseId?: string;
	course: Course;
	userProgress: UserProgress[];

	createdAt: Date;
	updatedAt: Date;
};

export type UserProgress = {
	id: string;
	userId: string;

	chapterId?: string;
	chapter: Chapter;
	isCompleted: boolean;

	createdAt: Date;
	updatedAt: Date;
};

export type Purchase = {
	id: string;
	userId: string;

	courseId?: string;
	course: Course;

	createdAt: Date;
	updatedAt: Date;
};

export type CourseWithProgress = Course & {
	progress: number | null;
};

export type CourseWithProgressResponse = {
	courseResponseDto: Course;
	progress: number | null;
};

export type UnAndCompleteCourse = {
	completeCourses: CourseWithProgressResponse[];
	uncompleteCourses: CourseWithProgressResponse[];
};

export type chapterResponse = {
	chapter: Chapter;
	course: Course;
	attachments: Attachment[];
	nextChapter: Chapter;
	userProgress: UserProgress;
	purchase: Purchase;
};

export type AnalyticsResponse = {
	data: { title: string; total: number }[];
	totalRevenue: number;
	totalSales: number;
};
