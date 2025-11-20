import React, { useEffect, useRef, useContext, useState } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import logo_icon from "../assets/logo_icon.svg";
import gallery_icon from "../assets/gallery_icon.svg";
import assets, { messagesDummyData } from "../assets/assets";
import { userDummyData } from "../assets/assets";
import { formatMessageTime } from "../lib/utils";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const ChatContainer = ({ setIsProfileOpen }) => {
  const { messages, selectedUser, setSelectedUser, getMessages, sendMessage } =
    useContext(ChatContext);

  const { authUser, onlineUsers } = useContext(AuthContext);

  const scrollRef = useRef();

  const [input, setInput] = useState("");

  // Handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (input.trim() === "") return null;

    await sendMessage({ text: input.trim() });
    setInput("");
  };

  // Handle sending an image
  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = null;
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser?._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return selectedUser ? (
    <div className="relative flex flex-col w-full h-full min-h-0 pt-2 pb-14 px-2 min-w-[220px]">
      {/* HEADER */}
      <div className="flex items-center justify-between gap-2 border-b border-gray-600 p-2 mb-2 w-full">
        <div
          className="flex items-center justify-center gap-3 cursor-pointer"
          onClick={() => setIsProfileOpen(true)}
        >
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            alt={selectedUser?.fullName}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex items-center justify-center gap-3 py-2">
            <p className="text-lg text-white">{selectedUser?.fullName}</p>
            <span
              className={`w-2 h-2 rounded-full  ${
                onlineUsers.includes(selectedUser?._id)
                  ? "bg-green-500"
                  : "bg-red-600"
              }`}
            />
          </div>
        </div>
        <button className="flex items-center justify-center w-4 h-4 p-2 rounded-full border border-white/80 text-white/80 text-xs cursor-pointer mr-2">
          i
        </button>
      </div>

      {/* MESSAGES */}
      <div className="flex flex-col gap-2 w-full flex-1 min-h-0 overflow-x-hidden overflow-y-scroll">
        {messages?.map(
          (message, index) =>
            (message.senderId === selectedUser?._id ||
              message.receiverId === selectedUser?._id) && (
              <div
                key={index}
                className={`flex items-start justify-start gap-2 
                ${
                  message.senderId === selectedUser?._id
                    ? ""
                    : "flex-row-reverse"
                } w-full px-1`}
              >
                <div className="flex flex-col items-center justify-center gap-1">
                  <img
                    src={
                      message.senderId === selectedUser?._id
                        ? selectedUser?.profilePic || assets.avatar_icon
                        : authUser?.profilePic || assets.avatar_icon
                    }
                    alt="asd"
                    className="w-7 h-7 rounded-full"
                  />
                  <p className="text-xs text-white/40">
                    {formatMessageTime(message.createdAt)}
                  </p>
                </div>
                <div
                  className={`bg-violet-500/30 text-sm text-white px-2.5 py-2 max-w-64 w-2/5 overflow-hidden ${
                    message.senderId === selectedUser?._id
                      ? "rounded-bl-lg rounded-tr-lg"
                      : "rounded-br-lg rounded-tl-lg"
                  }`}
                >
                  {message.image ? (
                    <img
                      src={message.image}
                      alt="message_image"
                      className={`rounded-sm py-1`}
                    />
                  ) : (
                    <p className="break-words">{message.text}</p>
                  )}
                </div>
              </div>
            )
        )}
        <div ref={scrollRef} />
      </div>

      {/* INPUT BOX */}
      <div className="absolute bottom-1 left-0 right-0 flex items-center justify-between gap-2 w-full px-3 mb-2 mt-2">
        <div className="w-full flex items-center justify-center gap-4 rounded-full py-3 px-5 bg-[#282142]">
          <input
            type="text"
            className="bg-transparent border-none outline-none text-white text-xs placeholder-[#c8C8c8]/50 w-full"
            placeholder="Type a message..."
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => (e.key === "Enter" ? handleSendMessage(e) : null)}
          />
          <input
            type="file"
            id="imagemsg"
            accept="image/png, image/jpeg"
            className="hidden"
            onChange={handleSendImage}
          />
          <label htmlFor="imagemsg" className="cursor-pointer">
            <img
              src={gallery_icon}
              alt="gallery_icon"
              className="w-4 mr-1 cursor-pointer"
            />
          </label>
        </div>
        <button
          className="flex items-center justify-center h-8 w-8 rounded-full p-1 cursor-pointer"
          onClick={handleSendMessage}
        >
          <LuSendHorizontal className="w-full h-full text-indigo-500 text-xl" />
        </button>
      </div>
    </div>
  ) : (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <img src={logo_icon} alt="logo_icon" className="w-20 opacity-70" />
      <p className="text-white/50 text-sm font-light">Chat anytime, anywhere</p>
    </div>
  );
};

export default ChatContainer;
