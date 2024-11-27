import Sidebar from "@/components/sidebar/Sidebar";
import Content from "@/components/content/Content";

const Page = () => {
  return (
    <div className="h-screen w-screen bg-[#2E2F38] flex">
      <div className="bg-[#25262D] flex-2 p-3">
        <Sidebar />
      </div>

      <div className="flex flex-8">
        <Content />
      </div>
    </div>
  );
};

export default Page;
