import useReactQuery from '@/hooks/useReactQuery';
import { getChaptersByCourse } from '@/services/chapter-services';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SearchCourseIdPage = () => {
	const navigate = useNavigate();
	const { courseId } = useParams<{
		courseId: string;
	}>();

	const {
		data: chapters,
		isLoading,
		error,
	} = useReactQuery('chapterByCourse', () => getChaptersByCourse(courseId!), [
		courseId,
	]);

	useEffect(() => {
		if (!isLoading && chapters)
			navigate(`/courses/${courseId}/chapters/${chapters[0].id}`);
	}, [chapters]);

	if (isLoading) return <h1>Loading...</h1>;
};

export default SearchCourseIdPage;
