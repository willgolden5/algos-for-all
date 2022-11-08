import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../utils/prisma";
import {z} from "zod";

const schema = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
});

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = await JSON.parse(req.body);
  const { email, firstName, lastName, phone } = schema.parse(body);
  const alreadyExists = await prisma.mailing_list.findFirst({
    where: {
      email,
    },
  })
  if (alreadyExists) {
    res.status(400).json({ error: "Email already exists" });
    return;
  }
  const result = await prisma.mailing_list.create({
    data: {
    first_name: firstName,
    last_name: lastName,
    email: email,
    phone: phone,
}
});
  return res.json(result);
}