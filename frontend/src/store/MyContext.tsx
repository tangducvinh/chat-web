"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface MyContextType {
  name: string;
  setName: (name: string) => void;
  listUsers: { id: string; name: string; avatar?: string }[];
  setListUsers: (value: any) => void;
  socket: any;
  setSocket: (value: any) => void;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

interface MyProviderProps {
  children: ReactNode;
}

export const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [name, setName] = useState<string>("welcome");
  const [listUsers, setListUsers] = useState<
    { id: string; name: string; avatar?: string }[]
  >([]);
  const [socket, setSocket] = useState<any>();

  useEffect(() => {
    socket?.on("server-send-update-user-online", (data: any) => {
      setListUsers(data.listUsers);
    });
  }, [socket]);

  return (
    <MyContext.Provider
      value={{ name, setName, listUsers, setListUsers, socket, setSocket }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = (): MyContextType => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
};
