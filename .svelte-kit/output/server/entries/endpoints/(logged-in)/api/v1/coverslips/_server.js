import { j as json } from "../../../../../../chunks/index.js";
import { p as prisma } from "../../../../../../chunks/index4.js";
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
export {
  GET
};
