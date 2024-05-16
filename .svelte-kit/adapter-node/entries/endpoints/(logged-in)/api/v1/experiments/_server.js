import { j as json } from "../../../../../../chunks/index.js";
import { p as prisma } from "../../../../../../chunks/index4.js";
async function GET({ locals }) {
  const experiments = await prisma.experiment.findMany({
    where: {
      createdByUserId: locals.user.id
    }
  });
  return json(experiments);
}
export {
  GET
};
