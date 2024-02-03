import Chart from '@/components/analytics/Chart';
import DataCard from '@/components/analytics/DataCard';
import useClerkUser from '@/hooks/useClerkUser';
import useReactQuery from '@/hooks/useReactQuery';
import { getAnalytics } from '@/services/purchases-services';
import { useNavigate } from 'react-router-dom';

const AnalyticsPage = () => {
	const { user, isLoaded } = useClerkUser();

	const {
		data: analytics,
		isLoading,
		error,
	} = useReactQuery(
		'chapterInfo',
		() => getAnalytics(user?.id!),
		undefined,
		!!user
	);

	if (error) return <h1>{error?.message}</h1>;

	if (isLoading || !isLoaded) return <h1>Loading...</h1>;

	return (
		<div className="p-6">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<DataCard
					label="Total Revenue"
					value={analytics?.totalRevenue!}
					shouldFormat
				/>
				<DataCard label="Total Sales" value={analytics?.totalSales!} />
			</div>
			<Chart data={analytics?.data!} />
		</div>
	);
};

export default AnalyticsPage;
