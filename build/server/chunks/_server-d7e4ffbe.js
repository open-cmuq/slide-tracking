import { j as json } from './index-39e97e00.js';
import { p as prisma } from './index4-11111b00.js';
import '@prisma/client';

async function GET({ locals }) {
  const experiments = await prisma.experiment.findMany({
    where: {
      createdByUserId: locals.user.id
    }
  });
  return json(experiments);
}

export { GET };
//# sourceMappingURL=_server-d7e4ffbe.js.map
