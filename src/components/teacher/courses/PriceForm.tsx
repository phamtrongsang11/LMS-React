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
import { formatPrice } from '@/libs/format';
import { Course } from '@/libs/types';
import { cn } from '@/libs/utils';
import { editCourse } from '@/services/course-services';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

interface PriceFormProps {
	initialData: Course;
	courseId: string;
}

const formSchema = z.object({
	price: z.coerce.number(),
});

type editPriceCourse = {
	id: string;
	price: number;
};

const PriceForm = ({ initialData, courseId }: PriceFormProps) => {
	const [isEditing, setIsEditing] = useState(false);

	const toggleEdit = () => setIsEditing((current) => !current);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			price: initialData?.price || undefined,
		},
	});

	const { isSubmitting, isValid } = form.formState;

	const { mutate, isPending } = useReactMutation<editPriceCourse>(
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
				Course Price
				<Button onClick={toggleEdit} variant="ghost">
					{isEditing ? (
						<>Cancel</>
					) : (
						<>
							<Pencil className="h-4 w-4 mr-2" /> Edit Price
						</>
					)}
				</Button>
			</div>
			{!isEditing && (
				<p
					className={cn(
						'text-sm mt-2',
						!initialData.price && 'text-slate-500 italic'
					)}
				>
					{initialData.price ? formatPrice(initialData.price) : 'No price'}
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
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											type="number"
											step="0.01"
											disabled={isSubmitting}
											placeholder="e.g. 'Set a price for your course'"
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

export default PriceForm;
