import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useReactMutation from '@/hooks/useReactMutation';
import { Chapter, Course } from '@/libs/types';
import { cn } from '@/libs/utils';
import { createChapter, reorderChapter } from '@/services/chapter-services';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import ChaptersList from './ChaptersList';
import Loading from '@/components/Loading';

interface ChaptersFormProps {
	initialData: Course & { chapters: Chapter[] };
	courseId: string;
}

const formSchema = z.object({
	title: z.string().min(1),
});

type reorderChapterProps = { id: string; position: number }[];

type editTitleChapter = {
	title: string;
	courseId?: string;
};

const ChaptersForm = ({ initialData, courseId }: ChaptersFormProps) => {
	const [isCreating, setIsCreating] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);

	const toggleCreating = () => {
		setIsCreating((current) => !current);
	};

	const navigate = useNavigate();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
		},
	});

	const { isSubmitting, isValid } = form.formState;

	const { mutate, isPending } = useReactMutation<editTitleChapter>(
		createChapter,
		'course',
		[courseId],
		() => {
			toast.success('Chapter created');
			toggleCreating();
		}
	);

	const { mutate: mutateReorder, isPending: pendingReorder } =
		useReactMutation<reorderChapterProps>(
			reorderChapter,
			'course',
			[courseId],
			() => {
				toast.success('Chapters reordered');
			}
		);

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		mutate({
			courseId,
			...values,
		});
	};

	const onReorder = (updateData: { id: string; position: number }[]) => {
		mutateReorder(updateData);
	};

	const onEdit = (id: string) => {
		navigate(`/teacher/courses/${courseId}/chapters/${id}`);
	};

	if (isPending || pendingReorder) return <Loading />;

	return (
		<div className="relative mt-6 border bg-slate-100 rounded-md p-4">
			{isUpdating && (
				<div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
					<Loader2 className="animate-spin h-6 w-6 text-sky-700" />
				</div>
			)}
			<div className="font-medium flex items-center justify-between">
				Course chapters
				<Button onClick={toggleCreating} variant="ghost">
					{isCreating ? (
						<>Cancel</>
					) : (
						<>
							<PlusCircle className="h-4 w-4 mr-2" />
							Add a chapter
						</>
					)}
				</Button>
			</div>
			{isCreating && (
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
						<Button disabled={!isValid || isSubmitting} type="submit">
							Create
						</Button>
					</form>
				</Form>
			)}
			{!isCreating && (
				<div
					className={cn(
						'text-sm mt-2',
						!initialData.chapters.length && 'text-slate-500 italic'
					)}
				>
					{!initialData.chapters.length && 'No chapters'}
					<ChaptersList
						onEdit={onEdit}
						onReorder={onReorder}
						items={initialData.chapters || []}
					/>
				</div>
			)}
			{!isCreating && (
				<p className="text-xs text-muted-foreground mt-4">
					Drag and drop to reorder the chapters
				</p>
			)}
		</div>
	);
};

export default ChaptersForm;
