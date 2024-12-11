import ContentChat from "@/components/content/ContentChat";

interface IProps {
  params: Promise<{ id: string }>;
}

const ChatPage: React.FC<IProps> = async ({ params }) => {
  const { id } = await params;
  return <ContentChat roomId={id} />;
};

export default ChatPage;
