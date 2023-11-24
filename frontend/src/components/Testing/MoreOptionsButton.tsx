import { MoreVertical } from 'lucide-react';

import { Button } from '@/components/ui/button';

type MoreOptionsButtonProps = {
	//
};

const MoreOptionsButton: React.FunctionComponent<
	MoreOptionsButtonProps
> = ({}): React.ReactNode => {
	return (
		<Button variant='outline' size='icon'>
			<MoreVertical className='h-4 w-4' />
		</Button>
	);
};

export default MoreOptionsButton;
