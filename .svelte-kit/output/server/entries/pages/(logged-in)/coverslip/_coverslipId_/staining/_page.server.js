import { b as newStainingSchema, e as editStainingSchema, d as deleteEntrySchema } from "../../../../../../chunks/forms.js";
import { f as fail, e as error } from "../../../../../../chunks/index.js";
import { a as redirectDifferentRoute, r as redirectSameRoute } from "../../../../../../chunks/redirect.js";
import { nanoid } from "nanoid";
import { p as prisma } from "../../../../../../chunks/index4.js";
import { q } from "../../../../../../chunks/index5.js";
async function load(event) {
  const { locals, params: { coverslipId } } = event;
  const [breadcrumbs, stainings] = await Promise.all([
    coverslipBreadcrumbs(coverslipId),
    prisma.staining.findMany({
      where: {
        coverslipId,
        createdByUserId: locals.user.id
      },
      include: {
        fields: true
      }
    })
  ]);
  return { breadcrumbs, stainings };
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
const actions = {
  async new(event) {
    const user = event.locals.user;
    if (!user) {
      console.log("User not logged in");
      return fail(401, { formErrors: ["Please sign in"] });
    }
    const formData = await event.request.formData();
    const coverslipId = formData.get("coverslipId");
    const stainingFields = Array.from(formData.entries()).filter(([key]) => key.startsWith("fields")).map(([key, value]) => {
      const match = key.match(/fields\[(\d+)\]\[(\w+)\]/);
      if (!match) {
        throw error(400, "Invalid field values");
      }
      const [, index, field] = match;
      return { index: Number(index), field, value };
    }).reduce(
      (acc, { index, field, value }) => {
        acc[index] = acc[index] || {};
        acc[index][field] = value;
        return acc;
      },
      /** @type {Record<string, any>[]}*/
      []
    );
    const stainingParse = newStainingSchema.safeParse({
      coverslipId,
      fields: stainingFields
    });
    if (!stainingParse.success) {
      return fail(400, stainingParse.error.formErrors);
    }
    prisma.staining.create({
      data: {
        ...stainingParse.data,
        fields: {
          create: stainingParse.data.fields.map((field) => ({
            ...field,
            id: nanoid(),
            createdByUserId: user.id
          }))
        },
        id: nanoid(),
        createdByUserId: user.id
      }
    }).then((staining) => {
      console.log("New staining created!");
    }).catch((error2) => {
      console.error(error2);
      return fail(400, error2);
    });
    redirectDifferentRoute(event, `/coverslip/${coverslipId}/staining`);
  },
  async edit(event) {
    const { locals, request } = event;
    let formData;
    await request.formData().then((data) => {
      formData = data;
    }).catch((error2) => {
      console.error(error2);
      return fail(400, error2);
    });
    const stainingFields = [];
    for (const [key, formDataValue] of formData) {
      if (!key.startsWith("fields"))
        continue;
      const match = key.match(/fields\[(\d+)\]\[(\w+)\]/);
      if (!match)
        throw error(400, "Invalid field values");
      const index = Number(match[1]);
      const field = (
        /** @type {'name' | 'value'} */
        match[2]
      );
      stainingFields[index] = stainingFields[index] || {};
      stainingFields[index][field] = /** @type {string} */
      formDataValue;
    }
    const coverslipId = (
      /** @type {string} */
      formData.get("coverslipId")
    );
    const id = (
      /** @type {string} */
      formData.get("id")
    );
    const stainingParse = editStainingSchema.safeParse({
      coverslipId,
      fields: stainingFields,
      id
    });
    if (!stainingParse.success) {
      return fail(400, stainingParse.error.formErrors);
    }
    function isCreateField(field) {
      return field.op === "create";
    }
    function isEditField(field) {
      return field.op === "edit";
    }
    function isDeleteField(field) {
      return field.op === "delete";
    }
    await prisma.staining.update({
      where: {
        id: stainingParse.data.id
      },
      data: {
        ...stainingParse.data,
        fields: {
          create: stainingParse.data.fields.filter(isCreateField).map(({ op: _, ...field }) => ({
            ...field,
            id: nanoid(),
            createdByUserId: locals.user.id
          })),
          deleteMany: stainingParse.data.fields.filter(isDeleteField).map(({ op: _, ...field }) => field)
        },
        id: nanoid(),
        createdByUserId: locals.user.id
      }
    });
    const toUpdate = stainingParse.data.fields.filter(isEditField).map(({ op: _, ...field }) => field);
    for (const field of toUpdate) {
      await prisma.stainingField.update({
        where: { id: field.id },
        data: field
      });
    }
    redirectDifferentRoute(event, `/coverslip/${coverslipId}/staining`);
  },
  async delete(event) {
    const formData = Object.fromEntries(await event.request.formData());
    const deleteParse = deleteEntrySchema.safeParse(formData);
    if (!deleteParse.success) {
      return fail(400, deleteParse.error.formErrors);
    }
    const deletedStaining = await prisma.staining.delete({
      where: {
        id: deleteParse.data.id
      }
    });
    redirectSameRoute(event, `/coverslip/${deletedStaining.coverslipId}`);
  }
};
export {
  actions,
  load
};
