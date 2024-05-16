import { r as redirect } from './index-39e97e00.js';

function redirectSameRoute(event, to) {
  const referrer = event.request.headers.get("referer");
  if (referrer) {
    const url = new URL(referrer);
    if (event.url.host === url.host && event.url.pathname === url.pathname) {
      throw redirect(302, to);
    }
  }
}
function redirectDifferentRoute(event, to) {
  const referrer = event.request.headers.get("referer");
  if (referrer) {
    const url = new URL(referrer);
    if (event.url.host !== url.host || event.url.pathname !== url.pathname) {
      throw redirect(302, to);
    }
  }
}

export { redirectDifferentRoute as a, redirectSameRoute as r };
//# sourceMappingURL=redirect-65eea593.js.map
