import { j as newSlideSchema, s as slideSchema, d as deleteEntrySchema } from './forms-11130bd4.js';
import { f as fail, r as redirect } from './index-39e97e00.js';
import { nanoid } from 'nanoid';
import { p as prisma } from './index4-11111b00.js';
import 'zod';
import '@prisma/client';

let coverslips;
async function createCoverslips(slide, userid) {
  if (slide.type == "plate") {
    coverslips = Array(8 * 12).fill(null).map((_, index) => ({
      coating: "-",
      shape: "round",
      slideId: slide.id,
      specimen: "-",
      id: nanoid(),
      createdByUserId: userid,
      plateIdx: index
    }));
  }
  for (const coverslipData of coverslips) {
    try {
      const coverslip = await prisma.coverslip.create({
        data: coverslipData
      });
      console.log(`Created coverslip with ID: ${coverslip.id}`);
    } catch (error) {
      console.error("Error creating coverslips:", error);
    }
  }
}
const actions = {
  async new(event) {
    const user = event.locals.user;
    if (!user) {
      return fail(401, { formErrors: ["Please sign in"] });
    }
    const formData = Object.fromEntries(await event.request.formData());
    const slideParse = newSlideSchema.safeParse(formData);
    if (!slideParse.success) {
      return fail(400, slideParse.error.formErrors);
    }
    await prisma.slide.create({
      data: {
        ...slideParse.data,
        id: nanoid(),
        createdByUserId: user.id
      }
    }).then((slide) => {
      if (slide.type === "plate") {
        createCoverslips(slide, user.id).catch((err) => console.error("Error while creating coverslips:", err));
        throw redirect(303, `/slide/${slide.id}`);
      } else {
        throw redirect(303, `/slide/${slide.id}`);
      }
    }).catch((error) => {
      console.error(error);
    });
  },
  async edit(event) {
    const user = event.locals.user;
    if (!user) {
      return fail(401, { formErrors: ["Please sign in"] });
    }
    const formData = Object.fromEntries(await event.request.formData());
    const slideParse = slideSchema.safeParse(formData);
    if (!slideParse.success) {
      return fail(400, slideParse.error.formErrors);
    }
    await prisma.slide.update({
      where: {
        id: slideParse.data.id
      },
      data: slideParse.data
    }).then((slide) => {
      console.log(slide);
      throw redirect(303, `/slide/${slide.id}`);
    }).catch((error) => {
      console.error(error);
    });
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
    const deletedSlide = await prisma.slide.delete({
      where: {
        id: deleteParse.data.id
      }
    });
    throw redirect(303, `/experiment/${deletedSlide.experimentId}`);
  }
};
function load() {
  throw redirect(302, "/projects");
}

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 14;
const component = async () => (await import('./_page.svelte-0bf7a95c.js')).default;
const file = '_app/immutable/entry/(logged-in)-slides-page.svelte.be1a3fdf.js';
const server_id = "src/routes/(logged-in)/slides/+page.server.js";
const imports = ["_app/immutable/entry/(logged-in)-slides-page.svelte.be1a3fdf.js","_app/immutable/chunks/index.79e82b19.js"];
const stylesheets = [];
const fonts = [];

export { component, file, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=14-4655318c.js.map
