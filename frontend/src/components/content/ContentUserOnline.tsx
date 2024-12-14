"use client";

import { useEffect, useState } from "react";
import { useMyContext } from "@/store/MyContext";
import Image from "next/image";
import female1 from "../../assets/avatar/female1.jpg";
import { IRoom } from "@/app/types/common.type";
import Link from "next/link";

const ContentUserOnline = () => {
  const [listRoom, setListRoom] = useState<IRoom[]>([]);
  const { listUsers, socket, user } = useMyContext();

  useEffect(() => {
    // handle get list room from server
    const handleGetListRoom = (data: any) => {
      setListRoom(data);
    };
    socket?.on("server-send-list-room", handleGetListRoom);

    // get list room
    if (user.id) {
      socket?.emit("client-send-get-list-room", user.id);
    }
    return () => {
      socket?.off("server-send-list-room", handleGetListRoom);
    };
  }, [socket, user.id]);

  return (
    <div className="mt-4 z-0">
      <ul>
        {listRoom.map((item) => (
          <Link
            href={`/chat/${item._id}`}
            key={item._id}
            className="flex gap-3 hover:cursor-pointer p-2 rounded-md hover:bg-[#2E2F38] relative"
          >
            <Image
              alt="avatar"
              src={item.room_image || female1}
              width={40}
              height={40}
              className="rounded-full "
            />

            <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute left-[39px] top-[35px] border-black border-[1px]"></div>
            <strong className="text-sm text-gray-300">
              {item.room_type === "two"
                ? item.room_menbers?.find((item) => item._id != user.id)
                    ?.user_name
                : item.room_name}
            </strong>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ContentUserOnline;
