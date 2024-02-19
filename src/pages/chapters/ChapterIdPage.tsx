import { Banner } from '@/components/Banner';
import { IconBadge } from '@/components/IconBadge';
import Loading from '@/components/Loading';
import ChapterAccessForm from '@/components/teacher/chapters/ChapterAccessForm';
import ChapterActions from '@/components/teacher/chapters/ChapterActions';
import ChapterDescriptionForm from '@/components/teacher/chapters/ChapterDescriptionForm';
import ChapterTitleForm from '@/components/teacher/chapters/ChapterTitleForm';
import ChapterVideoForm from '@/components/teacher/chapters/ChapterVideoForm';
import useReactQuery from '@/hooks/useReactQuery';
import { Chapter } from '@/libs/types';
import { getChapter } from '@/services/chapter-services';
import { ArrowLeft, Eye, LayoutDashboard, Video } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const ChapterIdPage = () => {
	const { courseId, chapterId } = useParams<{
		courseId: string;
		chapterId: string;
	}>();

	const {
		data: chapter,
		isLoading,
		error,
	} = useReactQuery<Chapter>('chapter', () => getChapter(chapterId!), [
		chapterId,
	]);

	if (error) return <h1>{error?.message}</h1>;

	if (isLoading) return <Loading />;

	const requiredFields = [
		chapter?.title,
		chapter?.description,
		chapter?.videoUrl,
	];

	const totalFields = requiredFields.length;
	const completedFields = requiredFields.filter(Boolean).length;

	const completionText = `(${completedFields}/${totalFields})`;

	const isComplete = requiredFields.every(Boolean);

	return (
		<>
			{!chapter?.isPublished && (
				<Banner
					variant="warning"
					label="This chapter is unpublished. It will not be visible in the course"
				/>
			)}
			<div className="p-6">
				<div className="flex items-center justify-between">
					<div className="w-full">
						<Link
							to={`/teacher/courses/${courseId}`}
							className="flex items-center text-sm hover:opacity-75 transition mb-6"
						>
							<ArrowLeft className="w-4 h-4 mr-2" /> Back to course setup
						</Link>
						<div className="flex items-center justify-between w-full">
							<div className="flex flex-col gap-y-2">
								<h1 className="text-2xl font-medium">Chapter Creation</h1>
								<span className="text-sm text-slate-700">
									Complete all fields {completionText}
								</span>
							</div>
							<ChapterActions
								disabled={!isComplete}
								chapterId={chapterId!}
								isPublished={chapter?.isPublished!}
							/>
						</div>
					</div>
				</div>
				<div className="grid gird-cols-1 md:grid-cols-2 gap-6 mt-16">
					<div className="space-y-4">
						<div>
							<div className="flex items-center gap-x-2">
								<IconBadge icon={LayoutDashboard} />
								<h2 className="text-xl">Customize your chapter</h2>
							</div>

							<ChapterTitleForm initialData={chapter!} chapterId={chapterId!} />
							<ChapterDescriptionForm
								initialData={chapter!}
								chapterId={chapterId!}
							/>
						</div>
						<div>
							<div className="flex items-center gap-x-2">
								<IconBadge icon={Eye} />
								<h2 className="text-xl">Access Setting</h2>
							</div>
							<ChapterAccessForm
								initialData={chapter!}
								chapterId={chapterId!}
							/>
						</div>
					</div>
					<div>
						<div className="flex items-center gap-x-2">
							<IconBadge icon={Video} />
							<h2 className="text-xl">Add a video</h2>
						</div>
						<ChapterVideoForm initialData={chapter!} chapterId={chapterId!} />
					</div>
				</div>
			</div>
		</>
	);
};

export default ChapterIdPage;
