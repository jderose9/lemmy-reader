import { Account } from "@models/Account";
import { createContext, SetStateAction, Dispatch } from "react";

interface AuthContextProps {
    account: Account | null,
    setAccount: Dispatch<SetStateAction<Account | null>>
}

export const AuthContext = createContext(<AuthContextProps> {
  account: null,
  setAccount: (account) => {},
  logout: () => {}
});
