import { c as create_ssr_component, b as subscribe, e as escape } from './index3-bf5daf62.js';
import { p as page } from './stores-6dcd4f9d.js';

const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<h1>${escape($page.status)}</h1>
<p>${escape($page.error?.message)}</p>`;
});

export { Error as default };
//# sourceMappingURL=error.svelte-4cc4e7fc.js.map
