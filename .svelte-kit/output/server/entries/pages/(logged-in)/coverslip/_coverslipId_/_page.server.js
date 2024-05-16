import { n as newCoverslipSchema, c as coverslipSchema, a as coverslipsSchema, d as deleteEntrySchema } from "../../../../../chunks/forms.js";
import { f as fail } from "../../../../../chunks/index.js";
import { nanoid } from "nanoid";
import { p as prisma } from "../../../../../chunks/index4.js";
import { r as redirectSameRoute } from "../../../../../chunks/redirect.js";
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
export {
  actions
};
