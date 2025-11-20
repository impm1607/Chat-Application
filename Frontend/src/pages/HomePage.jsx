import React, { useContext, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import ContactsMenu from "../components/ContactsMenu";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";
import { ChatContext } from "../../context/ChatContext";

const HomePage = () => {
  const { selectedUser, setSelectedUser } = useContext(ChatContext);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="w-screen h-screen sm:px-[6%] sm:py-[5%]">
      <div
        className={`relative grid grid-cols-1 w-full h-full backdrop-blur-2xl border-2 border-gray-600 rounded-2xl overflow-hidden bg-black/25
          ${!isProfileOpen && !selectedUser ? "grid-cols-[1fr_1.25fr]" : ""}
          ${!isProfileOpen && selectedUser ? "grid-cols-[1fr_2fr]" : ""}
          ${isProfileOpen ? "grid-cols-[1fr_1.7fr_1fr]" : ""}
        `}
      >
        <ContactsMenu setIsProfileOpen={setIsProfileOpen} />
        <ChatContainer setIsProfileOpen={setIsProfileOpen} />
        {isProfileOpen && (
          <RightSidebar
            isProfileOpen={isProfileOpen}
            setIsProfileOpen={setIsProfileOpen}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
