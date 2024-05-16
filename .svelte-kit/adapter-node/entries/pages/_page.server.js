import { r as redirect } from "../../chunks/index.js";
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
export {
  load
};
