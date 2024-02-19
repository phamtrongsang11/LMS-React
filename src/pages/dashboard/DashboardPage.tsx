import CoursesList from '@/components/CourseList';
import Loading from '@/components/Loading';
import InfoCard from '@/components/dashboard/InfoCard';
import useClerkUser from '@/hooks/useClerkUser';
import useReactQuery from '@/hooks/useReactQuery';
import { CourseWithProgress } from '@/libs/types';
import { getUnAndCompleteCourse } from '@/services/course-services';
import { CheckCircle, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

const DashboardPage = () => {
	const { user, isLoaded } = useClerkUser();
	const [courses, setCourses] = useState<CourseWithProgress[]>([]);

	const {
		data: unAndCompletedCourse,
		isLoading,
		error,
	} = useReactQuery(
		'unAndCompletedCourses',
		() => getUnAndCompleteCourse(user?.id!),
		[user?.id],
		!!user
	);

	useEffect(() => {
		if (unAndCompletedCourse) {
			const completeCourse: CourseWithProgress[] =
				unAndCompletedCourse?.completeCourses.map((course: any) => {
					const progress = course.progress;
					return {
						...course.courseResponseDto,
						progress,
					};
				});

			const uncompleteCourse: CourseWithProgress[] =
				unAndCompletedCourse?.uncompleteCourses.map((course: any) => {
					const progress = course.progress;
					return {
						...course.courseResponseDto,
						progress,
					};
				});

			setCourses([...completeCourse, ...uncompleteCourse]);
		}
	}, [unAndCompletedCourse]);

	if (error) return <h1>{error?.message}</h1>;

	if (isLoading || !isLoaded) return <Loading />;

	return (
		<div className="p-6 space-y-4">
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<InfoCard
					icon={Clock}
					label="In Progress"
					numberOfItems={unAndCompletedCourse?.uncompleteCourses.length || 0}
				/>
				<InfoCard
					icon={CheckCircle}
					label="Completed"
					numberOfItems={unAndCompletedCourse?.completeCourses.length || 0}
					variant="success"
				/>
			</div>
			<CoursesList items={courses} />
		</div>
	);
};

export default DashboardPage;
