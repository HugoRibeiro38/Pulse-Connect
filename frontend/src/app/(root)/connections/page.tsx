import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { type Metadata, type NextPage } from 'next/types';
import { Fragment } from 'react';

import { ConnectionCard } from '@/components/Connections';
import FilterSection from '@/components/Connections/FilterSection';
import { Title } from '@/components/Title';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { APP_ROUTES } from '@/routes/app';

export const metadata: Metadata = {
	title: 'Pulse Connect - Connections',
};

type SearchParamsProps = {
	sort?: 'name' | 'time';
	order?: 'asc' | 'desc';
};

type ConnectionsPageProps = {
	searchParams?: SearchParamsProps;
};

const ConnectionsPage: NextPage<ConnectionsPageProps> = ({
	searchParams,
}): React.ReactNode => {
	const sortBy = searchParams?.sort ?? 'name';
	const orderBy = searchParams?.order ?? 'asc';

	console.log('SORT BY: ', sortBy);
	console.log('ORDER BY: ', orderBy);

	return (
		<Fragment>
			<div className='flex w-full flex-col items-start justify-between md:flex-row md:items-center'>
				<div className='flex flex-row items-center justify-between gap-x-4'>
					<Button variant='ghost' size='icon' asChild>
						<Link href={APP_ROUTES.HOME}>
							<ArrowLeft />
						</Link>
					</Button>
					<Title title='Connections' />
				</div>
				<FilterSection />
			</div>
			<Tabs defaultValue='connections' className='flex w-full flex-col'>
				<TabsList>
					<TabsTrigger value='connections' className='w-full'>
						Connections
					</TabsTrigger>
					<TabsTrigger value='pending' className='w-full'>
						Pending
					</TabsTrigger>
				</TabsList>
				<TabsContent value='connections' className='mt-8'>
					<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
						{Array.from({ length: 24 }).map((_, index) => (
							<ConnectionCard
								key={`connection-${index}`}
								type='connection'
								id={index.toString()}
								image={'https://github.com/wallq.png'}
								firstName={'Sérgio'}
								lastName={'Félix'}
								username={'@wallq'}
							/>
						))}
					</div>
				</TabsContent>
				<TabsContent value='pending' className='mt-8'>
					<div className='grid grid-cols-4 gap-4'>
						{Array.from({ length: 6 }).map((_, index) => (
							<ConnectionCard
								key={`pending-${index}`}
								type='pending'
								id={index.toString()}
								image={'https://github.com/wallq.png'}
								firstName={'Sérgio'}
								lastName={'Félix'}
								username={'@wallq'}
							/>
						))}
					</div>
				</TabsContent>
			</Tabs>
		</Fragment>
	);
};

export default ConnectionsPage;
