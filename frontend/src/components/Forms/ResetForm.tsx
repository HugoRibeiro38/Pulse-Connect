'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { redirect, useSearchParams } from 'next/navigation';
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
import { type IReset, resetPasswordSchema } from '@/validators/Auth';

const ResetForm: React.FunctionComponent = (): React.ReactNode => {
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const refCaptcha = useRef<ReCAPTCHA>(null);
	const searchParams = useSearchParams();

	const email = searchParams.get('email');
	const token = searchParams.get('token');

	if (!email || !token) redirect(APP_ROUTES.AUTH.SIGNIN);

	const form = useForm<IReset>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit: SubmitHandler<IReset> = ({
		password,
		confirmPassword,
	}: IReset) => {
		setIsSubmitting(true);
		console.log(password, confirmPassword);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-4'
				id='reset'
				name='reset'>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									type='password'
									placeholder='********'
									autoComplete='new-password'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='confirmPassword'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input
									type='password'
									placeholder='********'
									autoComplete='new-password'
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

export default ResetForm;
