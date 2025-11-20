import React, { useContext, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { RiArrowLeftSLine } from "react-icons/ri";
import { IoEllipsisVertical } from "react-icons/io5";
import logo from "../assets/logo.png";
import search_icon from "../assets/search_icon.png";
import avatar_icon from "../assets/avatar_icon.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useState } from "react";

const ContactsMenu = ({ setIsProfileOpen }) => {
  const { socket, logout, onlineUsers } = useContext(AuthContext);

  const {
    messages,
    users,
    selectedUser,
    unseenMessages,
    getUsers,
    getMessages,
    sendMessage,
    setSelectedUser,
    setUnseenMessages,
  } = useContext(ChatContext);

  const navigate = useNavigate();

  const [input, setInput] = useState("");

  const filteredUsers = input
    ? users?.filter((user) =>
        user?.fullName?.toLowerCase().includes(input.toLowerCase())
      )
    : users;

  useEffect(() => {
    getUsers();
  }, []);

  // Socket event listeners to update user list on status changes without calling the getUsers function repeatedly (unnecessary API calls)
  useEffect(() => {
    if (!socket) return;

    const updateUsers = () => getUsers();

    socket.on("user:online", updateUsers);
    socket.on("user:offline", updateUsers);
    socket.on("user:registered", updateUsers);

    return () => {
      socket.off("user:online", updateUsers);
      socket.off("user:offline", updateUsers);
      socket.off("user:registered", updateUsers);
    };
  }, [socket]);

  return (
    <div className="bg-[#8185B2]/10 backdrop-blur-2xl h-full p-5 rounded-r-xl overflow-y-scroll text-white border-r border-gray-600 py-5 px-3 min-w-[200px]">
      <div
        className={`w-full h-full flex flex-col items-center justify-start gap-5 ${
          selectedUser ? "px-2" : "px-4"
        }`}
      >
        {/* HEADER */}
        <div className="w-full flex items-center justify-between gap-2">
          <div className="flex items-center justify-between gap-2">
            {/* {selectedUser && (
              <RiArrowLeftSLine
                className="w-5 h-5 text-white"
                onClick={() => setSelectedUser(null)}
              />
            )} */}
            <img src={logo} alt="logo" className="max-w-40" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 cursor-pointer outline-none">
                <IoEllipsisVertical className="w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="bottom"
              align="end"
              className="w-32 rounded-md bg-[#282142] border border-gray-600 text-gray-100 m-2 p-2"
            >
              <DropdownMenuItem
                className="text-sm cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                Edit Profile
              </DropdownMenuItem>

              <DropdownMenuSeparator className="border-gray-500 mx-2" />

              <DropdownMenuItem
                className="text-sm cursor-pointer"
                onClick={() => logout()}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* SEARCH BAR */}
        <div className="w-full flex items-center justify-center gap-4 rounded-full py-3 px-4 bg-[#282142]">
          <img src={search_icon} alt="Search" className="w-3" />
          <input
            type="text"
            className="bg-transparent border-none outline-none text-white text-xs placeholder-[#c8C8c8]/50 w-full"
            placeholder="Search or start new chat..."
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* CONTACTS AVAILABLE */}
        <div className="w-full flex flex-col gap-3 overflow-y-auto overflow-x-hidden">
          {filteredUsers.map((user, index) => (
            <div
              key={index}
              className={`flex items-center justify-between w-full gap-1 py-2 px-3 rounded-lg cursor-pointer hover:bg-[#282142]/30 ${
                selectedUser?._id === user?._id && "bg-[#282142]/70"
              }`}
              onClick={() => {
                setSelectedUser(user);
                setIsProfileOpen(false);
                setUnseenMessages((prev) => ({ ...prev, [user?._id]: 0 }));
              }}
            >
              <div className="flex items-center justify-start gap-2">
                <div className="w-9 h-9 rounded-full overflow-hidden">
                  <img
                    src={user?.profilePic || avatar_icon}
                    alt="profilePic"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col items-start justify-center gap-0 p-1">
                  <p className="text-white whitespace-nowrap">
                    {user?.fullName}
                  </p>
                  <p
                    className={`flex items-center justify-start gap-2 text-[10px] ${
                      onlineUsers?.includes(user?._id)
                        ? "text-green-600 italic"
                        : "text-red-700"
                    }`}
                  >
                    {onlineUsers?.includes(user?._id) ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
              {unseenMessages[user?._id] > 0 && (
                <div className="flex items-center justify-center text-xs text-white/70 w-5 h-5 rounded-full bg-purple-600/30 overflow-hidden shrink-0">
                  {unseenMessages[user?._id]}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactsMenu;
