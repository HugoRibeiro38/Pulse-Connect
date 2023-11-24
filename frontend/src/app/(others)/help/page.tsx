import { Mail, MapPin } from 'lucide-react';
import { type Metadata, type NextPage } from 'next/types';

import { ContactForm } from '@/components/HelpPage';
import { CONTACT_EMAIL } from '@/data/constants';
import { questionsItems } from '@/data/questions';

export const metadata: Metadata = {
	title: 'Pulse Connect - Help',
};

const HelpPage: NextPage = (): React.ReactNode => {
	return (
		<div className='flex w-full flex-col items-center justify-between gap-y-32'>
			<div className='flex w-full flex-col items-center justify-between gap-y-16'>
				<div className='flex w-full flex-col items-start justify-between gap-y-8'>
					<h2 className='text-3xl font-bold tracking-tight'>
						Frequently asked questions
					</h2>
					<p className='max-w-3xl text-base font-normal leading-7'>
						Have a different question and can&apos;t find the answer
						you&apos;re looking for? Reach out to our{' '}
						<a href='#contact' className='text-primary'>
							support team
						</a>{' '}
						by sending us an email and we&apos;ll get back to you as
						soon as we can.
					</p>
				</div>
				<div className='grid w-full grid-cols-3 gap-4'>
					{questionsItems.map((item, index) => (
						<div
							key={`${item.question}-${index}`}
							className='flex flex-col justify-between gap-y-2'>
							<h4 className='text-xl font-semibold'>
								{item.question}
							</h4>
							<p className='text-base text-muted-foreground'>
								{item.answer}
							</p>
						</div>
					))}
				</div>
			</div>
			<div className='grid w-full grid-cols-2 gap-x-32'>
				<div className='flex flex-col items-start justify-start gap-y-8'>
					<h2 className='text-3xl font-bold tracking-tight'>
						Contact us
					</h2>
					<p className='max-w-3xl text-base font-normal leading-7'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Placeat laudantium perferendis magnam magni tempora
						dignissimos sapiente, earum exercitationem rerum libero
						cum quibusdam illo aperiam sed dolor, numquam
						voluptatibus impedit ipsa.
					</p>
					<div className='flex flex-col items-start justify-between gap-y-4'>
						<div className='flex flex-row items-center justify-between gap-x-2'>
							<MapPin className='h-4 w-4 text-primary' />
							<span className='text-sm text-muted-foreground'>
								R. do Curral, 4610-156 Felgueiras, Porto
							</span>
						</div>
						<div className='flex flex-row items-center justify-between gap-x-2'>
							<Mail className='h-4 w-4 text-primary' />
							<a
								href={`mailto:${CONTACT_EMAIL}?subject=Contact via help page.`}
								className='text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline'>
								{CONTACT_EMAIL}
							</a>
						</div>
					</div>
				</div>
				<div>
					<ContactForm />
				</div>
			</div>
		</div>
	);
};

export default HelpPage;
