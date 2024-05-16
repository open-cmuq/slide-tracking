import { a as newCoverslipSchema, c as coverslipSchema, b as coverslipsSchema, d as deleteEntrySchema } from './forms-11130bd4.js';
import { f as fail } from './index-39e97e00.js';
import { nanoid } from 'nanoid';
import { p as prisma } from './index4-11111b00.js';
import { r as redirectSameRoute } from './redirect-65eea593.js';
import 'zod';
import '@prisma/client';

const actions = {
  async new(event) {
    const user = event.locals.user;
    if (!user) {
      return fail(401, { formErrors: ["Please sign in"] });
    }
    const formData = Object.fromEntries(await event.request.formData());
    const coverslipParse = newCoverslipSchema.safeParse(formData);
    if (!coverslipParse.success) {
      return fail(400, coverslipParse.error.formErrors);
    }
    const coverslip = await prisma.coverslip.create({
      data: {
        ...coverslipParse.data,
        id: nanoid(),
        createdByUserId: user.id
      }
    });
    return redirectSameRoute(event, `/slide/${coverslip.slideId}`);
  },
  async edit(event) {
    const user = event.locals.user;
    if (!user) {
      return fail(401, { formErrors: ["Please sign in"] });
    }
    const formData = Object.fromEntries(await event.request.formData());
    const coverslipParse = coverslipSchema.safeParse(formData);
    if (!coverslipParse.success) {
      return fail(400, coverslipParse.error.formErrors);
    }
    await prisma.coverslip.update({
      where: {
        id: coverslipParse.data.id
      },
      data: coverslipParse.data
    }).then(() => {
    }).catch((error) => {
      console.error("coverslip update not successful", error);
      return fail(400, error);
    });
  },
  async edits(event) {
    const formData = Object.fromEntries(await event.request.formData());
    const ids = formData.ids.split(",");
    const coverslipParse = coverslipsSchema.safeParse(formData);
    if (!coverslipParse.success) {
      return fail(400, coverslipParse.error.formErrors);
    }
    const coverslipData = {
      coating: coverslipParse.data.coating,
      positionX: coverslipParse.data.positionX,
      positionY: coverslipParse.data.positionY,
      shape: coverslipParse.data.shape,
      slideId: coverslipParse.data.slideId,
      specimen: coverslipParse.data.specimen
    };
    for (const id of ids) {
      await prisma.coverslip.update({
        where: {
          id
        },
        data: coverslipData
      }).then(() => {
        console.log("coverslip updated");
      }).catch((error) => {
        console.error("coverslip update not successful", error);
        return fail(400, error);
      });
    }
  },
  async delete(event) {
    const user = event.locals.user;
    if (!user) {
      return fail(401, { formErrors: ["Please sign in"] });
    }
    const formData = Object.fromEntries(await event.request.formData());
    const deleteParse = deleteEntrySchema.safeParse(formData);
    if (!deleteParse.success) {
      return fail(400, deleteParse.error.formErrors);
    }
    const deletedCoverslip = await prisma.coverslip.delete({
      where: {
        id: deleteParse.data.id
      }
    });
    return redirectSameRoute(event, `/slide/${deletedCoverslip.slideId}`);
  }
};

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 5;
const component = async () => (await import('./_page.svelte-f0186b65.js')).default;
const file = '_app/immutable/entry/(logged-in)-coverslip-_coverslipId_-page.svelte.e98aca22.js';
const server_id = "src/routes/(logged-in)/coverslip/[coverslipId]/+page.server.js";
const imports = ["_app/immutable/entry/(logged-in)-coverslip-_coverslipId_-page.svelte.e98aca22.js","_app/immutable/chunks/index.79e82b19.js","_app/immutable/chunks/coverslipTable.svelte_svelte_type_style_lang.6429d3c8.js","_app/immutable/chunks/parse.d12b0d5b.js","_app/immutable/chunks/singletons.d744cbe5.js"];
const stylesheets = ["_app/immutable/assets/_page.471b66bf.css","_app/immutable/assets/coverslipTable.aa708c95.css"];
const fonts = [];

export { component, file, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=5-8545c238.js.map
