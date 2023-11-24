import { z } from 'zod';

const minLengthErrorMessage = (type: string, number: number) =>
	`${type} must be at least ${number} characters long.`;
const maxLengthErrorMessage = (type: string, number: number) =>
	`${type} cannot be longer than ${number} characters.`;

const emailConstraints = () =>
	z
		.string()
		.email({ message: 'Provide a valid email address.' })
		.min(5, { message: minLengthErrorMessage('Email', 5) })
		.max(64, { message: maxLengthErrorMessage('Email', 64) });

const passwordConstraints = () =>
	z
		.string()
		.min(8, { message: minLengthErrorMessage('Password', 8) })
		.max(16, { message: maxLengthErrorMessage('Password', 16) })
		.regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/, {
			message:
				'Password must contain at least one uppercase letter, one number, and one special character(!@#$%^&*).',
		});

export const SignInSchema = z.object({
	email: emailConstraints(),
	password: passwordConstraints(),
	remember: z.boolean().optional(),
});

export const SignUpSchema = z
	.object({
		firstName: z
			.string()
			.min(3, { message: minLengthErrorMessage('First name', 3) })
			.max(32, { message: maxLengthErrorMessage('First name', 32) }),
		lastName: z
			.string()
			.min(3, { message: minLengthErrorMessage('Last name', 3) })
			.max(32, { message: maxLengthErrorMessage('Last name', 32) }),
		username: z
			.string()
			.min(3, { message: minLengthErrorMessage('Username', 3) })
			.max(16, { message: maxLengthErrorMessage('Username', 32) }),
		email: emailConstraints(),
		password: passwordConstraints(),
		confirmPassword: passwordConstraints(),
		remember: z.boolean().optional(),
	})
	.refine(
		(data) => {
			return data.password === data.confirmPassword;
		},
		{
			message: 'Passwords must match each other.',
			path: ['confirmPassword'],
		},
	);

export const ForgotPasswordSchema = z.object({
	email: emailConstraints(),
});

export const ResetPasswordSchema = z
	.object({
		password: passwordConstraints(),
		confirmPassword: passwordConstraints(),
	})
	.refine(
		(data) => {
			return data.password === data.confirmPassword;
		},
		{
			message: 'Passwords must match each other.',
			path: ['confirmPassword'],
		},
	);

export type SignIn = z.infer<typeof SignInSchema>;
export type SignUp = z.infer<typeof SignUpSchema>;
export type ForgotPassword = z.infer<typeof ForgotPasswordSchema>;
export type ResetPassword = z.infer<typeof ResetPasswordSchema>;
