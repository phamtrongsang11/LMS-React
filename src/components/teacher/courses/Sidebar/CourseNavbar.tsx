import NavbarRoutes from '@/components/NavbarRoutes';
import { Course } from '@/libs/types';
import React from 'react';
import { CourseMobileSidebar } from './CourseSidebarMobile';

interface CourseNavbarProps {
	course: Course;
	progressCount: number;
}

const CourseNavbar = ({ course, progressCount }: CourseNavbarProps) => {
	return (
		<div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
			<CourseMobileSidebar course={course} progressCount={progressCount} />
			<NavbarRoutes />
		</div>
	);
};

export default CourseNavbar;
