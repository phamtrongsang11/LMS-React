import ConfirmModal from '@/components/modals/ConfirmModal';
import { Button } from '@/components/ui/button';
import useReactMutation from '@/hooks/useReactMutation';
import { Chapter } from '@/libs/types';
import {
	deleteChapter,
	editChapterPublished,
} from '@/services/chapter-services';
import { Trash } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface ChapterActionsProps {
	disabled: boolean;
	courseId: string;
	chapterId: string;
	isPublished: boolean;
}

type editChapterPublish = {
	id: string;
	isPublished: boolean;
};

const ChapterActions = ({
	disabled,
	courseId,
	chapterId,
	isPublished,
}: ChapterActionsProps) => {
	const navigate = useNavigate();

	const { mutate, isPending } = useReactMutation<editChapterPublish>(
		editChapterPublished,
		'chapter',
		[chapterId],
		(savedChapter: Chapter) => {
			if (savedChapter.isPublished) {
				toast.success('Chapter Published');
			} else toast.success('Chapter unpublished');
		}
	);

	const { mutate: mutateDelete, isPending: pendingDelete } = useReactMutation<{
		id: string;
	}>(deleteChapter, 'coursesByUser', undefined, () => {
		toast.success('Chapter deleted');
		navigate(`/teacher/courses/`);
	});

	const onDelete = () => {
		mutateDelete({
			id: chapterId,
		});
	};

	const onClick = () => {
		mutate({
			id: chapterId,
			isPublished,
		});
	};

	if (isPending || pendingDelete) return <h1>Loading...</h1>;

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

export default ChapterActions;
