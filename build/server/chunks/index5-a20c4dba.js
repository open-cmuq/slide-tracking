import { p as prisma } from './index4-11111b00.js';

async function project(id) {
  const project2 = (
    /** @type {Project} */
    await prisma.project.findFirst({
      where: { id }
    })
  );
  return {
    type: "project",
    ...project2
  };
}
async function experiment(id) {
  const experiment2 = (
    /** @type {Experiment} */
    await prisma.experiment.findFirst({
      where: { id }
    })
  );
  return {
    type: "experiment",
    ...experiment2
  };
}
async function slide(id) {
  const slide2 = (
    /** @type {Slide} */
    await prisma.slide.findFirst({
      where: { id }
    })
  );
  return {
    type: "slide",
    ...slide2
  };
}
async function coverslip(id) {
  const [coverslip2] = await prisma.$queryRaw`
		WITH cte AS (
			SELECT *,
				row_number() OVER (
					PARTITION BY slideId
					ORDER BY createdAt
				) AS pos
			FROM Coverslip
		)
		SELECT
			*,
			'Coverslip ' || pos as title,
			'coverslip' AS type
		FROM cte
		WHERE id = ${id}
		LIMIT 1
	`;
  return coverslip2;
}
async function findAll(breadcrumbTrail) {
  const getters = (
    /** @type {const} */
    [
      ["projectId", project],
      ["experimentId", experiment],
      ["slideId", slide],
      ["coverslipId", coverslip]
    ]
  );
  const promises = [];
  for (const [type, get] of getters) {
    const id = breadcrumbTrail[type];
    if (id)
      promises.push(get(id));
  }
  const root = {
    type: "root",
    name: "own",
    title: "My projects"
  };
  return [root, ...await Promise.all(promises)];
}
const breadcrumbs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  coverslip,
  experiment,
  findAll,
  project,
  slide
}, Symbol.toStringTag, { value: "Module" }));
async function includeCreatedBy(items) {
  const createdByUsers = await prisma.user.findMany({
    where: {
      id: {
        in: items.map(({ createdByUserId }) => createdByUserId)
      }
    }
  });
  const userMap = new Map(createdByUsers.map((user) => [user.id, user]));
  return items.map((item) => ({
    ...item,
    createdBy: (
      /** @type {User} */
      userMap.get(item.createdByUserId)
    )
  }));
}
const q = {
  includeCreatedBy,
  breadcrumbs
};

export { q };
//# sourceMappingURL=index5-a20c4dba.js.map
