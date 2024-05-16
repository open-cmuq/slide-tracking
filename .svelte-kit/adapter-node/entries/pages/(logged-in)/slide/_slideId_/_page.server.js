import { e as error } from "../../../../../chunks/index.js";
import { p as prisma } from "../../../../../chunks/index4.js";
import { q } from "../../../../../chunks/index5.js";
async function load(event) {
  const { locals, params } = event;
  const slide = await prisma.slide.findFirst({
    where: {
      id: params.slideId,
      createdByUserId: locals.user.id
    },
    include: {
      coverslips: true,
      createdBy: true,
      experiment: true
    }
  });
  if (!slide)
    throw error(404, "Not Found");
  return {
    slide,
    breadcrumbs: await slideBreadcrumbs(params.slideId)
  };
}
async function slideBreadcrumbs(slideId) {
  const [breadcrumbTrail] = await prisma.$queryRaw`
		SELECT
				p.id AS projectId,
				e.id AS experimentId,
				s.id AS slideId
			FROM Slide s
			JOIN Experiment e ON e.id = s.experimentId
			JOIN Project p ON p.id = e.projectId
			WHERE s.id = ${slideId};
	`;
  return q.breadcrumbs.findAll(breadcrumbTrail);
}
export {
  load
};
