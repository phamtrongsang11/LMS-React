import { Menu } from 'lucide-react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Course } from '@/libs/types';
import CourseSidebar from './CourseSidebar';

interface CourseMobileSidebarProps {
	course: Course;
	progressCount: number;
}

export const CourseMobileSidebar = ({
	course,
	progressCount,
}: CourseMobileSidebarProps) => {
	return (
		<Sheet>
			<SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
				<Menu />
			</SheetTrigger>
			<SheetContent side="left" className="p-0 bg-white w-72">
				<CourseSidebar course={course} progressCount={progressCount} />
			</SheetContent>
		</Sheet>
	);
};
