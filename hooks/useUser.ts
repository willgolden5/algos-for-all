import { PrismaClient } from "@prisma/client";
import { CookieValueTypes, getCookie } from "cookies-next";
import useSWR from "swr";

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  alpaca_token: string;
  alpaca_id: string;
};

const prisma = new PrismaClient();

const fetcher = async (...args: any) => {
  const cookie: CookieValueTypes = getCookie("account");
  if (typeof cookie !== "string") return JSON.stringify("null");
  const jsonCookie: User = await JSON.parse(cookie);
  const user = await prisma.user.findUnique({
    where: {
      id: jsonCookie.id,
    },
  });

  return user;
};

const useUser = () => {
  const { data, error } = useSWR("/api/user", fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useUser;
