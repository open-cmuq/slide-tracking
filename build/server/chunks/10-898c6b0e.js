import { e as error } from './index-39e97e00.js';
import { p as prisma } from './index4-11111b00.js';
import { q } from './index5-a20c4dba.js';
import '@prisma/client';

async function load(event) {
  const { locals, params } = event;
  const project = await prisma.project.findFirst({
    where: {
      id: params.projectId,
      createdByUserId: locals.user.id
    },
    include: {
      experiments: {
        include: {
          createdBy: true
        }
      }
    }
  });
  if (!project)
    throw error(404, "Not found");
  return {
    breadcrumbs: await q.breadcrumbs.findAll({
      projectId: params.projectId
    }),
    project
  };
}

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 10;
const component = async () => (await import('./_page.svelte-717028f3.js')).default;
const file = '_app/immutable/entry/(logged-in)-project-_projectId_-page.svelte.42c276e9.js';
const server_id = "src/routes/(logged-in)/project/[projectId]/+page.server.js";
const imports = ["_app/immutable/entry/(logged-in)-project-_projectId_-page.svelte.42c276e9.js","_app/immutable/chunks/index.79e82b19.js","_app/immutable/chunks/breadcrumb-bar.af299c11.js","_app/immutable/chunks/coverslipTable.svelte_svelte_type_style_lang.6429d3c8.js","_app/immutable/chunks/parse.d12b0d5b.js","_app/immutable/chunks/singletons.d744cbe5.js","_app/immutable/chunks/breadcrumb-link.baa4a678.js","_app/immutable/chunks/stores.2aba5b55.js","_app/immutable/chunks/button-item.6bf52554.js","_app/immutable/chunks/popup.dbbce627.js","_app/immutable/chunks/dropdown-item.72bb262e.js","_app/immutable/chunks/empty-list.ac357487.js","_app/immutable/chunks/item-list.b5e17376.js","_app/immutable/chunks/dropmenu.8d41ac65.js","_app/immutable/chunks/index.b48e78f2.js","_app/immutable/chunks/item-list-divider.506d6f65.js"];
const stylesheets = ["_app/immutable/assets/coverslipTable.aa708c95.css"];
const fonts = [];

export { component, file, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=10-898c6b0e.js.map
