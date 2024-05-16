import { g as newExperimentSchema, h as experimentSchema, d as deleteEntrySchema } from './forms-11130bd4.js';
import { f as fail, r as redirect } from './index-39e97e00.js';
import { nanoid } from 'nanoid';
import { p as prisma } from './index4-11111b00.js';
import 'zod';
import '@prisma/client';

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

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 9;
const component = async () => (await import('./_page.svelte-3841b128.js')).default;
const file = '_app/immutable/entry/(logged-in)-experiments-page.svelte.be1a3fdf.js';
const server_id = "src/routes/(logged-in)/experiments/+page.server.js";
const imports = ["_app/immutable/entry/(logged-in)-experiments-page.svelte.be1a3fdf.js","_app/immutable/chunks/index.79e82b19.js"];
const stylesheets = [];
const fonts = [];

export { component, file, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=9-f5bb7bf1.js.map
