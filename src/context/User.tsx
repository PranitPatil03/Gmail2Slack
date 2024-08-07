/* eslint-disable react-refresh/only-export-components */
import { SlackChannel, User, UserContextProps } from "@/types";
import { createContext, useState, ReactNode, FC, useContext } from "react";

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [slackChannel, setSlackChannel] = useState<SlackChannel | null>(null);

  return (
    <UserContext.Provider
      value={{ user, setUser, slackChannel, setSlackChannel }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export { UserContext };
