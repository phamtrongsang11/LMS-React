import FileUpload from '@/components/FIleUpload';
import { Button } from '@/components/ui/button';
import useReactMutation from '@/hooks/useReactMutation';
import { Course } from '@/libs/types';
import { editCourse } from '@/services/course-services';
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import * as z from 'zod';

interface ImageFormProps {
	initialData: Course;
	courseId: string;
}

const formSchema = z.object({
	imageUrl: z.string().min(1, { message: 'Image is required' }),
});

type editImageCourse = {
	id: string;
	imageUrl: string;
};

const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
	const [isEditing, setIsEditing] = useState(false);

	const toggleEdit = () => setIsEditing((current) => !current);

	const { mutate, isPending } = useReactMutation<editImageCourse>(
		editCourse,
		'course',
		[courseId],
		() => {
			toast.success('Course updated');
			toggleEdit();
		}
	);

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		mutate({
			id: courseId,
			...values,
		});
	};

	if (isPending) return <h1>Loading...</h1>;

	return (
		<div className="mt-6 border bg-slate-100 rounded-md p-4">
			<div className="font-medium flex items-center justify-between">
				Course image
				<Button onClick={toggleEdit} variant="ghost">
					{isEditing && <>Cancel</>}
					{!isEditing && !initialData.imageUrl && (
						<>
							<PlusCircle className="h-4 w-4 mr-2" /> Add an image
						</>
					)}
					{!isEditing && initialData.imageUrl && (
						<>
							<Pencil className="h-4 w-4 mr-2" /> Edit image
						</>
					)}
				</Button>
			</div>
			{!isEditing &&
				(!initialData.imageUrl ? (
					<div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
						<ImageIcon className="h-10 w-10 text-slate-500" />
					</div>
				) : (
					<div className="relative aspect-video mt-2">
						<img
							alt="Upload"
							className="object-cover rounded-md"
							src={initialData.imageUrl}
						/>
					</div>
				))}
			{isEditing && (
				<div>
					<FileUpload
						type="image"
						onChange={(url: string) => {
							if (url) onSubmit({ imageUrl: url });
						}}
					/>
					<div className="text-xs text-muted-foreground mt-4">
						16:9 aspect ratio recommended
					</div>
				</div>
			)}
		</div>
	);
};

export default ImageForm;
