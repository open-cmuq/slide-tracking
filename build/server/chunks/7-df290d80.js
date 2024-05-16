import { e as newStainingSchema, f as editStainingSchema, d as deleteEntrySchema } from './forms-11130bd4.js';
import { f as fail, e as error } from './index-39e97e00.js';
import { a as redirectDifferentRoute, r as redirectSameRoute } from './redirect-65eea593.js';
import { nanoid } from 'nanoid';
import { p as prisma } from './index4-11111b00.js';
import { q } from './index5-a20c4dba.js';
import 'zod';
import '@prisma/client';

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

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 7;
const component = async () => (await import('./_page.svelte-33169c54.js')).default;
const file = '_app/immutable/entry/(logged-in)-coverslip-_coverslipId_-staining-page.svelte.cd9abc16.js';
const server_id = "src/routes/(logged-in)/coverslip/[coverslipId]/staining/+page.server.js";
const imports = ["_app/immutable/entry/(logged-in)-coverslip-_coverslipId_-staining-page.svelte.cd9abc16.js","_app/immutable/chunks/index.79e82b19.js","_app/immutable/chunks/coverslipTable.svelte_svelte_type_style_lang.6429d3c8.js","_app/immutable/chunks/parse.d12b0d5b.js","_app/immutable/chunks/singletons.d744cbe5.js","_app/immutable/chunks/stainining_fields.257325a1.js","_app/immutable/chunks/button-item.6bf52554.js","_app/immutable/chunks/popup.dbbce627.js","_app/immutable/chunks/dropdown-item.72bb262e.js","_app/immutable/chunks/empty-list.ac357487.js"];
const stylesheets = ["_app/immutable/assets/_page.65504169.css","_app/immutable/assets/coverslipTable.aa708c95.css"];
const fonts = [];

export { component, file, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=7-df290d80.js.map
