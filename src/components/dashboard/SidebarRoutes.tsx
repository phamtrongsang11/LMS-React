import { BarChart, Compass, Layout, List } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import SidebarItem from './SidebarItem';

const guestRoutes = [
	{
		icon: Layout,
		label: 'Dashboard',
		href: '/',
	},
	{
		icon: Compass,
		label: 'Browse',
		href: '/search',
	},
];

const teacherRoutes = [
	{
		icon: List,
		label: 'Courses',
		href: '/teacher/courses',
	},
	{
		icon: BarChart,
		label: 'Analytics',
		href: '/teacher/analytics',
	},
];

const SidebarRoutes = () => {
	const pathname = useLocation().pathname;
	const isTeacherPage = pathname?.includes('/teacher');
	const routes = isTeacherPage ? teacherRoutes : guestRoutes;
	return (
		<div className="flex flex-col w-full">
			{routes.map((route) => (
				<SidebarItem
					key={route.href}
					icon={route.icon}
					label={route.label}
					href={route.href}
				/>
			))}
		</div>
	);
};

export default SidebarRoutes;
