import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { APP_ROUTES } from '@/routes/app';

type MessageButtonProps = {
	userId: string;
};

const MessageButton: React.FunctionComponent<MessageButtonProps> = ({
	userId,
}): React.ReactNode => {
	return (
		<Link
			href={`${APP_ROUTES.MESSAGES}/${userId}`}
			className={`${buttonVariants({
				variant: 'outline',
				size: 'icon',
			})}`}>
			<MessageCircle className='h-4 w-4' />
		</Link>
	);
};

export default MessageButton;
