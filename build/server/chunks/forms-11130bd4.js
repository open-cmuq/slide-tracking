import { z } from 'zod';

z.bigint().transform((value) => Number(value));
z.bigint().transform((value) => Boolean(value));
const naturalNumber = z.number().gte(0);
const nonEmptyString = z.string().trim().min(1);
const newProjectSchema = z.object({
  title: nonEmptyString
}).strict();
const projectSchema = newProjectSchema.extend({
  id: nonEmptyString
}).strict();
const newExperimentSchema = z.object({
  projectId: nonEmptyString,
  title: nonEmptyString
}).strict();
const experimentSchema = newExperimentSchema.extend({
  id: nonEmptyString
}).strict();
function toNumber(string) {
  if (typeof string === "number")
    return string;
  if (typeof string !== "string" || !string.length)
    return void 0;
  return Number(string);
}
const newSlideSchema = z.object({
  boxNumber: z.preprocess(toNumber, naturalNumber.optional()),
  boxPosition: z.preprocess(toNumber, naturalNumber.optional()),
  comments: z.string(),
  experimentId: nonEmptyString,
  title: nonEmptyString,
  observedOn: z.coerce.date(),
  type: z.union([
    z.literal("slide"),
    z.literal("plate")
  ])
}).strict();
const slideSchema = newSlideSchema.extend({
  id: nonEmptyString
}).strict();
const deleteEntrySchema = z.object({
  id: nonEmptyString
}).strict();
const newUserSchema = z.object({
  email: nonEmptyString.email(),
  name: nonEmptyString
}).strict();
newUserSchema.extend({
  id: nonEmptyString
}).strict();
const newCoverslipSchema = z.object({
  coating: nonEmptyString,
  positionX: z.coerce.number().min(0).max(1),
  positionY: z.coerce.number().min(0).max(1),
  shape: z.union([
    z.literal("round"),
    z.literal("square")
  ]),
  slideId: nonEmptyString,
  specimen: nonEmptyString
});
const coverslipSchema = newCoverslipSchema.extend({
  id: nonEmptyString
}).strict();
const coverslipsSchema = newCoverslipSchema.extend({
  ids: nonEmptyString
}).strict();
const newStainingFieldsSchema = z.object({
  name: nonEmptyString,
  value: nonEmptyString
}).strict();
const newStainingSchema = z.object({
  coverslipId: nonEmptyString,
  fields: newStainingFieldsSchema.array()
}).strict();
const createFieldSchema = z.object({
  op: z.literal("create"),
  name: nonEmptyString,
  value: nonEmptyString
});
const editFieldSchema = z.object({
  op: z.literal("edit"),
  id: nonEmptyString,
  name: nonEmptyString,
  value: nonEmptyString
});
const deleteFieldSchema = z.object({
  op: z.literal("delete"),
  id: nonEmptyString
});
const editStainingFieldsSchema = createFieldSchema.strict().or(editFieldSchema.strict()).or(deleteFieldSchema);
const editStainingSchema = z.object({
  id: nonEmptyString,
  coverslipId: nonEmptyString,
  fields: editStainingFieldsSchema.array()
}).strict();

export { newCoverslipSchema as a, coverslipsSchema as b, coverslipSchema as c, deleteEntrySchema as d, newStainingSchema as e, editStainingSchema as f, newExperimentSchema as g, experimentSchema as h, newProjectSchema as i, newSlideSchema as j, newUserSchema as n, projectSchema as p, slideSchema as s };
//# sourceMappingURL=forms-11130bd4.js.map
