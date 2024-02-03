import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from './pages/auth/AuthLayout';
import UserSignIn from './pages/auth/UserSignIn';
import UserSignUp from './pages/auth/UserSignUp';
import Layout from './pages/Layout';
import CreatePage from './pages/courses/CreatePage';
import DashboardPage from './pages/dashboard/DashboardPage';
import CoursePage from './pages/courses/CoursePage';
import CourseIdPage from './pages/courses/CourseIdPage';
import ChapterIdPage from './pages/chapters/ChapterIdPage';
import SearchPage from './pages/search/SearchPage';
import SearchCourseIdPage from './pages/search/SearchCourseIdPage';
import SearchChapterIdPage from './pages/search/SearchChapterIdPage';
import CourseLayout from './pages/search/CourseLayout';
import AnalyticsPage from './pages/analytics/AnalyticsPage';

const routes = createBrowserRouter([
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{ path: 'signin', element: <UserSignIn /> },
			{ path: 'signup', element: <UserSignUp /> },
		],
	},
	{
		path: '/courses/:courseId',
		element: <CourseLayout />,
		children: [
			{
				index: true,
				element: <SearchCourseIdPage />,
			},
			{
				path: 'chapters/:chapterId',
				element: <SearchChapterIdPage />,
			},
		],
	},

	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <DashboardPage />,
			},
			{
				path: '/search',
				element: <SearchPage />,
			},
			{
				path: '/teacher/courses',
				element: <CoursePage />,
			},
			{
				path: '/teacher/courses/create',
				element: <CreatePage />,
			},
			{ path: '/teacher/courses/:courseId', element: <CourseIdPage /> },
			{
				path: '/teacher/courses/:courseId/chapters/:chapterId',
				element: <ChapterIdPage />,
			},
			{
				path: '/teacher/analytics',
				element: <AnalyticsPage />,
			},
		],
	},
]);

export default routes;
