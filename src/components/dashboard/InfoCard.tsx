interface InfoCardProps {
	numberOfItems: number;
	variant?: 'default' | 'success';
	label: string;
	icon: LucideIcon;
}

import { LucideIcon } from 'lucide-react';
import { IconBadge } from '../IconBadge';

const InfoCard = ({
	variant,
	icon: Icon,
	numberOfItems,
	label,
}: InfoCardProps) => {
	return (
		<div className="border rounded-md flex items-center gap-x-2 p-3">
			<IconBadge variant={variant} icon={Icon} />
			<div>
				<p className="font-medium">{label}</p>
				<p className="text-gray-500 text-sm">
					{numberOfItems} {numberOfItems === 1 ? 'Course' : 'Courses'}
				</p>
			</div>
		</div>
	);
};

export default InfoCard;
