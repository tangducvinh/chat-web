"use client";
import { useState } from "react";
import clsx from "clsx";
import { CgMail } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import ContentFriend from "../content/FriendContent";

const Sidebar = () => {
  const [option, setOption] = useState<number>(1);

  console.log(option);

  return (
    <div>
      <h1 className="text-white font-bold text-2xl">Chatchit</h1>

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

      <div>{option === 1 ? <div>here</div> : <ContentFriend />}</div>
    </div>
  );
};

export default Sidebar;
