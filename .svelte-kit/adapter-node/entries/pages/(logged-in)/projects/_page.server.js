import { h as newProjectSchema, p as projectSchema, d as deleteEntrySchema } from "../../../../chunks/forms.js";
import { f as fail, r as redirect } from "../../../../chunks/index.js";
import { nanoid } from "nanoid";
import { p as prisma } from "../../../../chunks/index4.js";
import { q } from "../../../../chunks/index5.js";
const actions = {
  async new(event) {
    const user = event.locals.user;
    if (!user) {
      return fail(401, { formErrors: ["Please sign in"] });
    }
    const formData = Object.fromEntries(await event.request.formData());
    const projectParse = newProjectSchema.safeParse(formData);
    if (!projectParse.success) {
      return fail(400, projectParse.error.formErrors);
    }
    const project = await prisma.project.create({
      data: {
        ...projectParse.data,
        id: nanoid(),
        createdByUserId: user.id
      }
    });
    throw redirect(303, `/project/${project.id}`);
  },
  async edit(event) {
    const user = event.locals.user;
    if (!user) {
      return fail(401, { formErrors: ["Please sign in"] });
    }
    const formData = Object.fromEntries(await event.request.formData());
    const projectParse = projectSchema.safeParse(formData);
    if (!projectParse.success) {
      return fail(400, projectParse.error.formErrors);
    }
    await prisma.project.update({
      where: {
        id: projectParse.data.id
      },
      data: projectParse.data
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
    await prisma.project.delete({
      where: {
        id: deleteParse.data.id
      }
    });
    throw redirect(303, "/projects");
  }
};
async function load(event) {
  const { locals } = event;
  const projects = await prisma.project.findMany({
    where: {
      createdByUserId: locals.user.id
    },
    include: {
      createdBy: true
    }
  });
  return {
    projects,
    breadcrumbs: await q.breadcrumbs.findAll({})
  };
}
export {
  actions,
  load
};
