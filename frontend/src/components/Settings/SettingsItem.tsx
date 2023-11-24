import { ChevronRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SettingsItemProps = {
	url: string;
	title: string;
	text: string;
	icon: LucideIcon;
};

const SettingsItem: React.FunctionComponent<SettingsItemProps> = ({
	url,
	title,
	text,
	icon: Icon,
}): React.ReactNode => {
	return (
		<Link
			href={url}
			className='flex w-full flex-row items-center justify-between rounded-md p-2 hover:bg-accent'>
			<div className='flex flex-row items-center justify-between gap-x-2'>
				<div className='rounded-md border border-border bg-background p-2'>
					<Icon className='h-5 w-5' />
				</div>
				<div className='flex flex-col items-start justify-between text-base font-normal'>
					{title}
					<small className='text-xs text-muted-foreground'>
						{text}
					</small>
				</div>
			</div>
			<ChevronRight className='h-5 w-5' />
		</Link>
	);
};

export default SettingsItem;
