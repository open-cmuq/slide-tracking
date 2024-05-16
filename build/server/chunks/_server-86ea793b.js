import { j as json } from './index-39e97e00.js';
import { p as prisma } from './index4-11111b00.js';
import '@prisma/client';

async function GET({ locals, url }) {
  const query = url.searchParams;
  const coverslips = await prisma.coverslip.findMany({
    where: {
      slideId: query.get("slideId") || void 0,
      createdByUserId: locals.user.id
    }
  });
  return json(coverslips);
}

export { GET };
//# sourceMappingURL=_server-86ea793b.js.map
