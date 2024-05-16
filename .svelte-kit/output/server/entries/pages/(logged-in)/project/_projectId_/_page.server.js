import { e as error } from "../../../../../chunks/index.js";
import { p as prisma } from "../../../../../chunks/index4.js";
import { q } from "../../../../../chunks/index5.js";
async function load(event) {
  const { locals, params } = event;
  const project = await prisma.project.findFirst({
    where: {
      id: params.projectId,
      createdByUserId: locals.user.id
    },
    include: {
      experiments: {
        include: {
          createdBy: true
        }
      }
    }
  });
  if (!project)
    throw error(404, "Not found");
  return {
    breadcrumbs: await q.breadcrumbs.findAll({
      projectId: params.projectId
    }),
    project
  };
}
export {
  load
};
