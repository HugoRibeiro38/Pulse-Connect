type TimelineItemProps = {
	date: string;
	title: string;
	description: string;
};

const TimelineItem: React.FunctionComponent<TimelineItemProps> = ({
	date,
	title,
	description,
}): React.ReactNode => {
	return (
		<li className='flex flex-col gap-y-2'>
			<div className='flex-start flex items-center md:block md:pt-0'>
				<div className='-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-primary md:-mt-[5px] md:ml-0 md:mr-0'></div>
				<p className='text-sm text-primary md:mt-2'>{date}</p>
			</div>
			<div className='ml-4 pb-5 md:ml-0'>
				<div className='flex flex-col gap-y-2'>
					<h4 className='text-xl font-semibold'>{title}</h4>
					<p className='text-base text-muted-foreground'>
						{description}
					</p>
				</div>
			</div>
		</li>
	);
};

export default TimelineItem;
