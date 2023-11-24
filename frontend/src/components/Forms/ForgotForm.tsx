'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { Button, buttonVariants } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { APP_ROUTES } from '@/routes/app';
import { forgotPasswordSchema, type IForgot } from '@/validators/Auth';

const ForgotForm: React.FunctionComponent = (): React.ReactNode => {
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const refCaptcha = useRef<ReCAPTCHA>(null);

	const form = useForm<IForgot>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: '',
		},
	});

	const onSubmit: SubmitHandler<IForgot> = ({ email }: IForgot) => {
		setIsSubmitting(true);
		console.log(email);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-4'
				id='forgot'
				name='forgot'>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type='email'
									placeholder='user@pulseconnect.com'
									autoComplete='email'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<ReCAPTCHA
					sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}
					ref={refCaptcha}
					size='invisible'
					hidden={true}
				/>
				<Button
					type='submit'
					className='w-full'
					disabled={form.formState.isSubmitting || isSubmitting}>
					{isSubmitting ? (
						<>
							<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							Submitting...
						</>
					) : (
						'Submit'
					)}
				</Button>
				<Separator />
				<Link
					href={APP_ROUTES.AUTH.SIGNIN}
					className={`w-full ${buttonVariants({
						variant: 'secondary',
					})}`}>
					Go Back
				</Link>
			</form>
		</Form>
	);
};

export default ForgotForm;
