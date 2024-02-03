import { Banner } from '@/components/Banner';
import { IconBadge } from '@/components/IconBadge';
import Actions from '@/components/teacher/courses/Actions';
import AttachmentForm from '@/components/teacher/courses/AttachmentForm';
import CategoryForm from '@/components/teacher/courses/CategoryForm';
import ChaptersForm from '@/components/teacher/courses/ChaptersForm';
import DescriptionForm from '@/components/teacher/courses/DescriptionForm';
import ImageForm from '@/components/teacher/courses/ImageForm';
import PriceForm from '@/components/teacher/courses/PriceForm';
import TitleForm from '@/components/teacher/courses/TitleForm';
import useReactQuery from '@/hooks/useReactQuery';
import { Category, Course } from '@/libs/types';
import { getCategories } from '@/services/category-services';
import { getCourse } from '@/services/course-services';
import {
	CircleDollarSign,
	File,
	LayoutDashboard,
	ListChecks,
} from 'lucide-react';
import { useParams } from 'react-router-dom';

const CourseIdPage = () => {
	const { courseId } = useParams<{ courseId: string }>();

	const {
		data: categories,
		isLoading: isLoadingCate,
		error: errorCate,
	} = useReactQuery<Category[]>('categories', getCategories);

	const {
		data: course,
		isLoading,
		error,
	} = useReactQuery<Course>('course', () => getCourse(courseId!), [courseId]);

	if (error || errorCate)
		return <h1>{error?.message || errorCate?.message}</h1>;

	if (isLoading || isLoadingCate) return <h1>Loading...</h1>;

	const requiredFields = [
		course?.title,
		course?.description,
		course?.imageUrl,
		course?.price,
		course?.category?.id,
		course?.chapters.some((chapter) => chapter.isPublished),
	];

	const totalFields = requiredFields.length;
	const completedFields = requiredFields.filter(Boolean).length;
	const completionText = `(${completedFields}/${totalFields})`;

	const isCompleted = requiredFields.every(Boolean);

	return (
		<>
			{!course?.isPublished && (
				<Banner label="This course is unpublished. It will not visible to the students" />
			)}
			<div className="p-6">
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-y-2">
						<h1 className="text-2xl font-medium">Course setup</h1>
						<span className="text-sm text-slate-700">
							Complete all fields {completionText}
						</span>
					</div>
					<Actions
						disabled={!isCompleted}
						courseId={courseId!}
						isPublished={course?.isPublished!}
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
					<div>
						<div className="flex items-center gap-x-2">
							<IconBadge icon={LayoutDashboard} />
							<h2 className="text-xl">Customize your course</h2>
						</div>
						<TitleForm initialData={course!} courseId={course?.id!} />
						<DescriptionForm initialData={course!} courseId={course?.id!} />
						<ImageForm initialData={course!} courseId={course?.id!} />
						<CategoryForm
							initialData={course!}
							courseId={course?.id!}
							options={categories!.map((category) => ({
								label: category.name,
								value: category.id,
							}))}
						/>
					</div>
					<div className="space-y-6">
						<div>
							<div className="flex items-center gap-x-2">
								<IconBadge icon={ListChecks} />
								<h2 className="text-xl">Course Chapters</h2>
							</div>
							<ChaptersForm initialData={course!} courseId={course?.id!} />
						</div>
						<div>
							<div className="flex items-center gap-x-2">
								<IconBadge icon={CircleDollarSign} />
								<h2 className="text-xl">Sell your course</h2>
							</div>
							<PriceForm initialData={course!} courseId={course?.id!} />
						</div>
						<div>
							<div className="flex items-center gap-x-2">
								<IconBadge icon={File} />
								<h2 className="text-xl">Resources & Attachments</h2>
							</div>
							<AttachmentForm initialData={course!} courseId={course?.id!} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CourseIdPage;
