import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

function ChatContainer({ onOpenProfile }) {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();

    // clean up
    return () => unsubscribeFromMessages();
  }, [
    selectedUser,
    getMessagesByUserId,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <ChatHeader onOpenProfile={onOpenProfile} />

      <div className="relative flex-1 min-w-0 overflow-x-hidden overflow-y-auto bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Background Glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl"></div>
        </div>

        <div className="relative px-4 sm:px-6 py-8">
          {messages.length > 0 && !isMessagesLoading ? (
            <div className="w-full max-w-4xl mx-auto space-y-5">
              {messages.map((msg) => {
                const isMe = msg.senderId === authUser._id;

                return (
                  <div
                    key={msg._id}
                    className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`className="group w-fit max-w-[75%] lg:max-w-[65%] transition-all duration-300`}
                    >
                      {/* Avatar + Message */}
                      <div
                        className={`flex items-end gap-3 ${
                          isMe ? "flex-row-reverse" : ""
                        }`}
                      >
                        {/* Avatar */}
                        <img
                          src={
                            isMe
                              ? authUser.profilePic || "/avatar.png"
                              : selectedUser.profilePic || "/avatar.png"
                          }
                          alt="avatar"
                          className="size-10 rounded-full border border-slate-700 object-cover shadow-lg"
                        />

                        {/* Bubble */}
                        <div
                          className={`relative rounded-3xl px-5 py-3 shadow-xl transition-all duration-300 group-hover:scale-[1.02]
                        ${
                          isMe
                            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-md"
                            : "bg-slate-800/90 backdrop-blur border border-slate-700 text-slate-100 rounded-bl-md"
                        }`}
                        >
                          {msg.image && (
                            <img
                              src={msg.image}
                              alt="Shared"
                              className="mb-3 rounded-2xl max-h-72 w-full object-cover shadow-lg"
                            />
                          )}

                          {msg.text && (
                            <p className="whitespace-pre-wrap break-words leading-relaxed">
                              {msg.text}
                            </p>
                          )}

                          <div
                            className={`mt-2 flex items-center text-[11px] ${
                              isMe
                                ? "justify-end text-cyan-100"
                                : "justify-end text-slate-400"
                            }`}
                          >
                            {new Date(msg.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div ref={messageEndRef} />
            </div>
          ) : isMessagesLoading ? (
            <MessagesLoadingSkeleton />
          ) : (
            <div className="flex h-full items-center justify-center">
              <NoChatHistoryPlaceholder name={selectedUser.fullName} />
            </div>
          )}
        </div>
      </div>

      <MessageInput />
    </>
  );
}

export default ChatContainer;
