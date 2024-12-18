import type { Metadata } from "next";
import Sidebar from "@/components/sidebar/Sidebar";
import HeaderContent from "@/components/content/HeaderContent";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#2E2F38] h-screen flex">
      <div className="bg-[#25262D] flex-2 max-w-[350px]">
        <Sidebar />
      </div>

      <div className="flex flex-8">{children}</div>
    </div>
  );
}
