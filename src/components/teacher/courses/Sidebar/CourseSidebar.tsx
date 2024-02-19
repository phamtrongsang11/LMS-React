import CourseProgress from '@/components/CourseProgress';
import Loading from '@/components/Loading';
import useClerkUser from '@/hooks/useClerkUser';
import useReactQuery from '@/hooks/useReactQuery';
import { Course } from '@/libs/types';
import { getPurchaseByCourseUser } from '@/services/purchases-services';
import CourseSidebarItem from './CourseSidebarItem';

interface CourseSidbarProps {
	course: Course;
	progressCount: number;
}

const CourseSidebar = ({ course, progressCount }: CourseSidbarProps) => {
	const { user, isLoaded } = useClerkUser();

	const { data: purchase, isLoading } = useReactQuery(
		'purchaseCourse',
		() => getPurchaseByCourseUser(course.id, user?.id!),
		[course.id],
		!!user
	);

	if (isLoading || !isLoaded) return <Loading />;

	return (
		<div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
			<div className="p-8 flex flex-col border-b">
				<h1 className="font-semibold">{course.title}</h1>
				{purchase && (
					<div className="mt-10">
						<CourseProgress variant="success" value={progressCount} />
					</div>
				)}
			</div>
			<div className="flex flex-col w-full">
				{course.chapters.map((chapter) => (
					<CourseSidebarItem
						key={chapter.id}
						id={chapter.id}
						label={chapter.title}
						isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
						courseId={course.id}
						isLocked={!chapter.isFree && !purchase}
					/>
				))}
			</div>
		</div>
	);
};

export default CourseSidebar;
