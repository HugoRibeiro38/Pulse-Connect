import { z } from 'zod';

const noLessThanMessage = (type: string, number: number) =>
	`${type} must be at least ${number} characters long.`;
const noMoreThanMessage = (type: string, number: number) =>
	`${type} cannot be longer than ${number} characters.`;

const queryConstraints = () =>
	z
		.string()
		.min(3, { message: noLessThanMessage('Username', 3) })
		.max(16, { message: noMoreThanMessage('Username', 16) });

export const searchSchema = z.object({
	query: queryConstraints(),
});

export type ISearch = z.infer<typeof searchSchema>;
