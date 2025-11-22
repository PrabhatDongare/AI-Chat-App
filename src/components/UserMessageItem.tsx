import { type Message } from "../types/chat";

interface Props {
  message: Message;
}

const formatTime = (value: string) => {
  const d = new Date(value);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const UserMessageItem = ({ message }: Props) => {
  return (
    <div className="flex w-full lg:w-[70%] justify-end">
      <div className="flex flex-col items-end w-[95%] md:max-w-[70%]">
        <div className="rounded-2xl bg-[#303030] px-4 py-2">
          {message.text}
        </div>
        <div className="mt-1 mr-1 text-sm text-gray-400 ">
          {formatTime(message.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default UserMessageItem;
