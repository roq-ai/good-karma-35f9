import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { fileAccessValidationSchema } from 'validationSchema/file-accesses';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getFileAccesses();
    case 'POST':
      return createFileAccess();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getFileAccesses() {
    const data = await prisma.file_access
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'file_access'));
    return res.status(200).json(data);
  }

  async function createFileAccess() {
    await fileAccessValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.file_access.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
