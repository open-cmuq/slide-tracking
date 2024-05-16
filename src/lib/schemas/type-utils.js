import { z } from 'zod';

export const bigIntToNumber = z.bigint()
	.transform((value) => Number(value));
export const bigIntToBoolean = z.bigint()
	.transform((value) => Boolean(value));
export const naturalNumber = z.number().gte(0);
export const nonEmptyString = z.string()
	.trim()
	.min(1);
