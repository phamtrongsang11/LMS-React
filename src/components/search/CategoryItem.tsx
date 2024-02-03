import qs from 'query-string';
import { cn } from '@/libs/utils';
import { IconType } from 'react-icons';
import { useLocation, useNavigate } from 'react-router-dom';

interface CategoryItemProps {
	label: string;
	value?: string;
	icon?: IconType;
}

const CategoryItem = ({ label, value, icon: Icon }: CategoryItemProps) => {
	const navigate = useNavigate();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const pathname = location.pathname;

	const currentCategoryId = searchParams.get('categoryId');
	const currentTitle = searchParams.get('title');

	const isSelected = currentCategoryId === value;

	const onClick = () => {
		console.log(currentTitle, currentCategoryId);
		const url = qs.stringifyUrl(
			{
				url: pathname,
				query: {
					title: currentTitle,
					categoryId: isSelected ? null : value,
				},
			},
			{ skipNull: true, skipEmptyString: true }
		);
		console.log(url);
		navigate(url);
	};

	return (
		<button
			onClick={onClick}
			type="button"
			className={cn(
				'py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition',
				isSelected && 'border-sky-700 bg-sky-200/20 text-sky-800'
			)}
		>
			{Icon && <Icon size={20} />}
			<div className="truncat">{label}</div>
		</button>
	);
};

export default CategoryItem;
