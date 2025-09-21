import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import ContactsMenu from "../components/ContactsMenu";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";

const HomePage = () => {
  const [isSelectedUser, setIsSelectedUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="w-screen h-screen sm:px-[10%] sm:py-[5%]">
      <div
        className={`relative grid grid-cols-1 w-full h-full backdrop-blur-2xl border-2 border-gray-600 rounded-2xl overflow-hidden bg-black/25
          ${!isProfileOpen && !isSelectedUser ? "grid-cols-[1fr_1.25fr]" : ""}
          ${!isProfileOpen && isSelectedUser ? "grid-cols-[1fr_2fr]" : ""}
          ${isProfileOpen ? "grid-cols-[1fr_1.7fr_1fr]" : ""}
        `}
      >
        <ContactsMenu
          isSelectedUser={isSelectedUser}
          setIsSelectedUser={setIsSelectedUser}
          setIsProfileOpen={setIsProfileOpen}
        />
        <ChatContainer
          isSelectedUser={isSelectedUser}
          setIsProfileOpen={setIsProfileOpen}
        />
        {isProfileOpen && (
          <RightSidebar
            isSelectedUser={isSelectedUser}
            isProfileOpen={isProfileOpen}
            setIsProfileOpen={setIsProfileOpen}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
