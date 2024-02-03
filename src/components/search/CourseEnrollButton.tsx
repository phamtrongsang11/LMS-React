import { Button } from '@/components/ui/button';
import useCourseStore from '@/hooks/useCourseStore';
import useReactMutation from '@/hooks/useReactMutation';
import { formatPrice } from '@/libs/format';
import { createPurchase } from '@/services/purchases-services';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

interface CourseEnrollButtonProps {
	userId: string;
	courseId: string;
	price: number;
}

type CreatePurchase = {
	courseId?: string;
	userId: string;
};

const CourseEnrollButton = ({
	userId,
	courseId,
	price,
}: CourseEnrollButtonProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const refresh = useCourseStore((c) => c.refresh);
	const setRefresh = useCourseStore((c) => c.setRefresh);
	const { chapterId } = useParams<{
		chapterId: string;
	}>();

	const { mutate, isPending, error } = useReactMutation<CreatePurchase>(
		createPurchase,
		'chapterInfo',
		[chapterId],
		() => {
			toast.success('Enrolled successfully');
		}
	);

	const onClick = () => {
		mutate({
			userId,
			courseId,
		});
	};

	return (
		<Button
			onClick={onClick}
			disabled={isLoading}
			size="sm"
			className="w-full md:w-auto"
		>
			Enroll for {formatPrice(price)}
		</Button>
	);
};

export default CourseEnrollButton;
