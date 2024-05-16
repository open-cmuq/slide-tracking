import { c as create_ssr_component, e as escape, b as subscribe, v as validate_component, h as createEventDispatcher, o as onDestroy, f as add_attribute } from './index3-bf5daf62.js';
import { M as Mdi_icon } from './index-bf0759ae.js';
import { D as Dropdown, P as Popup, A as Arrow } from './popup-1109891f.js';
import { p as page } from './stores-6dcd4f9d.js';
import { B as Button_item } from './button-item-730a6055.js';
import { mdiMicroscope, mdiQrcodeScan } from '@mdi/js';
import './utils-ae3035df.js';
import 'qrcode';

const css$3 = {
  code: ".title.svelte-1aos8qp{padding-block:var(--br-size-3) var(--br-size-2);padding-inline:var(--br-sidebar-section-indent, var(--br-size-3));position:sticky;top:0;text-transform:uppercase;color:rgb(150, 150, 150);background-color:var(--br-background-color);font-size:12.5px}.items.svelte-1aos8qp{display:flex;flex-direction:column;padding-inline-start:var(--br-sidebar-section-indent, var(--br-size-3));gap:var(--br-sidebar-section-gap, var(--br-size-2))}",
  map: null
};
const Section = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  $$result.css.add(css$3);
  return `<section>${title ? `<div class="${"title svelte-1aos8qp"}">${escape(title)}</div>` : ``}
    <div class="${"items svelte-1aos8qp"}">${slots.default ? slots.default({}) : ``}</div>
</section>`;
});
const mdiGoogle = "M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1";
const css$2 = {
  code: ".qrcode-stream-wrapper.svelte-1abpb2t.svelte-1abpb2t{width:100%;height:100%;position:relative;z-index:0}.qrcode-stream-wrapper.qrcode-stream-camera--hidden.svelte-1abpb2t.svelte-1abpb2t{padding-bottom:56.25%}.qrcode-stream-overlay.svelte-1abpb2t.svelte-1abpb2t{width:100%;height:100%;position:absolute;top:0;left:0}.qrcode-stream-camera.svelte-1abpb2t.svelte-1abpb2t{width:100%;height:100%;display:block;object-fit:cover}.qrcode-stream-camera--hidden.svelte-1abpb2t video.svelte-1abpb2t{visibility:hidden;position:absolute}video.svelte-1abpb2t.svelte-1abpb2t{display:block}",
  map: null
};
const Qrcode = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let shouldScan;
  createEventDispatcher();
  let { camera = "auto" } = $$props;
  let { track: track2 = void 0 } = $$props;
  let cameraInstance = null;
  let trackingLayer;
  let pauseFrame;
  let video;
  onDestroy(() => {
  });
  if ($$props.camera === void 0 && $$bindings.camera && camera !== void 0)
    $$bindings.camera(camera);
  if ($$props.track === void 0 && $$bindings.track && track2 !== void 0)
    $$bindings.track(track2);
  $$result.css.add(css$2);
  shouldScan = cameraInstance !== null;
  return `<div class="${[
    "qrcode-stream-wrapper svelte-1abpb2t",
    !shouldScan ? "qrcode-stream-camera--hidden" : ""
  ].join(" ").trim()}"><video class="${"qrcode-stream-camera svelte-1abpb2t"}" autoplay muted playsinline${add_attribute("this", video, 0)}></video>

    ${!shouldScan ? `<canvas class="${"qrcode-stream-camera svelte-1abpb2t"}"${add_attribute("this", pauseFrame, 0)}></canvas>` : ``}

    <canvas class="${"qrcode-stream-overlay svelte-1abpb2t"}"${add_attribute("this", trackingLayer, 0)}></canvas>

    <div class="${"qrcode-stream-overlay svelte-1abpb2t"}">${slots.default ? slots.default({}) : ``}</div>
</div>`;
});
const css$1 = {
  code: ".dialog-overlay.svelte-9jaqf2{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0, 0, 0, 0.5);display:flex;justify-content:center;align-items:center;z-index:100}.dialog.svelte-9jaqf2{background:white;padding:20px;border-radius:8px;z-index:100}",
  map: null
};
function track(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(firstPoint.x, firstPoint.y);
    for (const { x, y } of otherPoints) {
      ctx.lineTo(x, y);
    }
    ctx.lineTo(firstPoint.x, firstPoint.y);
    ctx.closePath();
    ctx.stroke();
  }
}
const Cameradialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { show = false } = $$props;
  let { close } = $$props;
  if ($$props.show === void 0 && $$bindings.show && show !== void 0)
    $$bindings.show(show);
  if ($$props.close === void 0 && $$bindings.close && close !== void 0)
    $$bindings.close(close);
  $$result.css.add(css$1);
  return `${show ? `<div class="${"dialog-overlay svelte-9jaqf2"}"><div class="${"dialog svelte-9jaqf2"}">${validate_component(Qrcode, "QrScanner").$$render($$result, { track }, {}, {})}
        ${``}
        <button style="${"margin: 5px 45%;"}">Close</button></div></div>` : ``}`;
});
const css = {
  code: "nav.svelte-1lmhyd{display:flex;align-items:center;height:var(--br-size-12);padding-inline:var(--viewport-margin);border-bottom:var(--br-global-border)}.logo.svelte-1lmhyd{font-family:'Inter', var(--br-font-family);display:inline-flex;align-items:center;justify-content:center;gap:var(--br-size-3)}.word-mark.svelte-1lmhyd{font-size:var(--br-size-5);font-weight:600;letter-spacing:-0.025em;margin-top:var(--br-size-2)}.logo.svelte-1lmhyd{--icon-size:var(--br-size-7);height:var(--br-size-7)}.actions.svelte-1lmhyd{margin-left:auto;display:flex;gap:var(--br-size-3)}",
  map: null
};
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let user;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let showDialog = false;
  function closeDialog() {
    showDialog = false;
  }
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    user = $page.data.user;
    $$rendered = `${validate_component(Cameradialog, "Cameradialog").$$render(
      $$result,
      { close: closeDialog, show: showDialog },
      {
        show: ($$value) => {
          showDialog = $$value;
          $$settled = false;
        }
      },
      {}
    )}



<nav class="${"svelte-1lmhyd"}"><a class="${"logo svelte-1lmhyd"}" href="${"/"}">${validate_component(Mdi_icon, "MdiIcon").$$render($$result, { d: mdiMicroscope }, {}, {})}
		<div class="${"word-mark svelte-1lmhyd"}">Slide Tracking
		</div></a>
	<div class="${"actions svelte-1lmhyd"}">${user ? `${validate_component(Dropdown, "Dropdown").$$render($$result, {}, {}, {
      trigger: () => {
        return `<div slot="${"trigger"}" class="${"br-list-item"}">${escape(user.name)}</div>`;
      },
      default: () => {
        return `<button>${validate_component(Mdi_icon, "MdiIcon").$$render($$result, { d: mdiQrcodeScan }, {}, {})}
                    Scan QR Code
                </button>
                
                ${validate_component(Popup, "Popup").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Arrow, "Arrow").$$render($$result, {}, {}, {})}
                    ${validate_component(Button_item, "ButtonItem").$$render($$result, {}, {}, {
              default: () => {
                return `Sign Out
                    `;
              }
            })}`;
          }
        })}`;
      }
    })}` : `<button class="${"br-button-primary"}">${validate_component(Mdi_icon, "MdiIcon").$$render($$result, { d: mdiGoogle }, {}, {})}
                Sign in with Google
            </button>`}</div>
</nav>`;
  } while (!$$settled);
  $$unsubscribe_page();
  return $$rendered;
});

export { Navbar as N, Section as S };
//# sourceMappingURL=navbar-957f1c00.js.map
