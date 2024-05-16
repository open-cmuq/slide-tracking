import { config } from "dotenv";
import Google from "@auth/core/providers/google";
import { f as fail, j as json } from "./index.js";
import { nanoid } from "nanoid";
import { j as newUserSchema } from "./forms.js";
import { p as prisma } from "./index4.js";
import { D as DEV } from "./prod-ssr.js";
import { d as private_env } from "./internal.js";
import { Auth } from "@auth/core";
const dev = DEV;
function sequence(...handlers) {
  const length = handlers.length;
  if (!length)
    return ({ event, resolve }) => resolve(event);
  return ({ event, resolve }) => {
    return apply_handle(0, event, {});
    function apply_handle(i, event2, parent_options) {
      const handle2 = handlers[i];
      return handle2({
        event: event2,
        resolve: (event3, options) => {
          const transformPageChunk = async ({ html, done }) => {
            if (options?.transformPageChunk) {
              html = await options.transformPageChunk({ html, done }) ?? "";
            }
            if (parent_options?.transformPageChunk) {
              html = await parent_options.transformPageChunk({ html, done }) ?? "";
            }
            return html;
          };
          return i < length - 1 ? apply_handle(i + 1, event3, { transformPageChunk }) : resolve(event3, { transformPageChunk });
        }
      });
    }
  };
}
async function getSession(req, config2) {
  config2.secret ??= private_env.AUTH_SECRET;
  config2.trustHost ??= true;
  const url = new URL("/api/auth/session", req.url);
  const request = new Request(url, { headers: req.headers });
  const response = await Auth(request, config2);
  const { status = 200 } = response;
  const data = await response.json();
  if (!data || !Object.keys(data).length)
    return null;
  if (status === 200)
    return data;
  throw new Error(data.message);
}
const actions = [
  "providers",
  "session",
  "csrf",
  "signin",
  "signout",
  "callback",
  "verify-request",
  "error"
];
function AuthHandle(prefix, authOptions) {
  return function({ event, resolve }) {
    const { url, request } = event;
    event.locals.getSession ??= () => getSession(request, authOptions);
    const action = url.pathname.slice(prefix.length + 1).split("/")[0];
    if (!actions.includes(action) || !url.pathname.startsWith(prefix + "/")) {
      return resolve(event);
    }
    return Auth(request, authOptions);
  };
}
function SvelteKitAuth(options) {
  const { prefix = "/auth", ...authOptions } = options;
  authOptions.secret ??= private_env.AUTH_SECRET;
  authOptions.trustHost ??= !!(private_env.AUTH_TRUST_HOST ?? private_env.VERCEL ?? dev);
  return AuthHandle(prefix, authOptions);
}
config();
const AUTHJS_SECRET = process.env.AUTHJS_SECRET;
const GOOGLE_AUTH_CLIENT_ID = process.env.GOOGLE_AUTH_CLIENT_ID;
const GOOGLE_AUTH_SECRET = process.env.GOOGLE_AUTH_SECRET;
const authenticate = SvelteKitAuth({
  trustHost: true,
  callbacks: {
    async signIn({ user: { email, name } }) {
      if (!email || !name)
        return false;
      const user = await prisma.user.findUnique({ where: { email } });
      if (user)
        return true;
      const userParse = newUserSchema.safeParse({ email, name });
      if (!userParse.success) {
        return fail(400, userParse.error.formErrors);
      }
      await prisma.user.create({
        data: {
          ...userParse.data,
          id: nanoid()
        }
      }).then((newUser) => {
        console.log("User created");
      }).catch((error) => {
        console.error(error);
      });
      return true;
    }
  },
  providers: [
    // @ts-ignore
    Google({
      clientId: GOOGLE_AUTH_CLIENT_ID,
      clientSecret: GOOGLE_AUTH_SECRET
    })
  ],
  secret: AUTHJS_SECRET
});
async function loadUser({ event, resolve }) {
  const session = await event.locals.getSession();
  if (!session)
    return resolve(event);
  const user = await prisma.user.findUnique({
    where: {
      email: (
        /** @type {string} */
        session.user?.email
      )
    }
  });
  if (user) {
    event.locals.user = user;
    event.locals.session = session;
  }
  return resolve(event);
}
function guardLogin({ event, resolve }) {
  if (event.route.id?.startsWith("/(logged-in)")) {
    if (!event.locals.user) {
      const { url: { protocol, host } } = event;
      const root = new URL(`${protocol}//${host}/`);
      return Response.redirect(root);
    }
  }
  return resolve(event);
}
async function redirect({ event, resolve }) {
  const response = await resolve(event);
  const dest = event.url.searchParams.get("redirect");
  if (dest) {
    const isActionJsonRequest = response.headers.get("content-type") === "application/json" && event.request.method === "POST";
    console.log(dest);
    const url = new URL(decodeURIComponent(dest), "https://slide-tracking.qatar.cmu.edu");
    const knownRoutes = ["/api", "/coverslip", "/experiment", "/experiments", "/project", "/projects", "/slide", "/slides", "/table"];
    if (knownRoutes.includes(url.pathname)) {
      if (isActionJsonRequest) {
        return json({
          type: "redirect",
          status: 302,
          location: url.toString()
        });
      }
      return Response.redirect(url.toString());
    } else {
      return isActionJsonRequest ? json({ error: "Invalid redirect URL" }) : Response.redirect("/error");
    }
  }
  return response;
}
const handle = sequence(
  authenticate,
  loadUser,
  guardLogin,
  redirect
);
export {
  handle
};
