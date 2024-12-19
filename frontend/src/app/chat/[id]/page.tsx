import ContentChat from "@/components/content/ContentChat";
import { getInforRoom } from "@/apis/room.api";

interface IProps {
  params: Promise<{ id: string }>;
}

const ChatPage: React.FC<IProps> = async ({ params }) => {
  const { id } = await params;

  const room = await getInforRoom(id);

  console.log({ room: room.metadata.room_menbers });

  return (
    <ContentChat
      roomId={id}
      name={room.metadata.room_name}
      members={room.metadata.room_menbers}
    />
  );
};

export default ChatPage;
