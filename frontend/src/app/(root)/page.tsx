import { type Metadata, type NextPage } from 'next/types';

export const metadata: Metadata = {
	title: 'Pulse Connect - Home',
};

const HomePage: NextPage = (): React.ReactNode => {
	return <h1 className='text-xl font-semibold'>Home Page</h1>;
};

export default HomePage;
