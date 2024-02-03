import { Banner } from '@/components/Banner';
import CourseEnrollButton from '@/components/search/CourseEnrollButton';
import CourseProgressButton from '@/components/search/CourseProgressButton';
import { VideoPlayer } from '@/components/teacher/chapters/VideoPlayer';
import { Preview } from '@/components/ui/preview';
import { Separator } from '@/components/ui/separator';
import useClerkUser from '@/hooks/useClerkUser';
import useReactQuery from '@/hooks/useReactQuery';
import { getAllInfoChapter } from '@/services/chapter-services';
import { File } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const SearchChapterIdPage = () => {
	const { chapterId, courseId } = useParams<{
		chapterId: string;
		courseId: string;
	}>();

	const { user, isLoaded } = useClerkUser();

	const {
		data: chapters,
		isLoading,
		error,
	} = useReactQuery(
		'chapterInfo',
		() => getAllInfoChapter(courseId!, chapterId!, user?.id!),
		[chapterId],
		!!user
	);

	if (error) return <h1>{error?.message}</h1>;

	if (isLoading || !isLoaded) return <h1>Loading...</h1>;

	const isLocked = !chapters?.chapter.isFree && !chapters?.purchase;
	const completeOnEnd =
		!!chapters?.purchase && !chapters?.userProgress?.isCompleted;

	return (
		<div>
			{chapters?.userProgress?.isCompleted && (
				<Banner variant="success" label="You already completed this chapter." />
			)}

			{isLocked && (
				<Banner
					variant="warning"
					label="You need to purchase this course to watch this chapter."
				/>
			)}
			<div className="flex flex-col max-w-4xl mx-auto pb-20">
				<div className="p-4">
					<VideoPlayer
						url={chapters?.chapter.videoUrl!}
						chapterId={chapterId!}
						courseId={courseId!}
						userProgressId={chapters?.userProgress?.id!}
						nextChapterId={chapters?.nextChapter?.id}
						isLocked={isLocked}
						completeOnEnd={completeOnEnd}
					/>
				</div>
				<div>
					<div className="p-4 flex flex-col md:flex-row items-center justify-between">
						<h2 className="text-2xl font-semibold mb-2">
							{chapters?.chapter.title}
						</h2>
						{chapters?.purchase ? (
							<CourseProgressButton
								chapterId={chapterId!}
								courseId={courseId!}
								userProgressId={chapters?.userProgress.id}
								nextChapterId={chapters.nextChapter?.id}
								isCompleted={!!chapters?.userProgress?.isCompleted}
							/>
						) : (
							<CourseEnrollButton
								userId={user?.id!}
								courseId={courseId!}
								price={chapters?.course.price!}
							/>
						)}
					</div>
					<Separator />
					<div>
						<h2 className="text-xl font-semibold mb-2">Description</h2>
						<Preview value={chapters?.chapter.description!} />
					</div>
					{!!chapters?.attachments.length && (
						<>
							<Separator />
							<h2 className="text-xl font-semibold mb-2">Attachments</h2>
							<div className="p-4">
								{chapters?.attachments.map((attachment) => (
									<a
										href={attachment.url}
										target="_blank"
										key={attachment.id}
										className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
									>
										<File />
										<p className="line-clamp-1">{attachment.name}</p>
									</a>
								))}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default SearchChapterIdPage;
