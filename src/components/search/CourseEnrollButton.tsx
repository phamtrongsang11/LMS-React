import useReactMutation from '@/hooks/useReactMutation';
import { formatPrice } from '@/libs/format';
import { createPurchase } from '@/services/purchases-services';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import Loading from '../Loading';

interface CourseEnrollButtonProps {
	userId: string;
	courseId: string;
	price: number;
	courseTitle: string;
}

type CreatePurchase = {
	courseId?: string;
	userId: string;
};

const CourseEnrollButton = ({
	userId,
	courseId,
	price,
	courseTitle,
}: CourseEnrollButtonProps) => {
	const { chapterId } = useParams<{
		chapterId: string;
	}>();

	const { mutate, isPending } = useReactMutation<CreatePurchase>(
		createPurchase,
		'chapterInfo',
		[chapterId],
		() => {
			toast.success('Enrolled successfully');
		}
	);

	// const [{ isPending: pendingPay }, paypalDispatch] = usePayPalScriptReducer();

	function createOrder(data: any, actions: any) {
		return actions.order
			.create({
				intent: 'CAPTURE',

				purchase_units: [
					{
						description: courseTitle,
						amount: {
							currency_code: 'USD',
							value: price,
						},
					},
				],
			})
			.then((orderId: string) => {
				return orderId;
			});
	}

	function onApprove(data: any, actions: any) {
		return actions.order.capture().then(async function (details: any) {
			mutate({
				userId,
				courseId,
			});
		});
	}

	function onError(err: any) {
		console.log(err);
		toast.success('Pay fail');
	}

	return (
		<div className="flex flex-col justify-center items-center">
			<p className="text-md font-semibold text-blue-800">
				Enroll for {formatPrice(price)}
			</p>
			<PayPalButtons
				createOrder={createOrder}
				onApprove={onApprove}
				onError={onError}
				style={{
					layout: 'horizontal',
					label: 'pay',
					shape: 'pill',
					color: 'blue',
				}}
			></PayPalButtons>
			{isPending && <Loading />}
		</div>
	);
};

export default CourseEnrollButton;
