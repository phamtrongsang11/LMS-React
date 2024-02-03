import { Menu } from 'lucide-react';

import Sidebar from './Sidebar';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
const MobileSidebar = () => {
	return (
		<Sheet>
			<SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
				<Menu />
			</SheetTrigger>
			{/*@ts-ignore*/}
			<SheetContent side="left" className="p-0 bg-white">
				<Sidebar />
			</SheetContent>
		</Sheet>
	);
};

export default MobileSidebar;
