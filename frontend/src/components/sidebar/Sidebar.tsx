"use client";
import { useState } from "react";
import clsx from "clsx";
import { CgMail } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import ContentFriend from "../content/FriendContent";
import main from "../../assets/main-icon/main.png";
import { useMyContext } from "@/store/MyContext";
import Image from "next/image";
import female1 from "../../assets/avatar/female1.jpg";
import ContentUserOnline from "../content/ContentUserOnline";

const Sidebar = () => {
  const { user } = useMyContext();
  const [option, setOption] = useState<number>(1);

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-white font-bold text-xl flex items-center gap-3">
        <Image alt="icon-main" src={main} width={40} height={40}></Image>
        Chat v7
      </h1>

      <div className="bg-black p-1 flex gap-2 rounded-md mt-4">
        <button
          onClick={() => setOption(1)}
          className={clsx(
            "font-medium text-white flex-1 py-2 justify-center rounded-md text-base flex items-center gap-2",
            [option === 1 && "bg-[#2E2F38]"]
          )}
        >
          <CgMail size="22px" />
          Chat
        </button>
        <button
          onClick={() => setOption(2)}
          className={clsx(
            "text-white flex justify-center gap-2 flex-1 py-2 rounded-md text-base font-medium",
            [option === 2 && "bg-[#2E2F38]"]
          )}
        >
          <FaUserFriends size="22px" />
          Friends
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {option === 1 ? <ContentUserOnline /> : <ContentFriend />}
      </div>

      {user.name && (
        <div className="flex gap-3 items-center border-t-[1px] border-gray-300 pt-2 relative">
          <Image
            alt="avatar"
            src={female1}
            width={50}
            height={50}
            className="rounded-full"
          ></Image>

          <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute left-[42px] top-[42px] border-black border-[1px]"></div>

          <div className="text-gray-300 text-sm">
            <strong>{user.name}</strong>
            <p>Free</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
