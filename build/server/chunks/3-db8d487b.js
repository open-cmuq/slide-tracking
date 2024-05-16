import { e as error } from './index-39e97e00.js';
import { p as prisma } from './index4-11111b00.js';
import { q } from './index5-a20c4dba.js';
import '@prisma/client';

async function load(event) {
  const { locals, params } = event;
  const coverslip = await prisma.coverslip.findFirst({
    where: {
      id: params.coverslipId,
      createdByUserId: locals.user.id
    },
    include: {
      slide: true
    }
  });
  if (!coverslip)
    throw error(404, "Not Found");
  const coverslips = await prisma.coverslip.findMany({
    where: {
      slideId: coverslip.slideId
    }
  });
  const [breadcrumbs, session] = await Promise.all([
    coverslipBreadcrumbs(params.coverslipId),
    locals.getSession()
  ]);
  return {
    coverslips,
    current: coverslip,
    session,
    breadcrumbs
  };
}
async function coverslipBreadcrumbs(coverslipId) {
  const [breadcrumbTrail] = await prisma.$queryRaw`
		SELECT
			p.id AS projectId,
			e.id AS experimentId,
			s.id AS slideId,
			c.id AS coverslipId
		FROM Coverslip c
		JOIN Slide s ON s.id = c.slideId
		JOIN Experiment e ON e.id = s.experimentId
		JOIN Project p ON p.id = e.projectId
		WHERE c.id = ${coverslipId};
	`;
  return q.breadcrumbs.findAll(breadcrumbTrail);
}

var _layout_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 3;
const component = async () => (await import('./_layout.svelte-af85c3cf.js')).default;
const file = '_app/immutable/entry/(logged-in)-coverslip-_coverslipId_-layout.svelte.c4a32e80.js';
const server_id = "src/routes/(logged-in)/coverslip/[coverslipId]/+layout.server.js";
const imports = ["_app/immutable/entry/(logged-in)-coverslip-_coverslipId_-layout.svelte.c4a32e80.js","_app/immutable/chunks/index.79e82b19.js","_app/immutable/chunks/breadcrumb-bar.af299c11.js","_app/immutable/chunks/coverslipTable.svelte_svelte_type_style_lang.6429d3c8.js","_app/immutable/chunks/parse.d12b0d5b.js","_app/immutable/chunks/singletons.d744cbe5.js","_app/immutable/chunks/breadcrumb-link.baa4a678.js","_app/immutable/chunks/breadcrumb-list.469cd59f.js","_app/immutable/chunks/stores.2aba5b55.js","_app/immutable/chunks/link-item.06f44794.js","_app/immutable/chunks/dropmenu.8d41ac65.js","_app/immutable/chunks/popup.dbbce627.js","_app/immutable/chunks/button-item.6bf52554.js","_app/immutable/chunks/dropdown-item.72bb262e.js","_app/immutable/chunks/slide.c2dc0211.js","_app/immutable/chunks/item-list-divider.506d6f65.js","_app/immutable/chunks/plate.ec2c03ed.js"];
const stylesheets = ["_app/immutable/assets/_layout.5cf4c65f.css","_app/immutable/assets/coverslipTable.aa708c95.css"];
const fonts = [];

export { component, file, fonts, imports, index, _layout_server as server, server_id, stylesheets };
//# sourceMappingURL=3-db8d487b.js.map
