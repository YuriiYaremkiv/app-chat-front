import React from "react";
import { createContext, useEffect, useState } from "react";
import UserServices from "./service/UserServices";

export interface IUserContextType {
  id: string | null;
  username: string | null;
  setId: (id: string | null) => void;
  setUsername: (username: string | null) => void;
  error: unknown | null;
}

export const UserContext = createContext<IUserContextType>({
  id: null,
  username: null,
  setId: (newId) => newId,
  setUsername: (username) => username,
  error: null,
});

interface UserContextProviderProps {
  children: React.ReactNode;
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [id, setId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await UserServices.getProfile();
        setId(data.userId);
        setUsername(data.username);
      } catch (err: unknown) {
        setError(err);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <UserContext.Provider value={{ id, username, error, setId, setUsername }}>
      {children}
    </UserContext.Provider>
  );
}
