import { useState } from "react";

import { useChatStore } from "../store/useChatStore";

import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";
import ProfilePage from "./profilePage";
import SettingsPage from "./settingPage";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  if (showSettings) {
    return (
      <SettingsPage
        onBack={() => {
          setShowSettings(false);
          setShowProfile(true);
        }}
      />
    );
  }

  if (showProfile) {
    return (
      <ProfilePage
        onBack={() => setShowProfile(false)}
        onOpenSettings={() => {
          setShowProfile(false);
          setShowSettings(true);
        }}
      />
    );
  }
  return (
    <div className="relative w-full max-w-6xl h-[800px]">
      <BorderAnimatedContainer>
        {/* LEFT SIDE */}
        <div className="w-80 flex-shrink-0 bg-slate-800/50 backdrop-blur-sm flex flex-col border-r border-slate-700">
          <ProfileHeader onOpenProfile={() => setShowProfile(true)} />

          <ActiveTabSwitch />

          <div className="flex-1 min-w-0 flex flex-col bg-slate-900/50 backdrop-blur-sm overflow-hidden">
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
          {selectedUser ? (
            <ChatContainer onOpenProfile={() => setShowProfile(true)} />
          ) : (
            <NoConversationPlaceholder />
          )}
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}

export default ChatPage;
