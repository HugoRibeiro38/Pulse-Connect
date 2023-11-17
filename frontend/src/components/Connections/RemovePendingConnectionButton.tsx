'use client';

import { Loader2, XCircle } from 'lucide-react';
import { Fragment } from 'react';

import { Button } from '@/components/ui/button';
import { useDeletePendingConnection } from '@/hooks/useConnections';

type RemovePendingConnectionButtonProps = {
	id: string;
};

const RemovePendingConnectionButton: React.FunctionComponent<
	RemovePendingConnectionButtonProps
> = ({ id }): React.ReactNode => {
	const { mutate, isPending } = useDeletePendingConnection();

	return (
		<Button disabled={isPending} onClick={() => mutate(id)}>
			{isPending ? (
				<Fragment>
					<Loader2 className='mr-2 h-4 w-4 animate-spin' />
					Canceling...
				</Fragment>
			) : (
				<Fragment>
					<XCircle className='mr-2 h-4 w-4' />
					Cancel
				</Fragment>
			)}
		</Button>
	);
};

export default RemovePendingConnectionButton;
