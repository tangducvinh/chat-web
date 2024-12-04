import { IoMdClose } from "react-icons/io";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

import UserItem from "../user/UserItem";
import { getListUser } from "../../apis/user.api";

interface IProps {
  onCloseForm: () => void;
}

interface IDataSearch {
  name?: string;
}

interface IListUser {
  user_name: string;
  user_avatar?: string;
  _id: string;
}

const FormAddFriend: React.FC<IProps> = ({ onCloseForm }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [textDebounce] = useDebounce(searchText, 500);
  const [listUsers, setListUsers] = useState<IListUser[]>([]);

  useEffect(() => {
    const fetchListUser = async (data: IDataSearch) => {
      const response = await getListUser(data);
      setListUsers(response.metadata);
    };

    if (textDebounce) fetchListUser({ name: textDebounce });
  }, [textDebounce]);

  return (
    <div className="fixed z-10 inset-0 w-screen h-screen bg-overlay-black flex justify-center items-center">
      <div className="bg-white rounded-md w-[400px] h-[500px]">
        <div className="flex items-center p-3 justify-between border-b-2 border-gray-300 pb-2">
          <h2 className="text-black font-semibold">Thêm bạn</h2>

          <button
            onClick={onCloseForm}
            className="hover:cursor-pointer p-2 rounded-full hover:bg-gray-300"
          >
            <IoMdClose className="text-black text-xl " />
          </button>
        </div>

        <div className="my-6 px-5 flex items-center gap-4">
          <label className="text-semibold text-sm">Tên user: </label>
          <input
            value={searchText}
            className="text-sm flex-1 outline-none border-b-[1px] border-gray-300"
            placeholder="Nhập tên: "
            onChange={(e) => setSearchText(e.target.value)}
          ></input>
        </div>

        <ul>
          <h3 className="text-xs ml-3 mb-2 text-gray-600 font-semibold">
            Danh sách tìm kiếm
          </h3>

          {listUsers?.map((item) => (
            <UserItem
              type={"request"}
              key={item._id}
              name={item.user_name}
              avatar={item.user_avatar}
              id={item._id}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FormAddFriend;
