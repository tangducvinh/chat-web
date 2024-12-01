"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import io from "socket.io-client";

interface MyContextType {
  user: { name: string; id: string };
  setUser: (value: any) => void;
  listUsers: { id: string; name: string; avatar?: string }[];
  setListUsers: (value: any) => void;
  socket: any;
  setSocket: (value: any) => void;
  noticeNameInvalid: string;
  setNoticeNameInvalid: (value: string) => void;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

interface MyProviderProps {
  children: ReactNode;
}

export const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; id: string }>({
    name: "",
    id: "",
  });
  const [listUsers, setListUsers] = useState<
    { id: string; name: string; avatar?: string }[]
  >([]);
  const [socket, setSocket] = useState<any>();
  const [noticeNameInvalid, setNoticeNameInvalid] = useState<string>("");

  useEffect(() => {
    socket?.on("server-send-update-user-online", (data: any) => {
      setListUsers(data.listUsers);
    });

    socket?.on("server-send-response-access", (data: any) => {
      if (!data?.metadata) {
        setNoticeNameInvalid(data.message);
      } else {
        router.push("/chat");
        setUser({ id: data.metadata.id, name: data.metadata.name });
        setNoticeNameInvalid("");
        localStorage.setItem(
          "accessToken",
          JSON.stringify(data.metadata.accessToken)
        );
      }
    });

    socket?.on("server-send-user-get-by-accessToken", (data: any) => {
      console.log(data);
      if (data?.metadata) {
        setUser({ id: data.metadata.id, name: data.metadata.name });
      } else {
        router.push("/");
      }
    });
  }, [socket]);

  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken") || null;
    if (!accessToken) {
      return router.push("/");
    }

    console.log("create new socket");
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
    newSocket.emit(
      "client-send-get-user-by-accessToken",
      JSON.parse(accessToken)
    );
  }, []);

  return (
    <MyContext.Provider
      value={{
        user,
        setUser,
        listUsers,
        setListUsers,
        socket,
        setSocket,
        noticeNameInvalid,
        setNoticeNameInvalid,
      }}
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
