"use client";

import Image from "next/image";
import moment from "moment";

import { useMyContext } from "@/store/MyContext";
import female1 from "../../assets/avatar/female1.jpg";

interface IProps {
  name: string;
  avatar?: string;
  content: string;
  time: string;
  notificationId: string;
  id: string;
  status: Boolean;
}

const UserNotificationItem: React.FC<IProps> = ({
  name,
  avatar,
  content,
  time,
  notificationId,
  id,
  status,
}) => {
  const { user, socket } = useMyContext();

  const handleAcceptFriend = (userId: string, userIdFriend: string) => {
    socket.emit("client-send-accepted-friend", {
      userId,
      userIdFriend,
      notificationId,
    });
  };

  return (
    <li className="flex gap-3 bg-gray-300 p-2 border-b-[1px] border-gray-200 rounded-sm">
      <Image
        className="w-[40px] h-[40px] rounded-full"
        src={avatar || female1}
        alt="anh"
      ></Image>

      <div>
        <p className="text-sm text-left">{content}</p>
        <p className="text-xs text-left text-gray-500 mt-1">
          {moment(time).format("hh:mm A")}
        </p>

        {!status && (
          <div className="flex gap-2 items-center mt-2">
            <button
              onClick={() => handleAcceptFriend(user.id, id)}
              className="bg-blue-500 opacity-90 hover:opacity-100 rounded-sm text-white px-4 py-1 text-sm"
            >
              Chấp nhận
            </button>

            <button className="bg-white border-[1px] border-gray-300 rounded-sm px-4 py-1 text-sm">
              Từ chối
            </button>
          </div>
        )}
      </div>
    </li>
  );
};

export default UserNotificationItem;
