import { type Metadata, type NextPage } from 'next/types';
import { Fragment } from 'react';

import { Title } from '@/components/Title';

export const metadata: Metadata = {
	title: 'Pulse Connect - Home',
};

const HomePage: NextPage = (): React.ReactNode => {
	return (
		<Fragment>
			<Title title='Home Page' />
		</Fragment>
	);
};

export default HomePage;
