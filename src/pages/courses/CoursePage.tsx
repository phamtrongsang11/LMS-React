import { DataTable } from '@/components/teacher/courses/Table/DataTable';
import { columns } from '@/components/teacher/courses/Table/columns';
import useClerkUser from '@/hooks/useClerkUser';
import useReactQuery from '@/hooks/useReactQuery';
import { getCoursesByUser } from '@/services/course-services';

const CoursesPage = () => {
	const { user, isLoaded } = useClerkUser();

	const {
		data: courses,
		isLoading,
		error,
	} = useReactQuery(
		'coursesByUser',
		() => getCoursesByUser(user?.id!),
		[user?.id],
		!!user
	);

	if (error) return <h1>{error?.message}</h1>;

	if (isLoading || !isLoaded) return <h1>Loading...</h1>;

	return (
		<div className="p-6">
			<DataTable columns={columns} data={courses!} />
		</div>
	);
};

export default CoursesPage;
