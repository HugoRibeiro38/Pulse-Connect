'use client';

import { Link, Loader2 } from 'lucide-react';
import { Fragment } from 'react';

import { Button } from '@/components/ui/button';
import { useCreateConnection } from '@/hooks/useConnections';

type AddConnectionButtonProps = {
	userId: string;
};

const AddConnectionButton: React.FunctionComponent<
	AddConnectionButtonProps
> = ({ userId }): React.ReactNode => {
	const { mutate, isPending } = useCreateConnection(userId);
	return (
		<Button disabled={isPending} onClick={() => mutate(userId)}>
			{isPending ? (
				<Fragment>
					<Loader2 className='mr-2 h-4 w-4 animate-spin' />
					Connecting...
				</Fragment>
			) : (
				<Fragment>
					<Link className='mr-2 h-4 w-4' />
					Connect
				</Fragment>
			)}
		</Button>
	);
};

export default AddConnectionButton;
