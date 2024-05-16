import { r as redirect } from './index-39e97e00.js';

function load({ locals }) {
  if (locals.user) {
    throw redirect(302, "/projects");
  }
  const breadcrumbs = [{
    type: "root",
    name: "own",
    title: "My projects"
  }];
  return {
    breadcrumbs,
    session: locals.session || null,
    user: void 0
  };
}

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 4;
const component = async () => (await import('./_page.svelte-bf933af8.js')).default;
const file = '_app/immutable/entry/_page.svelte.e04ac8ba.js';
const server_id = "src/routes/+page.server.js";
const imports = ["_app/immutable/entry/_page.svelte.e04ac8ba.js","_app/immutable/chunks/index.79e82b19.js","_app/immutable/chunks/coverslipTable.svelte_svelte_type_style_lang.6429d3c8.js","_app/immutable/chunks/parse.d12b0d5b.js","_app/immutable/chunks/singletons.d744cbe5.js","_app/immutable/chunks/navbar.c3c24b68.js","_app/immutable/chunks/popup.dbbce627.js","_app/immutable/chunks/stores.2aba5b55.js","_app/immutable/chunks/button-item.6bf52554.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/empty-list.ac357487.js"];
const stylesheets = ["_app/immutable/assets/_page.03d69795.css","_app/immutable/assets/coverslipTable.aa708c95.css"];
const fonts = [];

export { component, file, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=4-9ac61c86.js.map
