import { createRouter } from "./context";
import { z } from "zod";

export const exampleRouter = createRouter()
  .query("all-users", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("getUsers", {
    async resolve({ ctx }) {
      return await ctx.prisma.user.findMany();
    },
  })
  .query("getUserById", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });
    }
  })
  .query("getUserByEmail", {
    input: z.object({
      email: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.user.findMany({
        where: {
          email: input.email,
        },
      });
    }
  }).
  mutation("createUser", {
    input: z.object({
      first: z.string(),
      last: z.string(),
      phone: z.string(),
      email: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.user.create({
        data: {
          first: input.first,
          email: input.email,
          last: input.last,
          phone: input.phone,
        },
      });
    }
  })
  .mutation("updateUser", {
    input: z.object({
      id: z.number(),
      first: z.string(),
      last: z.string(),
      phone: z.string(),
      email: z.string(),
    }),
    async resolve({ ctx, input }) {

      return await ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          first: input.first,
          email: input.email,
          last: input.last,
          phone: input.phone,
        },
      });
    }
  })
  .mutation("deleteUser", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.user.delete({
        where: {
          id: input.id,
        },
      });
    }
  });
  
