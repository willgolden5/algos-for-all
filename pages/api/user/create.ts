// api route for creating user with prisma

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { firstName, lastName, password, email, phone } = req.body;
  const result = await prisma.user.create({data: {
        first_name: firstName,
        last_name:  lastName,
        email,
        password,
        phone
  }});
  res.json(result);
}