import { CookieValueTypes, getCookie } from "cookies-next";
import useSWR from "swr";

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  alpaca_token: string;
  alpaca_id: string;
};

const fetcher = async (...args: any) => {
  const cookie: CookieValueTypes = getCookie("account");
  if (typeof cookie !== "string") return JSON.stringify("null");
  const jsonCookie: User = await JSON.parse(cookie);

  return jsonCookie;
};

const useUser = () => {
  const { data, error } = useSWR("/api/user", fetcher);
  const userData = data as User;
  return {
    user: userData,
    isLoading: !error && !data,
    error: error,
  };
};

export default useUser;
