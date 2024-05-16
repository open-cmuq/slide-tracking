import { f as newExperimentSchema, g as experimentSchema, d as deleteEntrySchema } from "../../../../chunks/forms.js";
import { f as fail, r as redirect } from "../../../../chunks/index.js";
import { nanoid } from "nanoid";
import { p as prisma } from "../../../../chunks/index4.js";
const actions = {
  async new(event) {
    const user = event.locals.user;
    if (!user) {
      return fail(401, { formErrors: ["Please sign in"] });
    }
    const formData = Object.fromEntries(await event.request.formData());
    const experimentParse = newExperimentSchema.safeParse(formData);
    if (!experimentParse.success) {
      return fail(400, experimentParse.error.formErrors);
    }
    const experiment = await prisma.experiment.create({
      data: {
        ...experimentParse.data,
        id: nanoid(),
        createdByUserId: user.id
      }
    });
    throw redirect(303, `/experiment/${experiment.id}`);
  },
  async edit(event) {
    const user = event.locals.user;
    if (!user) {
      return fail(401, { formErrors: ["Please sign in"] });
    }
    const formData = Object.fromEntries(await event.request.formData());
    const experimentParse = experimentSchema.safeParse(formData);
    if (!experimentParse.success) {
      return fail(400, experimentParse.error.formErrors);
    }
    await prisma.experiment.update({
      where: {
        id: experimentParse.data.id
      },
      data: experimentParse.data
    });
  },
  async delete(event) {
    const user = event.locals.user;
    if (!user) {
      return fail(401, { formErrors: ["Please sign in"] });
    }
    const formData = Object.fromEntries(await event.request.formData());
    const deleteParse = deleteEntrySchema.safeParse(formData);
    if (!deleteParse.success) {
      return fail(400, deleteParse.error.formErrors);
    }
    const deletedExperiment = await prisma.experiment.delete({
      where: {
        id: deleteParse.data.id
      }
    });
    throw redirect(303, `/project/${deletedExperiment.projectId}`);
  }
};
function load() {
  throw redirect(302, "/projects");
}
export {
  actions,
  load
};
