"use client";

import { useEffect, useState } from "react";
import { IoSendSharp } from "react-icons/io5";

import HeaderContent from "@/components/content/HeaderContent";
import MessageItem from "@/components/message/MessageItem";
import { useMyContext } from "@/store/MyContext";

interface IMessage {
  mes_content: string;
  mes_create_at: string;
  mes_scope: string;
  createdAt: string;
  mes_user_send: {
    _id: string;
    user_name: string;
    user_avatar: string;
  };
}

const Content = () => {
  const { socket, user } = useMyContext();
  const [message, setMessage] = useState<string>("");
  const [listMessage, setListMessage] = useState<IMessage[]>([]);
  const [listTyping, setListTyping] = useState<string[]>([]);

  useEffect(() => {
    socket?.on("server-send-message", (data: any) => {
      setListMessage(data);
    });

    socket?.on("update-typing", (data: string[]) => {
      setListTyping(data);
    });
  }, [socket]);

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (message.trim()) {
      socket.emit("client-send-message", {
        content: message,
        userId: user.id,
        scope: "global",
      });
      setMessage("");
    }
  };

  const handleTyping = () => {
    socket.emit("someone-typing", name);
  };

  const handleStopTyping = () => {
    socket.emit("someone-stop-typing", name);
  };
  console.log({ listMessage });
  return (
    <div className="w-full flex flex-col">
      <HeaderContent title={"Chat global"} />

      <div className="flex flex-1 flex-col-reverse mb-[50px] p-3 gap-3 overflow-y-auto overflow-x-hidden">
        {listMessage.map((item, index) => (
          <MessageItem
            key={index}
            avatar={item.mes_user_send.user_avatar || "d"}
            name={item.mes_user_send.user_name}
            content={item.mes_content}
            time={item.createdAt}
          />
        ))}
      </div>

      <div className="h-[70px] flex items-center bg-[#25262D] justify-around relative">
        <form
          onSubmit={onSubmit}
          className="flex w-[90%] bg-[#404048] items-center px-3 py-2 rounded-md absolute top-[-25%]"
        >
          <input
            onFocus={handleTyping}
            onBlur={handleStopTyping}
            placeholder="Send a message"
            className="text-gray-300 bg-transparent w-[97%] outline-none break-words text-wrap"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {message && (
            <button type="submit" className="border-l-2 pl-3">
              <IoSendSharp className="text-gray-300 text-2xl border-gray-300" />
            </button>
          )}
        </form>

        {listTyping.length && (
          <ul className="absolute top-[-100px] left-[80px] h-[80px] flex flex-col-reverse">
            {listTyping.map((item) => (
              <li className="text-gray-300 text-sm">{`${item} is typing...`}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Content;
