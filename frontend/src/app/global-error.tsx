'use client';

import { AlertCircle, ArrowLeft, Link } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/routes';

type GlobalErrorProps = {
	error: Error & { digest?: string };
	reset: () => void;
};

const GlobalError: React.FunctionComponent<GlobalErrorProps> = ({
	error,
	reset,
}): React.ReactNode => {
	return (
		<div className='mx-auto flex h-screen w-full max-w-7xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8'>
			<Alert variant='destructive'>
				<AlertCircle className='h-4 w-4' />
				<AlertTitle>Error!</AlertTitle>
				<AlertDescription>
					{error.message ?? 'An unexpected error has occurred.'}
				</AlertDescription>
				<div className='mt-4 flex w-full flex-row gap-x-2'>
					<Button
						variant='outline'
						size='icon'
						className='w-full'
						onClick={reset}
						asChild>
						<Link href={ROUTES.HOME}>
							<ArrowLeft className='mr-2 h-4 w-4' /> Go back
						</Link>
					</Button>
					<Button variant='destructive' className='w-full'>
						Try Again
					</Button>
				</div>
			</Alert>
		</div>
	);
};

export default GlobalError;
