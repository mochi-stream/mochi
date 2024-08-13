"use client";

import { createContext, useContext, useState, useEffect } from "react";

import { getClerk } from "@/services/auth";
import { ClerkUser } from "@/types/user";

const UserContext = createContext<{ user: ClerkUser | undefined, isAuthenticated: boolean }>({ user: undefined, isAuthenticated: false });

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<ClerkUser | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Fetch the user data from the clerk when the component mounts.
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getClerk();
        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    fetchUser();
  }, []);

  // Provide the user data to its descendants through the UserContext.
  return <UserContext.Provider value={{ user, isAuthenticated }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};

