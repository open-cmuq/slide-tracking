import { e as error } from "../../../../../chunks/index.js";
import { p as prisma } from "../../../../../chunks/index4.js";
import { q } from "../../../../../chunks/index5.js";
async function load({ locals, params }) {
  const experiment = await prisma.experiment.findFirst({
    where: {
      id: params.experimentId,
      createdByUserId: locals.user.id
    },
    include: {
      slides: {
        include: {
          createdBy: true
        }
      }
    }
  });
  if (!experiment)
    throw error(404, "Not Found");
  return {
    experiment,
    breadcrumbs: await experimentBreadcrumbs(params.experimentId)
  };
}
async function experimentBreadcrumbs(experimentId) {
  const [breadCrumbTrail] = await prisma.$queryRaw`
		SELECT p.id AS projectId, e.id AS experimentId
		FROM Experiment e
		JOIN Project p ON p.id = e.projectId
		WHERE e.id = ${experimentId};
	`;
  return q.breadcrumbs.findAll(breadCrumbTrail);
}
export {
  load
};
