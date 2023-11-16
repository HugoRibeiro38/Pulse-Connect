'use client';

import { Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type ThemeButtonProps = {
	sort: string;
	order: string;
	label: string;
	icon: string;
};

const FilterButton: React.FunctionComponent<ThemeButtonProps> = ({
	sort,
	order,
	label,
	icon,
}): React.ReactNode => {
	const searchParams = useSearchParams();
	const sortedBy = searchParams.get('sort') ?? 'name';
	const orderBy = searchParams.get('order') ?? 'asc';
	return (
		<Link
			href={`?${new URLSearchParams({ sort, order }).toString()}`}
			className='flex w-full flex-row items-center justify-between'>
			<div className='flex flex-row items-center'>
				<Image
					src={icon}
					alt='Icon'
					width={20}
					height={20}
					className='dark:nightMode mr-2 h-4 w-4'
				/>
				<span className='w-full'>{label}</span>
			</div>
			{sortedBy === sort && orderBy === order && (
				<Check className='h-4 w-4' />
			)}
		</Link>
	);
};

export default FilterButton;
