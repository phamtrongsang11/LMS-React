import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';
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

// const useReactMutation = <T extends { id: string }>(
// 	mutationFunc: (...args: any) => Promise<T>,
// 	CACHE_KEY: QueryKey,
// 	isArray = false
// 	// prop?: string
// ) => {
// 	const queryClient = useQueryClient();

// 	return useMutation<T, Error, T, Context<T>>({
// 		mutationFn: mutationFunc,
// 		//@ts-ignore
// 		onMutate: (newElement: T) => {
// 			let previous;
// 			if (isArray) {
// 				previous = queryClient.getQueryData<T[]>(CACHE_KEY) || [];

// 				queryClient.setQueryData<T[]>(CACHE_KEY, (elements = []) => [
// 					newElement,
// 					...elements,
// 				]);
// 			} else {
// 				previous = queryClient.getQueryData<T>(CACHE_KEY) || null;

// 				if (previous == null)
// 					queryClient.setQueryData<T>(CACHE_KEY, newElement);
// 				else
// 					queryClient.setQueryData<T>(CACHE_KEY, (element) => {
// 						return {
// 							...element,
// 							...newElement,
// 						};
// 					});
// 			}

// 			return { previous };
// 		},
// 		onSuccess: (savedElement, newElement) => {
// 			if (isArray) {
// 				queryClient.setQueryData<T[]>(CACHE_KEY, (elements) =>
// 					elements?.map((element) =>
// 						element.id === newElement.id ? savedElement : element
// 					)
// 				);
// 			} else {
// 				queryClient.setQueryData<T>(CACHE_KEY, (element) => {
// 					return {
// 						...element,
// 						...newElement,
// 					};
// 				});
// 			}
// 		},
// 		onError: (error, newTodo, context) => {
// 			if (!context) return;

// 			queryClient.setQueryData<T>(CACHE_KEY, context.previous);
// 		},
// 	});
// };

export default useReactMutation;
