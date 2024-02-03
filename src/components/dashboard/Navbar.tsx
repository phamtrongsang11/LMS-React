import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import useUserStore from '@/hooks/useUserStore';
import MobileSidebar from './MobileSidebar';
import NavbarRoutes from '../NavbarRoutes';

const Navbar = () => {
	return (
		<div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
			<MobileSidebar />
			<NavbarRoutes />
		</div>
	);
};

export default Navbar;
