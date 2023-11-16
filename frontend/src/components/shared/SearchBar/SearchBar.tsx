'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { cva, type VariantProps } from 'class-variance-authority';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { APP_ROUTES } from '@/routes/app';
import { type ISearch, searchSchema } from '@/validators/Search';

const searchVariants = cva('w-full', {
	variants: {
		size: {
			default: 'max-w-sm',
			md: 'max-w-md',
			lg: 'max-w-lg',
		},
	},
	defaultVariants: {
		size: 'default',
	},
});

type SearchBarProps = {
	size?: VariantProps<typeof searchVariants>['size'];
	className?: string;
};

const SearchBar: React.FunctionComponent<SearchBarProps> = ({
	size,
	className,
}): React.ReactNode => {
	const router = useRouter();

	const form = useForm<ISearch>({
		resolver: zodResolver(searchSchema),
		defaultValues: {
			query: '',
		},
	});

	const onSubmit: SubmitHandler<ISearch> = ({ query }) => {
		router.push(`${APP_ROUTES.SEARCH}?query=@${query}`);
	};

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className={cn(searchVariants({ size, className }))}>
			<div className='flex w-full flex-row items-center justify-between gap-x-2'>
				<Input
					type='text'
					placeholder='Search...'
					className='w-full'
					{...form.register('query')}
				/>
				<Button
					type='submit'
					variant='default'
					size='icon'
					className='shrink-0'>
					<Search className='h-5 w-5 ' />
				</Button>
			</div>
		</form>
	);
};

export default SearchBar;
