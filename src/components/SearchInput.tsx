import qs from 'query-string';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { useDebounce } from '@/hooks/useDebounce';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchInput = () => {
	const [value, setValue] = useState('');
	const debouncedValue = useDebounce(value);

	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const navigate = useNavigate();
	const pathname = location.pathname;

	const currentCategoryId = searchParams.get('categoryId');

	useEffect(() => {
		const url = qs.stringifyUrl(
			{
				url: pathname,
				query: {
					categoryId: currentCategoryId,
					title: debouncedValue,
				},
			},
			{ skipEmptyString: true, skipNull: true }
		);
		navigate(url);
	}, [debouncedValue, currentCategoryId, navigate, pathname]);

	return (
		<div className="relative">
			<Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
			<Input
				onChange={(e) => setValue(e.target.value)}
				className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
				placeholder="Search for a course"
			/>
		</div>
	);
};

export default SearchInput;
