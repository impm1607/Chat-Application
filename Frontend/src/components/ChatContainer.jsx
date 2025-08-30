import React, { useEffect, useRef } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import logo_icon from "../assets/logo_icon.svg";
import gallery_icon from "../assets/gallery_icon.svg";
import assets, { messagesDummyData } from "../assets/assets";
import { userDummyData } from "../assets/assets";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = ({ isSelectedUser, setIsProfileOpen }) => {
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return isSelectedUser ? (
    <div className="flex flex-col items-center justify-center w-full h-full pb-4 pt-1 px-2">
      {/* HEADER */}
      <div className="flex items-center justify-between gap-2 border-b border-gray-600 p-2 mb-2 w-full shrink-0">
        <div
          className="flex items-center justify-center gap-3 cursor-pointer"
          onClick={() => setIsProfileOpen(true)}
        >
          <img
            src={isSelectedUser?.profilePic}
            alt={isSelectedUser?.fullName}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex items-center justify-center gap-3 py-2">
            <p className="text-lg text-white">{isSelectedUser?.fullName}</p>
            <span
              className={`w-2 h-2 rounded-full  ${
                isSelectedUser?.online ? "bg-green-500" : "bg-red-600"
              }`}
            />
          </div>
        </div>
        <button className=" flex items-center justify-center p-2 w-5 h-5 rounded-full border border-white/80 text-white/80 cursor-pointer mr-3">
          i
        </button>
      </div>

      {/* MESSAGES */}
      <div className="flex items-center flex-1 w-full">
        <div className="flex flex-col items-center justify-start gap-2 w-full h-full overflow-x-hidden overflow-y-auto max-h-[440px]">
          {messagesDummyData.map(
            (message, index) =>
              (message.senderId === isSelectedUser?._id ||
                message.receiverId === isSelectedUser?._id) && (
                <div
                  key={index}
                  className={`flex items-center justify-start gap-2 
            ${
              message.senderId === isSelectedUser?._id ? "flex-row-reverse" : ""
            } w-full px-1`}
                >
                  <div className="flex flex-col items-center justify-center gap-1">
                    <img
                      src={
                        message.senderId === isSelectedUser?._id
                          ? assets.avatar_icon
                          : isSelectedUser?.profilePic
                      }
                      alt="asd"
                      className="w-7 h-7 rounded-full"
                    />
                    <p className="text-xs text-white/40">
                      {formatMessageTime(message.createdAt)}
                    </p>
                  </div>
                  <div
                    className={`bg-violet-500/30 text-sm text-white p-2 max-w-64 overflow-hidden ${
                      message.senderId === isSelectedUser?._id
                        ? "rounded-bl-lg rounded-tr-lg"
                        : "rounded-br-lg rounded-tl-lg"
                    }`}
                  >
                    {message.image ? (
                      <img
                        src={message.image}
                        alt="message_image"
                        className={`rounded-sm`}
                      />
                    ) : (
                      <p>{message.text}</p>
                    )}
                  </div>
                </div>
              )
          )}
          <div ref={scrollRef} />
        </div>
      </div>

      {/* INPUT BOX */}
      <div className="flex items-center justify-between gap-2 w-full px-3 shrink-0">
        <div className="w-full flex items-center justify-center gap-4 rounded-full py-3 px-5 bg-[#282142]">
          <input
            type="text"
            className="bg-transparent border-none outline-none text-white text-xs placeholder-[#c8C8c8]/50 w-full"
            placeholder="Search or start new chat..."
          />
          <input
            type="file"
            id="imagemsg"
            accept="image/png, image/jpeg"
            className="hidden"
          />
          <label htmlFor="imagemsg" className="cursor-pointer">
            <img src={gallery_icon} alt="gallery_icon" className="w-4 mr-1" />
          </label>
        </div>
        <button className="flex items-center justify-center h-8 w-8 rounded-full p-1 cursor-pointer">
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
