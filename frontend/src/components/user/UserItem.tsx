import { memo } from "react";
import female1 from "../../assets/avatar/female1.jpg";
import Image from "next/image";
import { useMyContext } from "@/store/MyContext";

interface IProps {
  name: string;
  avatar?: string;
  id: string;
}

const UserItem: React.FC<IProps> = ({ name, avatar, id }) => {
  const { socket, user } = useMyContext();

  const handleSendFriendRequest = () => {
    socket.emit("client-send-friend-request", {
      userSend: user.id,
      userReceive: id,
    });
  };

  return (
    <li className="cursor-pointer flex items-center justify-between px-4 py-2 hover:bg-gray-200">
      <div className="flex gap-3">
        <Image
          alt="anh"
          src={avatar || female1}
          className="h-[40px] w-[40px] rounded-full"
        ></Image>

        <strong className="text-sm">{name}</strong>
      </div>

      <button
        onClick={handleSendFriendRequest}
        className="text-xs text-blue-500 opacity-90 hover:opacity-100 border-[1px] font-bold rounded-sm border-blue-500 px-2 py-1"
      >
        Kết bạn
      </button>
    </li>
  );
};

export default memo(UserItem);
