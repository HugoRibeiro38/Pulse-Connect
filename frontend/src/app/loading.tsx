import { Loader2 } from 'lucide-react';

const Loading: React.FunctionComponent = (): React.ReactNode => {
	return (
		<main className='flex h-screen w-full flex-col items-center justify-center'>
			<Loader2 className='h-16 w-16 animate-spin text-primary' />
		</main>
	);
};

export default Loading;
