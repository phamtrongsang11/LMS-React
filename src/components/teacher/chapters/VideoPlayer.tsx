import { Loader2, Lock } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { useConfettiStore } from '@/hooks/useConfettiStore';
import useReactMutation from '@/hooks/useReactMutation';
import { editUserProgress } from '@/services/userprogress-services';
import { useQueryClient } from '@tanstack/react-query';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import Loading from '@/components/Loading';

interface VideoPlayerProps {
	url: string;
	courseId: string;
	chapterId: string;
	userProgressId: string;
	nextChapterId?: string;
	isLocked: boolean;
	nextIsPublished: boolean;
	completeOnEnd: boolean;
}

type UpdatedProgress = {
	id: string;
	isCompleted: boolean;
};

export const VideoPlayer = ({
	url,
	courseId,
	chapterId,
	userProgressId,
	nextChapterId,
	nextIsPublished,
	isLocked,
	completeOnEnd,
}: VideoPlayerProps) => {
	const [isReady, setIsReady] = useState(false);
	const confetti = useConfettiStore();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate, isPending } = useReactMutation<UpdatedProgress>(
		editUserProgress,
		'chapterInfo',
		[chapterId],
		() => {
			if (!nextChapterId) {
				confetti.onOpen();
			}

			toast.success('Progress updated');
			queryClient.invalidateQueries({
				queryKey: ['coursesWithProgress', [courseId]],
			});

			if (nextChapterId && nextIsPublished) {
				navigate(`/courses/${courseId}/chapters/${nextChapterId}`);
			}
		}
	);

	const onEnd = () => {
		if (completeOnEnd)
			mutate({
				id: userProgressId,
				isCompleted: true,
			});
	};

	if (isPending) return <Loading />;

	return (
		<div className="relative aspect-video">
			{!isReady && !isLocked && (
				<div className="absolute inset-0 flex items-center justify-center bg-slate-800">
					<Loader2 className="h-8 w-8 animate-spin text-secondary" />
				</div>
			)}
			{isLocked && (
				<div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
					<Lock className="h-8 w-8" />
					<p className="text-sm">This chapter is locked</p>
				</div>
			)}
			{!isLocked && (
				<ReactPlayer
					url={url}
					playing
					width="100%"
					height="100%"
					controls
					onEnded={onEnd}
					onReady={() => setIsReady(true)}
					// className={cn(!isReady && 'hidden')}
				/>
			)}
		</div>
	);
};
