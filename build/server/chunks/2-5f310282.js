import { p as prisma } from './index4-11111b00.js';
import '@prisma/client';

async function load({ locals }) {
  const userId = locals.user.id;
  return {
    breadcrumbs: [],
    experimentCount: prisma.experiment.count({
      where: {
        createdByUserId: userId
      }
    }),
    projectCount: prisma.project.count({
      where: {
        createdByUserId: userId
      }
    }),
    projects: prisma.project.findMany({
      include: {
        experiments: {
          include: {
            slides: true
          },
          orderBy: {
            updatedAt: "desc"
          }
        }
      },
      where: {
        createdByUserId: userId
      },
      orderBy: {
        updatedAt: "desc"
      }
    }),
    session: await locals.getSession(),
    user: locals.user
  };
}

var _layout_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 2;
const component = async () => (await import('./_layout.svelte-dfdef6e3.js')).default;
const file = '_app/immutable/entry/(logged-in)-layout.svelte.0384a4af.js';
const server_id = "src/routes/(logged-in)/+layout.server.js";
const imports = ["_app/immutable/entry/(logged-in)-layout.svelte.0384a4af.js","_app/immutable/chunks/index.79e82b19.js","_app/immutable/chunks/coverslipTable.svelte_svelte_type_style_lang.6429d3c8.js","_app/immutable/chunks/parse.d12b0d5b.js","_app/immutable/chunks/singletons.d744cbe5.js","_app/immutable/chunks/popup.dbbce627.js","_app/immutable/chunks/slide.c2dc0211.js","_app/immutable/chunks/stores.2aba5b55.js","_app/immutable/chunks/stainining_fields.257325a1.js","_app/immutable/chunks/index.b48e78f2.js","_app/immutable/chunks/button-item.6bf52554.js","_app/immutable/chunks/navbar.c3c24b68.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/link-item.06f44794.js","_app/immutable/chunks/empty-list.ac357487.js"];
const stylesheets = ["_app/immutable/assets/_layout.398f4333.css","_app/immutable/assets/coverslipTable.aa708c95.css"];
const fonts = [];

export { component, file, fonts, imports, index, _layout_server as server, server_id, stylesheets };
//# sourceMappingURL=2-5f310282.js.map
