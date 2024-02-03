import {
	FcEngineering,
	FcFilmReel,
	FcMultipleDevices,
	FcMusic,
	FcOldTimeCamera,
	FcSalesPerformance,
	FcSportsMode,
} from 'react-icons/fc';

import { IconType } from 'react-icons';
import CategoryItem from './CategoryItem';
import { Category } from '@/libs/types';

interface CategoriesProps {
	items: Category[];
}

const iconMap: Record<Category['name'], IconType> = {
	Music: FcMusic,
	Photography: FcOldTimeCamera,
	Fitness: FcSportsMode,
	Accounting: FcSalesPerformance,
	'Computer Science': FcMultipleDevices,
	Filming: FcFilmReel,
	Engineering: FcEngineering,
};

const Categories = ({ items }: CategoriesProps) => {
	return (
		<div className="flex items-center gap-x-2 overflow-x-auto pb-2">
			{items.map((item) => (
				<CategoryItem
					key={item.id}
					label={item.name}
					icon={iconMap[item.name]}
					value={item.id}
				/>
			))}
		</div>
	);
};

export default Categories;
