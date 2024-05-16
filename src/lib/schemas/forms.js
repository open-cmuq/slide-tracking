import { naturalNumber, nonEmptyString } from './type-utils';
import { z } from 'zod';

export const newProjectSchema = z.object({
	title: nonEmptyString,
}).strict();

export const projectSchema = newProjectSchema.extend({
	id: nonEmptyString,
}).strict();

export const newExperimentSchema = z.object({
	projectId: nonEmptyString,
	title: nonEmptyString,
}).strict();

export const experimentSchema = newExperimentSchema.extend({
	id: nonEmptyString,
}).strict();

/** @param {unknown} string */
function toNumber(string) {
	if (typeof string === 'number') return string;
	if (typeof string !== 'string' || !string.length) return undefined;
	return Number(string);
}

export const newSlideSchema = z.object({
	boxNumber: z.preprocess(toNumber, naturalNumber.optional()),
	boxPosition: z.preprocess(toNumber, naturalNumber.optional()),
	comments: z.string(),
	experimentId: nonEmptyString,
	title: nonEmptyString,
	observedOn: z.coerce.date(),
	type: z.union([
		z.literal('slide'),
		z.literal('plate'),
	]),
}).strict();

export const slideSchema = newSlideSchema.extend({
	id: nonEmptyString,
}).strict();

export const deleteEntrySchema = z.object({
	id: nonEmptyString,
}).strict();

export const newUserSchema = z.object({
	email: nonEmptyString.email(),
	name: nonEmptyString,
}).strict();

export const userSchema = newUserSchema.extend({
	id: nonEmptyString,
}).strict();

export const newCoverslipSchema = z.object({
	coating: nonEmptyString,
	positionX: z.coerce.number()
		.min(0)
		.max(1),
	positionY: z.coerce.number()
		.min(0)
		.max(1),
	shape: z.union([
		z.literal('round'),
		z.literal('square'),
	]),
	slideId: nonEmptyString,
	specimen: nonEmptyString,
});

export const coverslipSchema = newCoverslipSchema.extend({
	id: nonEmptyString,
}).strict();

export const coverslipsSchema = newCoverslipSchema.extend({
	ids: nonEmptyString,
}).strict();

export const newStainingFieldsSchema = z.object({
	name: nonEmptyString,
	value: nonEmptyString,
}).strict();

export const newStainingSchema = z.object({
	coverslipId: nonEmptyString,
	fields: newStainingFieldsSchema.array(),
}).strict();

const createFieldSchema = z.object({
	op: z.literal('create'),
	name: nonEmptyString,
	value: nonEmptyString,
});

const editFieldSchema = z.object({
	op: z.literal('edit'),
	id: nonEmptyString,
	name: nonEmptyString,
	value: nonEmptyString,
});

const deleteFieldSchema = z.object({
	op: z.literal('delete'),
	id: nonEmptyString,
});

export const editStainingFieldsSchema = createFieldSchema.strict()
	.or(editFieldSchema.strict())
	// non-strict. allow name and value
	.or(deleteFieldSchema);

/**
 * @typedef {import('zod').z.infer<typeof editStainingFieldsSchema>} StainingFieldOp
 * @typedef {import('zod').z.infer<typeof createFieldSchema>} CreateStainingFieldOp
 * @typedef {import('zod').z.infer<typeof editFieldSchema>} EditStainingFieldOp
 * @typedef {import('zod').z.infer<typeof deleteFieldSchema>} DeleteStainingFieldOp
 */

export const editStainingSchema = z.object({
	id: nonEmptyString,
	coverslipId: nonEmptyString,
	fields: editStainingFieldsSchema.array(),
}).strict();

