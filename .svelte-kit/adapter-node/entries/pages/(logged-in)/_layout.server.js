import { p as prisma } from "../../../chunks/index4.js";
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
export {
  load
};
