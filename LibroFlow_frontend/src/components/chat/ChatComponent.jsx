import React, { useEffect, useRef, useState } from "react";
import SideBar from "../../components/side-bar/SideBar";
import AdminHeader from "../../components/header/AdminHeader";
import { useNavigate } from "react-router-dom";
import { Send, MessageSquare, Info, ChevronLeft, Loader2 } from "lucide-react";

const ChatComponent = ({
  usernameBook,
  userData,
  setUserData,
  messages,
  user,
  sendPrivateMessage,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-900">
      <SideBar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col">
        <AdminHeader
          setIsSidebarOpen={setIsSidebarOpen}
          children={
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/")}
                className="text-gray-400 hover:text-indigo-600 transition-colors"
              >
                Library
              </button>
              <span className="text-gray-300">/</span>
              <span className="font-semibold text-gray-800 truncate max-w-[200px]">
                Chat with {usernameBook}
              </span>
            </div>
          }
        />

        <main className="flex-1 p-6 md:p-10 flex flex-col">
          {!userData.connected ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
              <p className="text-gray-500 font-medium tracking-wide">
                Synchronizing messages...
              </p>
            </div>
          ) : (
            <div className="bg-white absolute right-5 left-5 top-22 bottom-0  rounded-3xl shadow-sm border border-gray-100 flex flex-col flex-1 overflow-hidden">
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {usernameBook?.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 leading-none mb-0.5">
                      {usernameBook}
                    </h3>
                    <p className="text-xs text-green-500 font-medium">Online</p>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-gray-50 rounded-xl transition-all">
                  <Info size={18} />
                </button>
              </div>

              {/* Messages */}
              <div className="overflow-y-auto flex-col h-100 p-6 space-y-4 bg-gray-50/40">
                {messages && messages.length !== 0 ? (
                  messages.map((msg, index) => {
                    const isSelf = msg.senderName === user.sub;
                    return (
                      <div
                        key={index}
                        className={`flex ${isSelf ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[75%] px-5 py-3 rounded-2xl text-sm font-medium shadow-sm ${
                            isSelf
                              ? "bg-indigo-600 text-white rounded-br-sm"
                              : "bg-white text-gray-700 border border-gray-100 rounded-bl-sm"
                          }`}
                        >
                          {msg.message}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-16 space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center">
                      <MessageSquare className="w-7 h-7 text-indigo-400" />
                    </div>
                    <div className="text-center space-y-1">
                      <p className="font-semibold text-gray-700">
                        No messages yet
                      </p>
                      <p className="text-sm text-gray-400">
                        Say hi to{" "}
                        <span className="text-indigo-500 font-medium">
                          {usernameBook}
                        </span>{" "}
                        👋
                      </p>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-5 border-t   border-gray-100 bg-white">
                <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100 focus-within:border-indigo-200 focus-within:ring-4 focus-within:ring-indigo-500/5 transition-all">
                  <input
                    type="text"
                    className="flex-1 bg-transparent py-2 text-sm font-medium outline-none placeholder:text-gray-400"
                    placeholder="Type your message here..."
                    value={userData.message}
                    onChange={(e) =>
                      setUserData({ ...userData, message: e.target.value })
                    }
                    onKeyDown={(e) => e.key === "Enter" && sendPrivateMessage()}
                  />
                  <button
                    onClick={sendPrivateMessage}
                    disabled={!userData.connected || !userData.message.trim()}
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 text-white p-2.5 rounded-xl transition-all shadow-md shadow-indigo-100 disabled:shadow-none active:scale-95"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ChatComponent;
