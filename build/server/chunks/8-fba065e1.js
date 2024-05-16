import { e as error } from './index-39e97e00.js';
import { p as prisma } from './index4-11111b00.js';
import { q } from './index5-a20c4dba.js';
import '@prisma/client';

async function load({ locals, params }) {
  const experiment = await prisma.experiment.findFirst({
    where: {
      id: params.experimentId,
      createdByUserId: locals.user.id
    },
    include: {
      slides: {
        include: {
          createdBy: true
        }
      }
    }
  });
  if (!experiment)
    throw error(404, "Not Found");
  return {
    experiment,
    breadcrumbs: await experimentBreadcrumbs(params.experimentId)
  };
}
async function experimentBreadcrumbs(experimentId) {
  const [breadCrumbTrail] = await prisma.$queryRaw`
		SELECT p.id AS projectId, e.id AS experimentId
		FROM Experiment e
		JOIN Project p ON p.id = e.projectId
		WHERE e.id = ${experimentId};
	`;
  return q.breadcrumbs.findAll(breadCrumbTrail);
}

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 8;
const component = async () => (await import('./_page.svelte-11f74909.js')).default;
const file = '_app/immutable/entry/(logged-in)-experiment-_experimentId_-page.svelte.f2aaa081.js';
const server_id = "src/routes/(logged-in)/experiment/[experimentId]/+page.server.js";
const imports = ["_app/immutable/entry/(logged-in)-experiment-_experimentId_-page.svelte.f2aaa081.js","_app/immutable/chunks/index.79e82b19.js","_app/immutable/chunks/breadcrumb-bar.af299c11.js","_app/immutable/chunks/coverslipTable.svelte_svelte_type_style_lang.6429d3c8.js","_app/immutable/chunks/parse.d12b0d5b.js","_app/immutable/chunks/singletons.d744cbe5.js","_app/immutable/chunks/breadcrumb-link.baa4a678.js","_app/immutable/chunks/breadcrumb-list.469cd59f.js","_app/immutable/chunks/stores.2aba5b55.js","_app/immutable/chunks/link-item.06f44794.js","_app/immutable/chunks/dropmenu.8d41ac65.js","_app/immutable/chunks/popup.dbbce627.js","_app/immutable/chunks/button-item.6bf52554.js","_app/immutable/chunks/dropdown-item.72bb262e.js","_app/immutable/chunks/empty-list.ac357487.js","_app/immutable/chunks/item-list.b5e17376.js","_app/immutable/chunks/index.b48e78f2.js","_app/immutable/chunks/item-list-divider.506d6f65.js"];
const stylesheets = ["_app/immutable/assets/coverslipTable.aa708c95.css"];
const fonts = [];

export { component, file, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=8-fba065e1.js.map
