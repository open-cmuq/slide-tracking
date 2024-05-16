import { c as create_ssr_component, g as getContext, e as escape, v as validate_component } from './index3-bf5daf62.js';
import { mdiPlus, mdiNoteEdit } from '@mdi/js';
import { M as Mdi_icon } from './index-bf0759ae.js';
import './utils-ae3035df.js';
import 'qrcode';

const css = {
  code: ".field.svelte-yofmym,.value.svelte-yofmym{padding-inline:var(--br-sidebar-section-indent, var(--br-size-3))}.field.svelte-yofmym{padding-block:var(--br-size-4) var(--br-size-2);text-transform:uppercase;color:var(--br-dark, hsl(0, 0%, 60%)) var(--br-light, hsl(0, 0%, 45%));font-size:12.5px;line-height:1}.add-staining-container.svelte-yofmym{position:absolute;top:20%;right:200px}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  getContext("prompt");
  console.log(data);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `<div><div class="${"item"}"><div><div class="${"field svelte-yofmym"}">Slide</div>
			<a class="${"value svelte-yofmym"}" href="${"/slide/" + escape(data.current.slide.id, true)}">${escape(data.current.slide.title)}</a></div>
		<div class="${"add-staining-container svelte-yofmym"}"><button>${validate_component(Mdi_icon, "MdiIcon").$$render($$result, { d: mdiPlus }, {}, {})}
				Add staining
			</button>
			<button>${validate_component(Mdi_icon, "MdiIcon").$$render($$result, { d: mdiNoteEdit }, {}, {})}
				Edit Coverslip
			</button></div></div>
	<div class="${"item"}"><div class="${"field svelte-yofmym"}">Specimen</div>
		<div class="${"value svelte-yofmym"}">${escape(data.current.specimen)}</div></div>
	<div class="${"item"}"><div class="${"field svelte-yofmym"}">Coating</div>
		<div class="${"value svelte-yofmym"}">${escape(data.current.coating)}</div></div>
</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-f0186b65.js.map
