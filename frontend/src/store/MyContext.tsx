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
    // handle update user online
    const handleUpdateUserOnline = (data: any) => {
      setListUsers(data.listUsers);
    };
    socket?.on("server-send-update-user-online", handleUpdateUserOnline);

    // handle response access
    const handleUserAccess = (data: any) => {
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
    };
    socket?.on("server-send-response-access", handleUserAccess);

    // handle access by accessToken
    const handleAccessByAccessToken = (data: any) => {
      if (data?.metadata) {
        setUser({ id: data.metadata.id, name: data.metadata.name });
      } else {
        router.push("/");
      }
    };
    socket?.on(
      "server-send-user-get-by-accessToken",
      handleAccessByAccessToken
    );

    return () => {
      socket?.off("server-send-update-user-online", handleUpdateUserOnline);
      socket?.off("server-send-response-access", handleUserAccess);
      socket?.off(
        "server-send-user-get-by-accessToken",
        handleAccessByAccessToken
      );
    };
  }, [socket]);

  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken") || null;
    if (!accessToken) {
      return router.push("/");
    }

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
