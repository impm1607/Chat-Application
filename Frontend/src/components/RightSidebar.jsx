import React, { useState, useContext, useEffect } from "react";
import assets from "../assets/assets";
import LightboxModal from "../lib/lightboxmodal";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { RxCross2 } from "react-icons/rx";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const RightSidebar = ({ isProfileOpen, setIsProfileOpen }) => {
  const { selectedUser, setSelectedUser, messages } = useContext(ChatContext);
  const { onlineUsers } = useContext(AuthContext);

  const [media, setMedia] = useState([]);

  const [viewMedia, setViewMedia] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Get all the images from the messages and set them to state
  useEffect(() => {
    setMedia(
      messages
        ?.filter((message) => message.image)
        .map((message) => message.image)
    );
  }, [messages]);

  if (!isProfileOpen || !selectedUser) return null;

  return (
    <div className="flex flex-col items-center justify-start w-full px-6 py-4 border-l border-gray-600 !bg-[#8185B2]/10 min-w-[200px]">
      <div className="flex items-center justify-between h-12 w-full gap-2 mb-4">
        <p className="text-sm text-white">Contact Info</p>
        <RxCross2
          className="text-white cursor-pointer"
          onClick={() => setIsProfileOpen(false)}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <img
          src={selectedUser?.profilePic || assets.avatar_icon}
          alt={selectedUser?.fullName}
          className="w-36 aspect-square rounded-full cursor-pointer"
        />
        <div className="flex items-center justify-center gap-2 p-1">
          <span
            className={`w-2 h-2 rounded-full  ${
              onlineUsers?.includes(selectedUser?._id)
                ? "bg-green-500"
                : "bg-red-600"
            }`}
          />
          <p className="text-white text-lg mx-auto">{selectedUser?.fullName}</p>
        </div>
        <p className="text-white text-xs mx-auto">{selectedUser?.bio}</p>
      </div>
      <hr className="border-gray-600 mt-4 mb-3 w-full" />
      <div className="flex flex-col items-start justify-center w-full gap-3">
        <p
          className="flex items-center justify-center gap-[2px] hover:gap-2 mb-1 text-sm text-white/60 cursor-pointer hover:text-white"
          onClick={() => setViewMedia(!viewMedia)}
        >
          Media, links and docs
          <MdKeyboardArrowRight className="w-4 h-4 mt-[2px]" />
        </p>
        {viewMedia && (
          <div className="grid grid-cols-3 gap-2 w-full rounded-sm min-h-10 max-h-[235px] overflow-y-auto overflow-x-hidden">
            {media.map((img, index) => (
              <div
                className="w-full aspect-square overflow-hidden rounded-sm cursor-pointer mb-2 min-h-0"
                key={index}
              >
                <img
                  src={img}
                  alt={index}
                  className="w-full h-full object-cover"
                  onDoubleClick={() => {
                    setSelectedIndex(index);
                    setLightboxOpen(true);
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <LightboxModal
          images={media}
          initialIndex={selectedIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
};

export default RightSidebar;
