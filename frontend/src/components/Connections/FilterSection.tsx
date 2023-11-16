import { Filter } from 'lucide-react';

import { FilterButton } from '@/components/Connections';
import { SearchBar } from '@/components/shared/SearchBar';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { type FilterProps, filters } from '@/data/filters';

type FilterSectionProps = {
	//;
};

const FilterSection: React.FunctionComponent<
	FilterSectionProps
> = (): React.ReactNode => {
	return (
		<div className='flex w-full flex-row items-center justify-start gap-x-2 md:justify-end'>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='outline' size='icon'>
						<Filter className='h-5 w-5' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Filter by:</DropdownMenuLabel>
					<DropdownMenuSeparator />
					{filters.map((filter: FilterProps, index: number) => (
						<DropdownMenuItem
							key={`filter-${index}`}
							className='cursor-pointer'>
							<FilterButton
								sort={filter.sort}
								order={filter.order}
								label={filter.label}
								icon={filter.icon}
							/>
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
			<SearchBar size='default' />
		</div>
	);
};

export default FilterSection;
