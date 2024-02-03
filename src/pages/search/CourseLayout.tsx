import CourseNavbar from '@/components/teacher/courses/Sidebar/CourseNavbar';
import CourseSidebar from '@/components/teacher/courses/Sidebar/CourseSidebar';
import useClerkUser from '@/hooks/useClerkUser';
import useReactQuery from '@/hooks/useReactQuery';
import { CourseWithProgress } from '@/libs/types';
import { getCourseWithProgressSingle } from '@/services/course-services';
import { Outlet, useParams } from 'react-router-dom';

const CourseLayout = () => {
	const { courseId, chapterId } = useParams<{
		courseId: string;
		chapterId: string;
	}>();

	const { user, isLoaded } = useClerkUser();

	const {
		data: course,
		isLoading,
		error,
	} = useReactQuery<CourseWithProgress>(
		'coursesWithProgress',
		() => getCourseWithProgressSingle(user?.id!, courseId!),
		[courseId],
		!!user
	);

	if (!isLoaded || isLoading) return <h1>Loading...</h1>;

	return (
		<div className="h-full">
			<div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
				<CourseNavbar course={course!} progressCount={course?.progress!} />
			</div>
			<div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
				<CourseSidebar course={course!} progressCount={course?.progress!} />
			</div>
			<main className="md:pl-80 h-full pt-[80px]">
				<Outlet />
			</main>
		</div>
	);
};

export default CourseLayout;
