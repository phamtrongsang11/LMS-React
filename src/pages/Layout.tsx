import Navbar from '@/components/dashboard/Navbar';
import Sidebar from '@/components/dashboard/Sidebar';
import useClerkUser from '@/hooks/useClerkUser';
import useUserStore from '@/hooks/useUserStore';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {
	// const setUser = useUserStore((u) => u.setUser);
	// const setIsLoadingUser = useUserStore((u) => u.setIsLoadingUser);
	const navigate = useNavigate();
	const { isLoaded } = useClerkUser();

	// useEffect(() => {
	// 	setIsLoadingUser(!isLoaded);
	// }, [isLoaded]);
	// useEffect(() => {
	// 	if (isLoaded) {
	// 		if (!isSignedIn || !user) {
	// 			navigate('/auth/signin');
	// 		}
	// 		setUser(user?.id!);
	// 	}
	// }, [isLoaded]);

	if (!isLoaded) return 'Loadinglayout...';

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
