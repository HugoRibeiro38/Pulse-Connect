import { type Metadata, type NextPage } from 'next/types';
import { Fragment } from 'react';

import { MessageItem } from '@/components/Message';

export const metadata: Metadata = {
	title: 'Pulse Connect - Messages',
};

const MessagesPage: NextPage = (): React.ReactNode => {
	return (
		<Fragment>
			<div className='flex min-h-[40px] w-full flex-row items-center justify-between'>
				<h1 className='text-xl font-semibold'>Messages Page</h1>
			</div>
			<div className='flex w-full flex-col items-start justify-between space-y-8'>
				{Array.from({ length: 12 }).map((_, index) => (
					<MessageItem
						key={`chat-${index}`}
						id={`${index}`}
						image={''}
						firstName={'John'}
						lastName={'Doe'}
						time={'2023-01-01 12:00:00'}
						message={
							'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptate atque fugiat saepe excepturi nisi? Deserunt tempora, distinctio?'
						}
					/>
				))}
			</div>
		</Fragment>
	);
};

export default MessagesPage;
