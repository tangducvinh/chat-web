"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { useMyContext } from "@/store/MyContext";
import SearchInput from "../search/SearchInput";
import { IUser } from "@/app/types/common.type";
import { getListFriends } from "@/apis/user.api";
import female1 from "../../assets/avatar/female1.jpg";

const ContentFriend = () => {
  const { user } = useMyContext();
  const [listFriends, setListFriends] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchListUser = async (userId: string) => {
      const response = await getListFriends(userId);

      if (response.metadata) {
        setListFriends(response.metadata.user_list_friends);
      }
    };

    fetchListUser(user.id);
  }, [user]);

  return (
    <div>
      <SearchInput />

      <div className="h-[55px]"></div>
      <ul>
        {listFriends.map((item) => (
          <li
            key={item._id}
            className="flex gap-3 hover:cursor-pointer p-2 rounded-md hover:bg-[#2E2F38] relative"
          >
            <Image
              alt="avatar"
              src={female1 || item.user_avatar}
              width={40}
              height={40}
              className="rounded-full "
            />

            <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute left-[39px] top-[35px] border-black border-[1px]"></div>
            <strong className="text-sm text-gray-300">{item.user_name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentFriend;
