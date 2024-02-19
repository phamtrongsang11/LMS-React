import CoursesList from '@/components/CourseList';
import Loading from '@/components/Loading';
import SearchInput from '@/components/SearchInput';
import Categories from '@/components/search/Categories';
import useClerkUser from '@/hooks/useClerkUser';
import useReactQuery from '@/hooks/useReactQuery';
import { Category, CourseWithProgress } from '@/libs/types';
import { getCategories } from '@/services/category-services';
import { getCourseWithProgress } from '@/services/course-services';
import { useLocation } from 'react-router-dom';

const SearchPage = () => {
	const searchParams = new URLSearchParams(useLocation().search);
	const paramsKeyValue = Object.fromEntries(searchParams.entries());

	const { user, isLoaded } = useClerkUser();

	const {
		data: categories,
		isLoading: isLoadingCate,
		error: errorCate,
	} = useReactQuery<Category[]>('categories', getCategories);

	const {
		data: courses,
		isLoading,
		error,
	} = useReactQuery<CourseWithProgress[]>(
		'coursesWithProgress',
		() =>
			getCourseWithProgress(
				user?.id!,
				paramsKeyValue?.title,
				paramsKeyValue?.categoryId
			),
		[user?.id, paramsKeyValue?.title, paramsKeyValue?.categoryId],
		!!user
	);

	if (error || errorCate)
		return <h1>{error?.message || errorCate?.message}</h1>;

	if (isLoading || !isLoaded || isLoadingCate) return <Loading />;

	return (
		<>
			<div className="px-6 pt-6 md:hidden md:mb-0 block">
				<SearchInput />
			</div>
			<div className="p-6 space-y-4">
				<Categories items={categories!} />
				<CoursesList items={courses!} />
			</div>
		</>
	);
};

export default SearchPage;
