import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { employeeValidationSchema } from 'validationSchema/employees';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getEmployees();
    case 'POST':
      return createEmployee();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getEmployees() {
    const data = await prisma.employee
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'employee'));
    return res.status(200).json(data);
  }

  async function createEmployee() {
    await employeeValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.background_check?.length > 0) {
      const create_background_check = body.background_check;
      body.background_check = {
        create: create_background_check,
      };
    } else {
      delete body.background_check;
    }
    if (body?.file_access?.length > 0) {
      const create_file_access = body.file_access;
      body.file_access = {
        create: create_file_access,
      };
    } else {
      delete body.file_access;
    }
    if (body?.risk_indicator?.length > 0) {
      const create_risk_indicator = body.risk_indicator;
      body.risk_indicator = {
        create: create_risk_indicator,
      };
    } else {
      delete body.risk_indicator;
    }
    if (body?.unusual_activity?.length > 0) {
      const create_unusual_activity = body.unusual_activity;
      body.unusual_activity = {
        create: create_unusual_activity,
      };
    } else {
      delete body.unusual_activity;
    }
    const data = await prisma.employee.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
