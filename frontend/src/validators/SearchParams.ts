import { z } from 'zod';

export const searchParamsSchema = z.object({
	sort: z.enum(['name', 'time']).optional().default('name'),
	order: z.enum(['asc', 'desc']).optional().default('asc'),
});

export type ISearchParams = z.infer<typeof searchParamsSchema>;
