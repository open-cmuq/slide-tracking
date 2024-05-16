import { i as newProjectSchema, p as projectSchema, d as deleteEntrySchema } from './forms-11130bd4.js';
import { f as fail, r as redirect } from './index-39e97e00.js';
import { nanoid } from 'nanoid';
import { p as prisma } from './index4-11111b00.js';
import { q } from './index5-a20c4dba.js';
import 'zod';
import '@prisma/client';

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

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 11;
const component = async () => (await import('./_page.svelte-3f555374.js')).default;
const file = '_app/immutable/entry/(logged-in)-projects-page.svelte.a22937aa.js';
const server_id = "src/routes/(logged-in)/projects/+page.server.js";
const imports = ["_app/immutable/entry/(logged-in)-projects-page.svelte.a22937aa.js","_app/immutable/chunks/index.79e82b19.js","_app/immutable/chunks/breadcrumb-bar.af299c11.js","_app/immutable/chunks/coverslipTable.svelte_svelte_type_style_lang.6429d3c8.js","_app/immutable/chunks/parse.d12b0d5b.js","_app/immutable/chunks/singletons.d744cbe5.js","_app/immutable/chunks/button-item.6bf52554.js","_app/immutable/chunks/popup.dbbce627.js","_app/immutable/chunks/dropdown-item.72bb262e.js","_app/immutable/chunks/empty-list.ac357487.js","_app/immutable/chunks/item-list.b5e17376.js","_app/immutable/chunks/dropmenu.8d41ac65.js","_app/immutable/chunks/index.b48e78f2.js"];
const stylesheets = ["_app/immutable/assets/coverslipTable.aa708c95.css"];
const fonts = [];

export { component, file, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=11-6f64b151.js.map
