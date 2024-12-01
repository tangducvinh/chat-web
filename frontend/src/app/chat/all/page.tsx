"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { IoSendSharp, IoArrowDownSharp } from "react-icons/io5";
import { throttle } from "lodash";

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
  const containerMessageRef = useRef<HTMLUListElement>(null);
  const [showButtonScrollBottom, setShowButtonScrollBottom] =
    useState<boolean>(false);
  const apiCalled = useRef<boolean>(false);

  useEffect(() => {
    socket?.on("server-send-message", (data: any) => {
      setListMessage(data);
    });

    socket?.on("update-typing", (data: string[]) => {
      setListTyping(data);
    });
  }, [socket]);

  const handleGetMoreMessage = (socket: any, skip: number) => {
    if (apiCalled.current) return;
    apiCalled.current = true;
    socket.emit("client-get-more-message", skip);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (message.trim()) {
      socket.emit("client-send-message", {
        content: message,
        userId: user.id,
        scope: "global",
      });
      setMessage("");
      handleScrollBottom();
    }
  };

  const handleTyping = () => {
    socket.emit("someone-typing", user.name);
  };

  const handleStopTyping = () => {
    socket.emit("someone-stop-typing", user.name);
  };

  // listen even scroll container message
  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollTop = containerMessageRef.current?.scrollTop;
      const heightOfElement = containerMessageRef.current?.offsetHeight;

      if (scrollTop && scrollTop < -100) {
        setShowButtonScrollBottom(true);
      } else {
        setShowButtonScrollBottom(false);
      }
      if (scrollTop && heightOfElement && scrollTop + heightOfElement < 78) {
        let skip = listMessage.length;

        handleGetMoreMessage(socket, skip);
      }
    }, 200);

    if (containerMessageRef.current) {
      containerMessageRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      containerMessageRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [socket, listMessage.length]);

  // handle scroll bottom
  const handleScrollBottom = () => {
    if (containerMessageRef.current) {
      containerMessageRef.current.scrollTop =
        containerMessageRef.current?.scrollHeight;
    }
  };

  return (
    <div className="w-full flex flex-col">
      <HeaderContent title={"Chat global"} />
      <ul
        ref={containerMessageRef}
        className="flex flex-1 flex-col-reverse mb-[50px] p-3 gap-3 overflow-y-auto scrollbar scrollbar-custom scrollbar-thumb-gray-500 overflow-x-hidden scrollbar-custom"
      >
        {listMessage.map((item, index) => (
          <MessageItem
            key={index}
            avatar={item.mes_user_send.user_avatar || "d"}
            name={item.mes_user_send.user_name}
            content={item.mes_content}
            time={item.createdAt}
          />
        ))}
      </ul>

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

        {showButtonScrollBottom && (
          <button
            onClick={() => handleScrollBottom()}
            className="text-white absolute bottom-[120px] bg-gray-600 p-2 rounded-full"
          >
            <IoArrowDownSharp className="text-gray-300 text-2xl " />
          </button>
        )}

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
