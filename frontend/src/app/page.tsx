"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMyContext } from "@/store/MyContext";
import io from "socket.io-client";

interface IFormData {
  name: string;
}

const Page = () => {
  const router = useRouter();
  const { setSocket, socket, noticeNameInvalid, setNoticeNameInvalid } =
    useMyContext();
  const [formData, setFormData] = useState<IFormData>({
    name: "",
  });
  const onSubmit = (e: any) => {
    e.preventDefault();
    const socket = io("http://localhost:5000");
    setSocket(socket);
    socket.emit("client-send-information-access", {
      name: formData.name,
    });
  };

  useEffect(() => {
    // socket?.disconnect();
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      router.push("/chat");
    }
  }, []);

  return (
    <div className="h-screen w-screen bg-[#11101C] flex items-center justify-center">
      <form onSubmit={onSubmit} className="w-[400px] bg-white rounded-lg p-4">
        <div className="flex">
          <label className="mr-4">Username</label>
          <input
            type="text"
            placeholder="Enter username..."
            className="outline-none flex-1"
            value={formData.name}
            onFocus={() => setNoticeNameInvalid("")}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          ></input>
        </div>
        {noticeNameInvalid && (
          <p className="text-sm font-semibold text-center text-red-500">
            {noticeNameInvalid}
          </p>
        )}

        <button
          type="submit"
          className="px-8 py-2 mx-auto mt-4 block rounded-md bg-pink-300"
        >
          Join
        </button>
      </form>
    </div>
  );
};

export default Page;
