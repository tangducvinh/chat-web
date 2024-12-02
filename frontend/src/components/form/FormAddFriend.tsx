import { IoMdClose } from "react-icons/io";

interface IProps {
  onCloseForm: () => void;
}

const FormAddFriend: React.FC<IProps> = ({ onCloseForm }) => {
  return (
    <div className="fixed z-10 inset-0 w-screen h-screen bg-overlay-black flex justify-center items-center">
      <div className="bg-white p-3 rounded-md w-[400px] h-[500px]">
        <div className="flex items-center justify-between border-b-2 border-gray-300 pb-2">
          <h2 className="text-black font-semibold">Thêm bạn</h2>

          <button
            onClick={onCloseForm}
            className="hover:cursor-pointer p-2 rounded-full hover:bg-gray-300"
          >
            <IoMdClose className="text-black text-xl " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormAddFriend;
