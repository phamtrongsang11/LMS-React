import FileUpload from '@/components/FIleUpload';
import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import useReactMutation from '@/hooks/useReactMutation';
import { Chapter } from '@/libs/types';
import { editChapter } from '@/services/chapter-services';
import { Pencil, PlusCircle, Video } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import ReactPlayer from 'react-player';
import * as z from 'zod';

interface ChapterVideoFormProps {
	initialData: Chapter;
	courseId: string;
	chapterId: string;
}

const formSchema = z.object({
	videoUrl: z.string().min(1),
});

type editVideoChapter = {
	id: string;
	videoUrl: string;
};

const ChapterVideoForm = ({
	initialData,
	courseId,
	chapterId,
}: ChapterVideoFormProps) => {
	const [isEditing, setIsEditing] = useState(false);

	const toggleEdit = () => setIsEditing((current) => !current);

	const { mutate, isPending } = useReactMutation<editVideoChapter>(
		editChapter,
		'chapter',
		[chapterId],
		() => {
			toast.success('Chapter updated');
			toggleEdit();
		}
	);

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		mutate({ id: chapterId, ...values });
	};

	if (isPending) return <Loading />;

	return (
		<div className="mt-6 border bg-slate-100 rounded-md p-4">
			<div className="font-medium flex items-center justify-between">
				Chapter video
				<Button onClick={toggleEdit} variant="ghost">
					{isEditing && <>Cancel</>}
					{!isEditing && !initialData.videoUrl && (
						<>
							<PlusCircle className="h-4 w-4 mr-2" /> Add a video
						</>
					)}
					{!isEditing && initialData.videoUrl && (
						<>
							<Pencil className="h-4 w-4 mr-2" /> Edit video
						</>
					)}
				</Button>
			</div>
			{!isEditing &&
				(!initialData.videoUrl ? (
					<div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
						<Video className="h-10 w-10 text-slate-500" />
					</div>
				) : (
					<div className="relative aspect-video mt-2">
						<ReactPlayer
							url={initialData?.videoUrl}
							playing
							loop
							width="100%"
							height="100%"
							controls
						/>
					</div>
				))}
			{isEditing && (
				<div>
					<FileUpload
						type="file"
						onChange={(url) => {
							if (url) onSubmit({ videoUrl: url });
						}}
					/>
					<div className="text-xs text-muted-foreground mt-4">
						Upload this chapter&apos;s video
					</div>
				</div>
			)}
			{initialData.videoUrl && !isEditing && (
				<div className="text-xs text-muted-foreground mt-2">
					Videos can take a few minutes to process. Refresh the page if video
					does not appear
				</div>
			)}
		</div>
	);
};

export default ChapterVideoForm;
