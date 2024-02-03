import { useQuery } from '@tanstack/react-query';
import ms from 'ms';

const useReactQuery = <T>(
	key: string,
	requestFunction: (...args: any) => Promise<T>,
	dependent?: [...elment: any],
	isEnable?: boolean
) =>
	useQuery({
		queryKey: [key, dependent && [...dependent]],
		queryFn: () => requestFunction(),
		staleTime: ms('24h'),
		enabled: isEnable,
	});

export default useReactQuery;
