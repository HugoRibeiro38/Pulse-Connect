import { Fragment } from 'react';

import { Chatbar } from '@/components/Chatbar';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar/';
import { Sidebar } from '@/components/Sidebar/';

type FeedLayoutProps = {
	children: React.ReactNode;
};

const FeedLayout: React.FunctionComponent<FeedLayoutProps> = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<Fragment>
			<Navbar />
			<div className='relative flex w-full h-full flex-row justify-between overflow-hidden'>
				<Sidebar />
				<main className='flex max-w-5xl flex-1 flex-col items-start justify-start gap-y-8 overflow-y-auto overflow-x-hidden border-x border-input p-16'>
					{children}
				</main>
				<Chatbar />
			</div>
			<Footer />
		</Fragment>
	);
};

export default FeedLayout;
