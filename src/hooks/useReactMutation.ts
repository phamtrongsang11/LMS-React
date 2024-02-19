import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface Context<T> {
	previous: T;
}

const useReactMutation = <T>(
	mutationFunc: (...args: any) => Promise<T>,
	key: string,
	dependent?: [...elment: any],
	onSuccessFunc?: (...args: any) => void,
	onErrorFunc?: (...args: any) => void
) => {
	const queryClient = useQueryClient();

	return useMutation<T, Error, T, Context<T>>({
		mutationFn: mutationFunc,
		onSuccess: (savedElement) => {
			queryClient.invalidateQueries({
				queryKey: [key, dependent && [...dependent]],
			});
			onSuccessFunc && onSuccessFunc(savedElement);
		},
		onError: (error) => {
			console.log(error);
			toast.error('Something went wrong');
			onErrorFunc && onErrorFunc();
		},
	});
};

export default useReactMutation;
