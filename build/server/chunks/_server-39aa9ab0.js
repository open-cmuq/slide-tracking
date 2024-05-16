import { e as error } from './index-39e97e00.js';
import { F as FILE_UPLOAD_DIR } from './env-50c5a207.js';
import fs from 'node:fs/promises';
import path$1 from 'node:path';
import { p as prisma } from './index4-11111b00.js';
import { zip } from 'fflate';
import '@prisma/client';

async function GET({ locals, url }) {
  const query = url.searchParams.getAll("id");
  if (query.length < 1)
    throw error(400);
  const coverslips = await prisma.coverslipFile.findMany({
    where: {
      id: {
        in: query
      },
      createdByUserId: locals.user.id
    }
  });
  if (coverslips.length < query.length)
    throw error(404);
  const fileBuffers = await Promise.all(coverslips.map((file) => {
    const filepath = path$1.join(FILE_UPLOAD_DIR, file.id);
    return fs.readFile(filepath);
  }));
  if (fileBuffers.length === 1)
    return new Response(fileBuffers[0]);
  const zipped = await new Promise((resolve) => {
    const zippables = {};
    for (let i = 0; i < fileBuffers.length; i++) {
      zippables[coverslips[i].name] = fileBuffers[i];
    }
    zip(zippables, (_, result) => {
      resolve(result);
    });
  });
  return new Response(zipped);
}

export { GET };
//# sourceMappingURL=_server-39aa9ab0.js.map
