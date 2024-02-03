import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useClerkUser from '@/hooks/useClerkUser';
import useReactMutation from '@/hooks/useReactMutation';
import { Course } from '@/libs/types';
import { createCourse } from '@/services/course-services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import * as z from 'zod';

const formSchema = z.object({
	title: z.string().min(1, { message: 'Title is required' }),
});

type AddCourse = {
	userId: string;
	title: string;
};

const CreatePage = () => {
	const navigate = useNavigate();

	const { user, isLoaded } = useClerkUser();

	const { mutate, isPending, error } = useReactMutation<AddCourse>(
		createCourse,
		'coursesByUser',
		undefined,
		(savedCourse: Course) => {
			toast.success('Course created');
			navigate(`/teacher/courses/${savedCourse.id}`);
		}
	);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
		},
	});

	const { isSubmitting, isValid } = form.formState;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		mutate({
			...values,
			userId: user?.id!,
		});
	};

	if (!isLoaded || isPending) return <h1>Loading...</h1>;

	return (
		<div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-[90vh] p-6">
			<div>
				<h1 className="text-2xl">Name your course</h1>
				<p className="text-sm text-slate-600">
					What would you like to name your course? Don&apos;t worry, you can
					change this later.
				</p>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8 mt-8"
					>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Course title</FormLabel>
									<FormControl>
										<Input
											disabled={isSubmitting}
											placeholder="e.g. 'Advanced web development'"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										What will you teach in this course?
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-center gap-x-2">
							<Link to="/">
								<Button type="button" variant="ghost">
									Cancel
								</Button>
							</Link>
							<Button type="submit" disabled={!isValid || isSubmitting}>
								Continue
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default CreatePage;
