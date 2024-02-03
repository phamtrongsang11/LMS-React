import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import useReactMutation from '@/hooks/useReactMutation';
import { Course } from '@/libs/types';
import { cn } from '@/libs/utils';
import { editCourse } from '@/services/course-services';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

interface CategoryFormProps {
	initialData: Course;
	courseId: string;
	options: { label: string; value: string }[];
}

const formSchema = z.object({
	categoryId: z.string().min(1),
});

type editCateCourse = {
	id: string;
	categoryId?: string;
};

const CategoryForm = ({
	initialData,
	courseId,
	options,
}: CategoryFormProps) => {
	const [isEditing, setIsEditing] = useState(false);

	const toggleEdit = () => setIsEditing((current) => !current);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			categoryId: initialData?.category?.id || '',
		},
	});

	const { isSubmitting, isValid } = form.formState;

	const { mutate, isPending } = useReactMutation<editCateCourse>(
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

	const selectedOption = options.find(
		(option) => option.value === initialData?.category?.id
	);

	return (
		<div className="mt-6 border bg-slate-100 rounded-md p-4">
			<div className="font-medium flex items-center justify-between">
				Course category
				<Button onClick={toggleEdit} variant="ghost">
					{isEditing ? (
						<>Cancel</>
					) : (
						<>
							<Pencil className="h-4 w-4 mr-2" /> Edit category
						</>
					)}
				</Button>
			</div>
			{!isEditing && (
				<p
					className={cn(
						'text-sm mt-2',
						!initialData?.category?.id && 'text-slate-500 italic'
					)}
				>
					{selectedOption?.label || 'No category'}
				</p>
			)}
			{isEditing && (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 mt-4"
					>
						<FormField
							control={form.control}
							name="categoryId"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Combobox options={options} {...field} />
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

export default CategoryForm;
