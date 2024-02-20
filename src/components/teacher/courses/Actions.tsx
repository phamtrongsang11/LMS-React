import Loading from '@/components/Loading';
import ConfirmModal from '@/components/modals/ConfirmModal';
import { Button } from '@/components/ui/button';
import useClerkUser from '@/hooks/useClerkUser';
import { useConfettiStore } from '@/hooks/useConfettiStore';
import useReactMutation from '@/hooks/useReactMutation';
import { Course } from '@/libs/types';
import { deleteCourse, editCoursePublished } from '@/services/course-services';
import { Trash } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface ActionsProps {
	disabled: boolean;
	courseId: string;
	isPublished: boolean;
}

type editCoursePublish = {
	id: string;
	isPublished: boolean;
};

const Actions = ({ disabled, courseId, isPublished }: ActionsProps) => {
	const navigate = useNavigate();
	const confetti = useConfettiStore();
	const { user, isLoaded } = useClerkUser();

	const { mutate, isPending } = useReactMutation<editCoursePublish>(
		editCoursePublished,
		'course',
		[courseId],
		(savedCourse: Course) => {
			if (savedCourse.isPublished) {
				toast.success('Course Published');
				confetti.onOpen();
			} else toast.success('Course unpublished');
		}
	);

	const { mutate: mutateDelete, isPending: pendingDelete } = useReactMutation<{
		id: string;
	}>(deleteCourse, 'coursesByUser', [user?.id], () => {
		toast.success('Course deleted');
		navigate(`/teacher/courses/`);
	});

	const onDelete = () => {
		mutateDelete({
			id: courseId,
		});
	};

	const onClick = () => {
		mutate({
			id: courseId,
			isPublished,
		});
	};

	if (isPending || pendingDelete || !isLoaded) return <Loading />;
	return (
		<div className="flex items-center gap-x-2">
			<Button
				onClick={onClick}
				disabled={disabled || isPending}
				variant="outline"
				size="sm"
			>
				{isPublished ? 'Unpublish' : 'Publish'}
			</Button>
			<ConfirmModal onConfirm={onDelete}>
				<Button size="sm" disabled={pendingDelete}>
					<Trash className="h-4 w-4" />
				</Button>
			</ConfirmModal>
		</div>
	);
};

export default Actions;
