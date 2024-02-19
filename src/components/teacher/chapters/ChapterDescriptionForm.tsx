import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { Editor } from '@/components/ui/editor';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Preview } from '@/components/ui/preview';
import useReactMutation from '@/hooks/useReactMutation';
import { Chapter } from '@/libs/types';
import { cn } from '@/libs/utils';
import { editChapter } from '@/services/chapter-services';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

interface ChapterDescriptionFormProps {
	initialData: Chapter;
	chapterId: string;
}

const formSchema = z.object({
	description: z.string().min(1),
});

type editDescriptionChapter = {
	id: string;
	description: string;
};

const ChapterDescriptionForm = ({
	initialData,
	chapterId,
}: ChapterDescriptionFormProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const toggleEdit = () => setIsEditing((current) => !current);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			description: initialData?.description || '',
		},
	});

	const { isSubmitting, isValid } = form.formState;

	const { mutate, isPending } = useReactMutation<editDescriptionChapter>(
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
				Chapter description
				<Button onClick={toggleEdit} variant="ghost">
					{isEditing ? (
						<>Cancel</>
					) : (
						<>
							<Pencil className="h-4 w-4 mr-2" /> Edit description
						</>
					)}
				</Button>
			</div>
			{!isEditing && (
				<div
					className={cn(
						'text-sm mt-2',
						!initialData.description && 'text-slate-500 italic'
					)}
				>
					{!initialData.description && 'No description'}
					{initialData.description && (
						<Preview value={initialData.description} />
					)}
				</div>
			)}
			{isEditing && (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 mt-4"
					>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Editor {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-center gap-x-2">
							<Button disabled={!isValid || isSubmitting} type="submit">
								Save
							</Button>
						</div>
					</form>
				</Form>
			)}
		</div>
	);
};

export default ChapterDescriptionForm;
