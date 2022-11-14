import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../utils/prisma";
import {z} from "zod";

// const schema = z.object({
//   email: z.string(),
//   firstName: z.string(),
//   lastName: z.string(),
//   phone: z.string(),
// });

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = await JSON.parse(req.body);
  const { email, firstName, lastName, phone } = body;
  // check if the entry already exists in the mailing_list table with prisma. If it does, return an error. If it doesn't, create the entry.
  const existingEntry = await prisma.mailing_list.findUnique({
    where: {
      email: email,
    },
  });
  if (existingEntry) {
    res.status(400).json({ message: "already exists" });
  } else {
  await prisma.mailing_list.create({
    data: {
      email: email,
      first_name: firstName,
      last_name: lastName,
      phone: phone,
    },
  });

  res.status(200).json({ message: "success" });
}
};