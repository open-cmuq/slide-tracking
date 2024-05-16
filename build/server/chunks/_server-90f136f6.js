import { j as json } from './index-39e97e00.js';
import { p as prisma } from './index4-11111b00.js';
import '@prisma/client';

async function GET({ locals }) {
  const projects = await prisma.project.findMany({
    where: {
      createdByUserId: locals.user.id
    }
  });
  return json(projects);
}

export { GET };
//# sourceMappingURL=_server-90f136f6.js.map
