import { z } from 'zod';

const minLengthErrorMessage = (type: string, number: number) =>
	`${type} must be at least ${number} characters long.`;
const maxLengthErrorMessage = (type: string, number: number) =>
	`${type} cannot be longer than ${number} characters.`;

export const ContactInformationSchema = z.object({
	firstName: z
		.string()
		.min(3, { message: minLengthErrorMessage('First name', 3) })
		.max(32, { message: maxLengthErrorMessage('First name', 32) }),
	lastName: z
		.string()
		.min(3, { message: minLengthErrorMessage('Last name', 3) })
		.max(32, { message: maxLengthErrorMessage('Last name', 32) }),
	email: z
		.string()
		.email({ message: 'Provide a valid email address.' })
		.min(5, { message: minLengthErrorMessage('Email', 5) })
		.max(64, { message: maxLengthErrorMessage('Email', 64) }),
	message: z
		.string()
		.min(3, { message: minLengthErrorMessage('Message', 3) })
		.max(144, { message: maxLengthErrorMessage('Message', 144) }),
});

export type ContactInformation = z.infer<typeof ContactInformationSchema>;
