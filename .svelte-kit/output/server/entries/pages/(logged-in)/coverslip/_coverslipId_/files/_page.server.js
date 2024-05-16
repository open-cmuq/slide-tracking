import { e as error, f as fail } from "../../../../../../chunks/index.js";
import { d as deleteEntrySchema } from "../../../../../../chunks/forms.js";
import { F as FILE_UPLOAD_DIR } from "../../../../../../chunks/env.js";
import { nanoid } from "nanoid";
import path$1 from "node:path";
import { p as prisma } from "../../../../../../chunks/index4.js";
import { a as redirectDifferentRoute } from "../../../../../../chunks/redirect.js";
import fs from "fs";
import path from "path";
function mkdirp(dir) {
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch (err) {
    if (err.code === "EEXIST")
      return;
    throw err;
  }
}
function write(filepath, data) {
  mkdirp(path.dirname(filepath));
  fs.writeFileSync(filepath, data);
}
function load({ locals, params }) {
  return {
    files: prisma.coverslipFile.findMany({
      where: {
        coverslipId: params.coverslipId,
        createdByUserId: locals.user.id
      },
      include: {
        createdBy: true
      }
    })
  };
}
const actions = {
  async new(event) {
    const { locals, request } = event;
    const formData = await request.formData();
    const coverslipId = formData.get("coverslipId");
    if (typeof coverslipId !== "string") {
      throw error(400);
    }
    const files = formData.getAll("files");
    for (const file of files) {
      if (typeof file === "string") {
        throw error(400);
      }
      const id = nanoid();
      const filepath = path$1.join(FILE_UPLOAD_DIR, id);
      const buffer = Buffer.from(await file.arrayBuffer());
      write(filepath, buffer);
      await prisma.coverslipFile.create({
        data: {
          id,
          coverslipId,
          createdByUserId: locals.user.id,
          name: file.name,
          size: file.size
        }
      }).then(() => {
        redirectDifferentRoute(event, `/coverslip/${coverslipId}/files`);
      }).catch((error2) => {
        console.error(error2);
      });
    }
  },
  async delete(event) {
    const formData = Object.fromEntries(await event.request.formData());
    const deleteParse = deleteEntrySchema.safeParse(formData);
    if (!deleteParse.success) {
      return fail(400, deleteParse.error.formErrors);
    }
    await prisma.coverslipFile.delete({
      where: {
        id: deleteParse.data.id
      }
    });
  }
};
export {
  actions,
  load
};
