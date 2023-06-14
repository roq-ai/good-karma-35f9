import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { unusualActivityValidationSchema } from 'validationSchema/unusual-activities';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.unusual_activity
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getUnusualActivityById();
    case 'PUT':
      return updateUnusualActivityById();
    case 'DELETE':
      return deleteUnusualActivityById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getUnusualActivityById() {
    const data = await prisma.unusual_activity.findFirst(convertQueryToPrismaUtil(req.query, 'unusual_activity'));
    return res.status(200).json(data);
  }

  async function updateUnusualActivityById() {
    await unusualActivityValidationSchema.validate(req.body);
    const data = await prisma.unusual_activity.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteUnusualActivityById() {
    const data = await prisma.unusual_activity.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
