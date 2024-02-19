import FileUpload from '@/components/FIleUpload';
import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import useReactMutation from '@/hooks/useReactMutation';
import { Attachment, Course } from '@/libs/types';
import {
	createAttachment,
	deleteAttachment,
} from '@/services/attachment-services';
import { File, Loader2, PlusCircle, X } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import * as z from 'zod';

interface AttachmentFormProps {
	initialData: Course & { attachments: Attachment[] };
	courseId: string;
}

const formSchema = z.object({
	url: z.string().min(1),
});

type editAttachmentCourse = {
	url: string;
	courseId?: string;
};

const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [deletingId, setDeletingId] = useState<string | null>(null);

	const toggleEdit = () => setIsEditing((current) => !current);

	const { mutate, isPending } = useReactMutation<editAttachmentCourse>(
		createAttachment,
		'course',
		[courseId],
		() => {
			toast.success('Course updated');
			toggleEdit();
		}
	);

	const { mutate: mutateDelete } = useReactMutation<{
		id: string;
	}>(deleteAttachment, 'course', [courseId], () => {
		setDeletingId('');
		toast.success('Attachment deleted');
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		mutate({
			...values,
			courseId,
		});
	};

	const onDelete = (id: string) => {
		setDeletingId(id);
		mutateDelete({
			id,
		});
	};

	if (isPending) return <Loading />;

	return (
		<div className="mt-6 border bg-slate-100 rounded-md p-4">
			<div className="font-medium flex items-center justify-between">
				Course attachments
				<Button onClick={toggleEdit} variant="ghost">
					{isEditing && <>Cancel</>}
					{!isEditing && (
						<>
							<PlusCircle className="h-4 w-4 mr-2" /> Add a file
						</>
					)}
				</Button>
			</div>
			{!isEditing && (
				<>
					{initialData.attachments.length === 0 && (
						<p className="text-sm mt-2 text-slate-500 italic">
							No attachments yet
						</p>
					)}
					{initialData.attachments.length > 0 && (
						<div className="space-y-2">
							{initialData.attachments.map((attachment) => (
								<div
									key={attachment.id}
									className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
								>
									<File className="h4 w-4 mr-2 flex-shrink-0" />
									<a
										href={attachment.url}
										target="_blank"
										className="text-xs line-clamp-1"
									>
										{attachment.name}
									</a>
									{deletingId === attachment.id && (
										<div>
											<Loader2 className="h-4 w-4 animate-spin" />
										</div>
									)}
									{deletingId !== attachment.id && (
										<button
											onClick={() => onDelete(attachment.id)}
											className="ml-auto hover:opacity-75 transition"
										>
											<X className="h-4 w-4" />
										</button>
									)}
								</div>
							))}
						</div>
					)}
				</>
			)}
			{isEditing && (
				<div>
					<FileUpload
						type="file"
						onChange={(url: string) => {
							if (url) onSubmit({ url: url });
						}}
					/>
					<div className="text-xs text-muted-foreground mt-4">
						Add anything your students might need to complete the course.
					</div>
				</div>
			)}
		</div>
	);
};

export default AttachmentForm;
