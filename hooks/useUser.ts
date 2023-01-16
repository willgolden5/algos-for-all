import { CookieValueTypes, getCookie } from "cookies-next";

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  alpaca_token: string;
  alpaca_id: string;
};

const useUser = () => {
  const cookie: CookieValueTypes = getCookie("account");
  if (typeof cookie !== "string") return null;
  const user: User = JSON.parse(cookie);

  return user;
};

export default useUser;
