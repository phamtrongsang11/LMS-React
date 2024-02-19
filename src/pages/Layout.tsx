import Loading from '@/components/Loading';
import Navbar from '@/components/dashboard/Navbar';
import Sidebar from '@/components/dashboard/Sidebar';
import useClerkUser from '@/hooks/useClerkUser';
import { Outlet } from 'react-router-dom';

const Layout = () => {
	const { isLoaded } = useClerkUser();

	if (!isLoaded) return <Loading />;

	return (
		<div className="h-full">
			<div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
				<Navbar />
			</div>
			<div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
				<Sidebar />
			</div>
			<main className="md:pl-56 pt-[80px] h-full">
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;
