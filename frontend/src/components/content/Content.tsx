"use client";

import { useEffect, useState } from "react";
import { IoPersonAdd } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { CgTimer } from "react-icons/cg";
import { IoSendSharp } from "react-icons/io5";
import Message from "../message/message";
import io from "socket.io-client";

interface IMessage {
  name: string;
  avatar?: string;
  time: string;
  content: string;
}
const socket = io("http://localhost:5000");

const Content = () => {
  const [message, setMessage] = useState<string>("");
  const [listMessage, setListMessage] = useState<IMessage[]>([]);

  useEffect(() => {
    socket.on("server-send-message", (data) => {
      setListMessage(data);
    });

    socket.on("server-send-information", (data) => {
      setListMessage(data.dataMessage);
    });
  }, [socket]);

  const onSubmit = (e: Event) => {
    e.preventDefault();

    if (message.trim()) {
      socket.emit("client-send-message", {
        name: "berlin",
        time: new Date(),
        content: message,
      });
      setMessage("");
    }
  };
  return (
    <div className="w-full flex flex-col">
      <div className="px-4 flex justify-between items-center w-full h-[60px] shadow-md">
        <h4 className="text-gray-300 text-base font-semibold">New chat</h4>

        <div className="flex gap-6 text-[20px]">
          <IoPersonAdd className="hover:cursor-pointer text-gray-300" />
          <FaBell className="hover:cursor-pointer text-gray-300" />
          <CgTimer className="hover:cursor-pointer text-gray-300 text-[22px]" />
        </div>
      </div>

      <div className="flex flex-1 flex-col-reverse mb-[50px] p-3 gap-3 overflow-y-auto overflow-x-hidden">
        {listMessage.map((item, index) => (
          <Message
            key={index}
            avatar={item.avatar || "d"}
            name={item.name}
            content={item.content}
            time={item.time}
          />
        ))}
      </div>

      <div className="h-[70px] flex items-center bg-[#25262D] justify-around relative">
        <form
          onSubmit={onSubmit}
          className="flex w-[90%] bg-[#404048] items-center px-3 py-2 rounded-md absolute top-[-25%]"
        >
          <input
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
      </div>
    </div>
  );
};

export default Content;
