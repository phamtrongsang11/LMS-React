import React from 'react';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import SearchInput from './SearchInput';
import { UserButton } from '@clerk/clerk-react';

const NavbarRoutes = () => {
	const location = useLocation();
	const pathname = location.pathname;
	const isTeacherPage = pathname?.startsWith('/teacher');
	const isCoursePage = pathname?.includes('/courses');
	const isSearchPage = pathname === '/search';
	return (
		<>
			{isSearchPage && (
				<div className="hidden md:inline-block">
					<SearchInput />
				</div>
			)}
			<div className="flex gap-x-2 ml-auto">
				{isTeacherPage || isCoursePage ? (
					<Link to="/">
						<Button size="sm" variant="ghost">
							<LogOut className="h-4 w-4 mr-2" /> Exit
						</Button>
					</Link>
				) : (
					<Link to="/teacher/courses">
						<Button size="sm" variant="ghost">
							Teacher mode
						</Button>
					</Link>
				)}
				<UserButton afterSignOutUrl="/" />
			</div>
		</>
	);
};

export default NavbarRoutes;
