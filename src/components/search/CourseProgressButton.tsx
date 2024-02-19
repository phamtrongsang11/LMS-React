import { Button } from '@/components/ui/button';
import { useConfettiStore } from '@/hooks/useConfettiStore';
import useReactMutation from '@/hooks/useReactMutation';
import { editUserProgress } from '@/services/userprogress-services';
import { useQueryClient } from '@tanstack/react-query';
import { CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading';

interface CourseProgressButtonProps {
	chapterId: string;
	courseId: string;
	userProgressId: string;
	isCompleted?: boolean;
	nextChapterId?: string;
	nextIsPublished: boolean;
}

type UpdatedProgress = {
	id: string;
	isCompleted: boolean;
};

const CourseProgressButton = ({
	chapterId,
	courseId,
	userProgressId,
	isCompleted,
	nextChapterId,
	nextIsPublished,
}: CourseProgressButtonProps) => {
	const confetti = useConfettiStore();
	const Icon = isCompleted ? XCircle : CheckCircle;
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate, isPending } = useReactMutation<UpdatedProgress>(
		editUserProgress,
		'chapterInfo',
		[chapterId],
		() => {
			queryClient.invalidateQueries({
				queryKey: ['coursesWithProgress', [courseId]],
			});

			toast.success('Progress updated');

			if (!isCompleted && !nextChapterId) {
				confetti.onOpen();
			}
			if (!isCompleted && nextChapterId && nextIsPublished) {
				navigate(`/courses/${courseId}/chapters/${nextChapterId}`);
			}
		}
	);

	const onClick = () => {
		mutate({
			id: userProgressId,
			isCompleted: !isCompleted!,
		});
	};

	if (isPending) return <Loading />;

	return (
		<Button
			onClick={onClick}
			disabled={isPending}
			type="button"
			variant={isCompleted ? 'outline' : 'success'}
			className="w-full md:w-auto"
		>
			{isCompleted ? 'Not complete' : 'Mark as complete'}
			<Icon className="h-4 w-4 ml-2" />
		</Button>
	);
};

export default CourseProgressButton;
