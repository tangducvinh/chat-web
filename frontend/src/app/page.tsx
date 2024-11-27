"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IFormData {
  name: string;
}

const Page = () => {
  const [formData, setFormData] = useState<IFormData>({
    name: "",
  });
  const router = useRouter();
  const onSubmit = (e: Event) => {
    e.preventDefault();

    router.push("/chat");
  };

  return (
    <div className="h-screen w-screen bg-[#C2B0EC] flex items-center justify-center">
      <form onSubmit={onSubmit} className="w-[400px] bg-white rounded-lg p-4">
        <div className="flex">
          <label className="mr-4">Username</label>
          <input
            type="text"
            placeholder="Enter username..."
            className="outline-none flex-1"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          ></input>
        </div>

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
