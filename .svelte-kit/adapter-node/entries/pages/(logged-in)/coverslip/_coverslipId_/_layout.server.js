import { e as error } from "../../../../../chunks/index.js";
import { p as prisma } from "../../../../../chunks/index4.js";
import { q } from "../../../../../chunks/index5.js";
async function load(event) {
  const { locals, params } = event;
  const coverslip = await prisma.coverslip.findFirst({
    where: {
      id: params.coverslipId,
      createdByUserId: locals.user.id
    },
    include: {
      slide: true
    }
  });
  if (!coverslip)
    throw error(404, "Not Found");
  const coverslips = await prisma.coverslip.findMany({
    where: {
      slideId: coverslip.slideId
    }
  });
  const [breadcrumbs, session] = await Promise.all([
    coverslipBreadcrumbs(params.coverslipId),
    locals.getSession()
  ]);
  return {
    coverslips,
    current: coverslip,
    session,
    breadcrumbs
  };
}
async function coverslipBreadcrumbs(coverslipId) {
  const [breadcrumbTrail] = await prisma.$queryRaw`
		SELECT
			p.id AS projectId,
			e.id AS experimentId,
			s.id AS slideId,
			c.id AS coverslipId
		FROM Coverslip c
		JOIN Slide s ON s.id = c.slideId
		JOIN Experiment e ON e.id = s.experimentId
		JOIN Project p ON p.id = e.projectId
		WHERE c.id = ${coverslipId};
	`;
  return q.breadcrumbs.findAll(breadcrumbTrail);
}
export {
  load
};
