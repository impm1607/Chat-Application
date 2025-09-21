import React from "react";
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
import { userDummyData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const ContactsMenu = ({
  isSelectedUser,
  setIsSelectedUser,
  setIsProfileOpen,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#8185B2]/10 backdrop-blur-2xl h-full p-5 rounded-r-xl overflow-y-scroll text-white border-r border-gray-600 py-5 px-3">
      <div
        className={`w-full h-full flex flex-col items-center justify-start gap-5 ${
          isSelectedUser ? "px-2" : "px-4"
        }`}
      >
        {/* HEADER */}
        <div className="w-full flex items-center justify-between gap-2">
          <div className="flex items-center justify-between gap-2">
            {/* {isSelectedUser && (
              <RiArrowLeftSLine
                className="w-5 h-5 text-white"
                onClick={() => setIsSelectedUser(null)}
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
              className="w-32 rounded-md bg-[#282142] border border-gray-600 text-gray-100"
            >
              <DropdownMenuItem
                className="text-sm cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                Edit Profile
              </DropdownMenuItem>

              <DropdownMenuSeparator className="border-gray-500" />

              <DropdownMenuItem className="text-sm cursor-pointer">
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
          />
        </div>

        {/* CONTACTS AVAILABLE */}
        <div className="w-full flex flex-col gap-3 overflow-y-auto overflow-x-hidden">
          {userDummyData.map((user, index) => (
            <div
              key={index}
              className={`flex items-center justify-between w-full gap-1 py-2 px-3 rounded-lg cursor-pointer hover:bg-[#282142]/30 ${
                isSelectedUser?._id === user._id && "bg-[#282142]/70"
              }`}
              onClick={() => {
                setIsSelectedUser(user);
                setIsProfileOpen(false);
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
                      user?.online ? "text-green-600 italic" : "text-red-700"
                    }`}
                  >
                    {user?.online ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center text-xs text-white/70 w-5 h-5 rounded-full bg-purple-600/30 overflow-hidden shrink-0">
                2
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactsMenu;
