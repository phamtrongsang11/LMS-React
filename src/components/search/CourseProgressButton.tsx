import { Button } from '@/components/ui/button';
import { useConfettiStore } from '@/hooks/useConfettiStore';
import useCourseStore from '@/hooks/useCourseStore';
import useReactMutation from '@/hooks/useReactMutation';
import { editUserProgress } from '@/services/userprogress-services';
import { useQueryClient } from '@tanstack/react-query';
import { CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface CourseProgressButtonProps {
	chapterId: string;
	courseId: string;
	userProgressId: string;
	isCompleted?: boolean;
	nextChapterId?: string;
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
}: CourseProgressButtonProps) => {
	const confetti = useConfettiStore();
	const [isLoading, setIsLoading] = useState(false);
	const Icon = isCompleted ? XCircle : CheckCircle;
	const refresh = useCourseStore((c) => c.refresh);
	const setRefresh = useCourseStore((c) => c.setRefresh);
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate, isPending, error } = useReactMutation<UpdatedProgress>(
		editUserProgress,
		'chapterInfo',
		[chapterId],
		() => {
			queryClient.invalidateQueries({
				queryKey: ['coursesWithProgress', [courseId]],
			});

			toast.success('Progress updated');
			console.log(isCompleted, nextChapterId);

			if (!isCompleted && !nextChapterId) {
				confetti.onOpen();
			}
			if (!isCompleted && nextChapterId) {
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

	if (isPending) return <h1>Loading...</h1>;

	return (
		<Button
			onClick={onClick}
			disabled={isLoading}
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
