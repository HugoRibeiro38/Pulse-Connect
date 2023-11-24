import { type Metadata, type NextPage } from 'next/types';
import { Fragment } from 'react';

import { TeamMemberItem, TimelineItem } from '@/components/AboutPage';
import { memberItems } from '@/data/members';

export const metadata: Metadata = {
	title: 'Pulse Connect - About',
};

const AboutPage: NextPage = (): React.ReactNode => {
	return (
		<Fragment>
			<div className='flex w-full flex-col items-center justify-between gap-y-32'>
				<div className='flex w-full flex-col items-center justify-between gap-y-8 text-center'>
					<h1 className='text-4xl font-bold tracking-tight'>
						We&apos;re changing the way people connect.
					</h1>
					<p className='max-w-3xl text-base font-normal leading-7'>
						We are a team of 5 people, with a lot of experience in
						the IT area, we have already developed several projects,
						both for companies and for ourselves.
					</p>
				</div>
				<div className='flex w-full flex-col items-start justify-between gap-y-16'>
					<div className='flex flex-col items-start justify-between gap-y-4'>
						<h2 className='text-3xl font-semibold tracking-tight'>
							Our team
						</h2>
						<p className='max-w-3xl text-base font-normal leading-7'>
							We are a team of 5 people, with a lot of experience
							in the IT area, we have already developed several
							projects, both for companies and for ourselves.
						</p>
					</div>
					<div className='grid-col-1 grid w-full gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
						{memberItems.map((memberItem, index) => (
							<TeamMemberItem
								key={`${memberItem.email}-${index}`}
								email={memberItem.email}
								imageURL={memberItem.imageURL}
								firstName={memberItem.firstName}
								lastName={memberItem.lastName}
								role={memberItem.role}
								socials={memberItem.socials}
							/>
						))}
					</div>
				</div>
				<div className='flex w-full flex-col items-start justify-between gap-y-16'>
					<h2 className='text-3xl font-semibold tracking-tight'>
						Our timeline
					</h2>
					<ol className='border-l border-border md:flex md:justify-center md:gap-6 md:border-l-0 md:border-t'>
						<TimelineItem
							date='Oct 2023'
							title='Started the project'
							description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, et elementum lorem ornare. Maecenas placerat facilisis mollis. Duis sagittis ligula in sodales vehicula.'
						/>
						<TimelineItem
							date='Dez 2023'
							title='Released beta'
							description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, et elementum lorem ornare. Maecenas placerat facilisis mollis. Duis sagittis ligula in sodales vehicula.'
						/>
						<TimelineItem
							date='Jan 2024'
							title='Global launch of product'
							description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, et elementum lorem ornare. Maecenas placerat facilisis mollis. Duis sagittis ligula in sodales vehicula.'
						/>
					</ol>
				</div>
			</div>
		</Fragment>
	);
};

export default AboutPage;
