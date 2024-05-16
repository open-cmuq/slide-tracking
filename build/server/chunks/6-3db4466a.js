import { e as error, f as fail } from './index-39e97e00.js';
import { d as deleteEntrySchema } from './forms-11130bd4.js';
import { F as FILE_UPLOAD_DIR } from './env-50c5a207.js';
import { nanoid } from 'nanoid';
import path$1 from 'node:path';
import { p as prisma } from './index4-11111b00.js';
import { a as redirectDifferentRoute } from './redirect-65eea593.js';
import fs from 'fs';
import path from 'path';
import 'zod';
import '@prisma/client';

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

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 6;
const component = async () => (await import('./_page.svelte-4288751a.js')).default;
const file = '_app/immutable/entry/(logged-in)-coverslip-_coverslipId_-files-page.svelte.5f81a80c.js';
const server_id = "src/routes/(logged-in)/coverslip/[coverslipId]/files/+page.server.js";
const imports = ["_app/immutable/entry/(logged-in)-coverslip-_coverslipId_-files-page.svelte.5f81a80c.js","_app/immutable/chunks/index.79e82b19.js","_app/immutable/chunks/coverslipTable.svelte_svelte_type_style_lang.6429d3c8.js","_app/immutable/chunks/parse.d12b0d5b.js","_app/immutable/chunks/singletons.d744cbe5.js","_app/immutable/chunks/button-item.6bf52554.js","_app/immutable/chunks/popup.dbbce627.js","_app/immutable/chunks/empty-list.ac357487.js","_app/immutable/chunks/item-list.b5e17376.js","_app/immutable/chunks/dropmenu.8d41ac65.js","_app/immutable/chunks/index.b48e78f2.js"];
const stylesheets = ["_app/immutable/assets/_page.7026acd8.css","_app/immutable/assets/coverslipTable.aa708c95.css"];
const fonts = [];

export { component, file, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=6-3db4466a.js.map
