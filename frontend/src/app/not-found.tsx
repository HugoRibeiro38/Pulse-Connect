import Image from 'next/image';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { ROUTES } from '@/routes';

const NotFound: React.FunctionComponent = (): React.ReactNode => {
	return (
		<main className='flex h-screen flex-col items-center justify-center space-y-8 align-middle'>
			<Image
				src='/logo/Logo Transparent.svg'
				alt='Logo'
				width={32}
				height={32}
				className='dark:nightMode h-48 w-full'
			/>
			<h1 className='text-center text-4xl font-extrabold tracking-tight lg:text-5xl'>
				<span className='text-primary'>Oops!</span> It seems like you
				are lost.
			</h1>
			<p className='leading-7 [&:not(:first-child)]:mt-6'>
				The page you are looking for is not available. Try searching
				again or return to the home page.
			</p>
			<Link
				href={ROUTES.HOME}
				className={buttonVariants({ variant: 'default' })}>
				Go back
			</Link>
		</main>
	);
};

export default NotFound;
