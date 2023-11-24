import { z } from 'zod';

const minLengthErrorMessage = (type: string, number: number) =>
	`${type} must be at least ${number} characters long.`;
const maxLengthErrorMessage = (type: string, number: number) =>
	`${type} cannot be longer than ${number} characters.`;

export const UserProfileInformationSchema = z.object({
	firstName: z
		.string()
		.min(3, { message: minLengthErrorMessage('First name', 3) })
		.max(32, { message: maxLengthErrorMessage('First name', 32) }),
	lastName: z
		.string()
		.min(3, { message: minLengthErrorMessage('Last name', 3) })
		.max(32, { message: maxLengthErrorMessage('Last name', 32) }),
	bio: z
		.string()
		.optional()
		.or(
			z.string().max(144, { message: maxLengthErrorMessage('Bio', 144) }),
		),
	country: z.string().optional(),
	city: z
		.string()
		.optional()
		.or(
			z
				.string()
				.min(3, { message: minLengthErrorMessage('City', 3) })
				.max(64, { message: maxLengthErrorMessage('City', 64) }),
		),
	url: z.string().optional().or(z.string().url()),
});

export type UserProfileInformation = z.infer<
	typeof UserProfileInformationSchema
>;
