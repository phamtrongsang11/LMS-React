import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useChapterStore from '@/hooks/useChapterStore';
import useReactMutation from '@/hooks/useReactMutation';
import { editChapter } from '@/services/chapter-services';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

interface ChapterTitleFormProps {
	initialData: {
		title: string;
	};
	courseId: string;
	chapterId: string;
}

const formSchema = z.object({
	title: z.string().min(1),
});

type editTitleChapter = {
	id: string;
	title: string;
};

const ChapterTitleForm = ({
	initialData,
	courseId,
	chapterId,
}: ChapterTitleFormProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const refresh = useChapterStore((c) => c.refresh);
	const setRefresh = useChapterStore((c) => c.setRefresh);

	const toggleEdit = () => setIsEditing((current) => !current);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData,
	});

	const { isSubmitting, isValid } = form.formState;

	const { mutate, isPending } = useReactMutation<editTitleChapter>(
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

	if (isPending) return <h1>Loading...</h1>;

	return (
		<div className="mt-6 border bg-slate-100 rounded-md p-4">
			<div className="font-medium flex items-center justify-between">
				Chapter title
				<Button onClick={toggleEdit} variant="ghost">
					{isEditing ? (
						<>Cancel</>
					) : (
						<>
							<Pencil className="h-4 w-4 mr-2" /> Edit title
						</>
					)}
				</Button>
			</div>
			{!isEditing && <p className="text-sm mt-2">{initialData.title}</p>}
			{isEditing && (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 mt-4"
					>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											disabled={isSubmitting}
											placeholder="e.g. 'Introduction to the course'"
											{...field}
										/>
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

export default ChapterTitleForm;
