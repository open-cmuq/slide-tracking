import { e as error } from './index-39e97e00.js';
import { p as prisma } from './index4-11111b00.js';
import { q } from './index5-a20c4dba.js';
import '@prisma/client';

async function load(event) {
  const { locals, params } = event;
  const slide = await prisma.slide.findFirst({
    where: {
      id: params.slideId,
      createdByUserId: locals.user.id
    },
    include: {
      coverslips: true,
      createdBy: true,
      experiment: true
    }
  });
  if (!slide)
    throw error(404, "Not Found");
  return {
    slide,
    breadcrumbs: await slideBreadcrumbs(params.slideId)
  };
}
async function slideBreadcrumbs(slideId) {
  const [breadcrumbTrail] = await prisma.$queryRaw`
		SELECT
				p.id AS projectId,
				e.id AS experimentId,
				s.id AS slideId
			FROM Slide s
			JOIN Experiment e ON e.id = s.experimentId
			JOIN Project p ON p.id = e.projectId
			WHERE s.id = ${slideId};
	`;
  return q.breadcrumbs.findAll(breadcrumbTrail);
}

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 12;
const component = async () => (await import('./_page.svelte-2f06a121.js')).default;
const file = '_app/immutable/entry/(logged-in)-slide-_slideId_-page.svelte.49f09157.js';
const server_id = "src/routes/(logged-in)/slide/[slideId]/+page.server.js";
const imports = ["_app/immutable/entry/(logged-in)-slide-_slideId_-page.svelte.49f09157.js","_app/immutable/chunks/index.79e82b19.js","_app/immutable/chunks/breadcrumb-bar.af299c11.js","_app/immutable/chunks/coverslipTable.svelte_svelte_type_style_lang.6429d3c8.js","_app/immutable/chunks/parse.d12b0d5b.js","_app/immutable/chunks/singletons.d744cbe5.js","_app/immutable/chunks/breadcrumb-link.baa4a678.js","_app/immutable/chunks/breadcrumb-list.469cd59f.js","_app/immutable/chunks/stores.2aba5b55.js","_app/immutable/chunks/link-item.06f44794.js","_app/immutable/chunks/dropmenu.8d41ac65.js","_app/immutable/chunks/popup.dbbce627.js","_app/immutable/chunks/button-item.6bf52554.js","_app/immutable/chunks/dropdown-item.72bb262e.js","_app/immutable/chunks/slide.c2dc0211.js","_app/immutable/chunks/item-list-divider.506d6f65.js","_app/immutable/chunks/plate.ec2c03ed.js","_app/immutable/chunks/index.b48e78f2.js"];
const stylesheets = ["_app/immutable/assets/_page.e92a3572.css","_app/immutable/assets/coverslipTable.aa708c95.css"];
const fonts = [];

export { component, file, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=12-ef9c4930.js.map
