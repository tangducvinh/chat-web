"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useMyContext } from "@/store/MyContext";
import SearchInput from "../search/SearchInput";
import { IListFriends } from "@/app/types/common.type";
import { getListFriends } from "@/apis/user.api";
import female1 from "../../assets/avatar/female1.jpg";

const ContentFriend = () => {
  const router = useRouter();
  const { user } = useMyContext();
  const [listFriends, setListFriends] = useState<IListFriends[]>([]);

  useEffect(() => {
    const fetchListUser = async (userId: string) => {
      const response = await getListFriends(userId);

      if (response.metadata) {
        setListFriends(response.metadata.user_list_friends);
      }
    };
    if (user.id) fetchListUser(user.id);
  }, [user.id]);

  const handleClickFriend = (roomId: string) => {
    router.push(`/chat/${roomId}`);
  };

  return (
    <div>
      <div className="mx-3">
        <SearchInput />
      </div>

      <div className="h-[55px]"></div>
      <ul>
        {listFriends.map((item) => (
          <li
            key={item.infor_user._id}
            onClick={() => handleClickFriend(item.infor_room)}
            className="flex gap-3 hover:cursor-pointer p-2 rounded-md hover:bg-[#2E2F38] relative"
          >
            <Image
              alt="avatar"
              src={female1 || item.infor_user.user_avatar}
              width={40}
              height={40}
              className="rounded-full ml-2"
            />

            <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute left-[45px] top-[37px] border-black border-[1px]"></div>
            <strong className="text-sm text-gray-300">
              {item.infor_user?.user_name}
            </strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentFriend;
