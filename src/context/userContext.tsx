import { User } from '@/types';
import React, { createContext, useContext, useState, ReactNode } from 'react';


interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  const user = useContext(UserContext);
  if(!user) {
    throw new Error("useUser must be used within a UserProvider");
  } 
  return user;
};

export const useAuth = () => {
  const {user} = useUser();
  return {
    isAuthenticated: !!user
  }
}

export const UserProvider:React.FC<{children:ReactNode}> = ({children}) => {
  const [user, setUser] = useState<User|null>(null);
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}