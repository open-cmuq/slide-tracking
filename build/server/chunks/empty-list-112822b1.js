import { c as create_ssr_component, v as validate_component } from './index3-bf5daf62.js';
import { M as Mdi_icon } from './index-bf0759ae.js';
import { mdiMicroscope } from '@mdi/js';
import './utils-ae3035df.js';
import 'qrcode';

const css = {
  code: ".center.svelte-njwcet{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}.empty.svelte-njwcet{flex:1}.content.svelte-njwcet{--icon-size:var(--br-size-11);font-size:var(--br-size-5);color:var(--br-dark, #b0b0b0) var(--br-light, #888);flex:none;max-width:30ch}",
  map: null
};
const Empty_list = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="${"center empty svelte-njwcet"}"><div class="${"center content svelte-njwcet"}">${validate_component(Mdi_icon, "MdiIcon").$$render($$result, { d: mdiMicroscope }, {}, {})}
        ${slots.default ? slots.default({}) : ``}</div>
</div>`;
});

export { Empty_list as E };
//# sourceMappingURL=empty-list-112822b1.js.map
