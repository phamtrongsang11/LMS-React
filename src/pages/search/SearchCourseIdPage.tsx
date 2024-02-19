import Loading from '@/components/Loading';
import useReactQuery from '@/hooks/useReactQuery';
import { getChaptersByCourse } from '@/services/chapter-services';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SearchCourseIdPage = () => {
	const navigate = useNavigate();
	const { courseId } = useParams<{
		courseId: string;
	}>();

	const { data: chapters, isLoading } = useReactQuery(
		'chapterByCourse',
		() => getChaptersByCourse(courseId!),
		[courseId]
	);

	useEffect(() => {
		if (!isLoading && chapters)
			navigate(`/courses/${courseId}/chapters/${chapters[0].id}`);
	}, [chapters]);

	if (isLoading) return <Loading />;
};

export default SearchCourseIdPage;
