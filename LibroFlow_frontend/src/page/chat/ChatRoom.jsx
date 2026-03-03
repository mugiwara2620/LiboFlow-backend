import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { useAuth } from "../../contex/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import axios from "axios";
import ChatComponent from "../../components/chat/ChatComponent";

const ChatRoom = () => {
  const { usernameBook } = useParams(); // Partner's username
  const { user } = useAuth(); // Logged in user (contains .sub)

  const stompClient = useRef(null); // Ref persists across renders
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState({
    username: user?.sub || "",
    receivername: usernameBook,
    connected: false,
    message: "",
  });

  useEffect(() => {
    // Only connect if the user object and sub (username) are ready
    if (user?.sub) {
      connect();
    }
    // Cleanup: disconnect when leaving the page
    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect();
      }
    };
  }, [user]);

  const connect = () => {
    // 1. Create the socket
    const socket = new SockJS("http://localhost:8080/ws");
    const client = over(socket);

    // 2. Configure BEFORE connecting
    client.heartbeat.outgoing = 10000;
    client.heartbeat.incoming = 10000;

    // Optional: Turn off the annoying console debug logs
    // client.debug = () => {};

    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };

    // 3. Connect and assign to Ref ONLY in the success callback
    client.connect(
      headers,
      () => {
        // This is the SUCCESS callback (onConnected)
        stompClient.current = client; // Now it's safe to store in Ref
        setUserData((prev) => ({ ...prev, connected: true }));

        console.log("Connected as:", user.sub);

        // 4. Subscribe
        client.subscribe(`/user/${usernameBook}/private`, (payload) => {
          const payloadData = JSON.parse(payload.body);
          setMessages((prev) => [...prev, payloadData]);
        });
      },
      (err) => {
        // This is the ERROR callback
        console.error("Connection Error:", err);
        setUserData((prev) => ({ ...prev, connected: false }));
      },
    );
  };

  const sendPrivateMessage = async () => {
    // Ensure client is connected and message isn't just whitespace
    if (stompClient.current?.connected && userData.message.trim() !== "") {
      const chatMessage = {
        username: user.sub, // Matches 'username' in Java RequestBody
        recievername: usernameBook, // Matches 'recievername' in Java RequestBody
        message: userData.message,
      };

      try {
        // 1. Send via WebSocket
        stompClient.current.send(
          "/app/private-message",
          {},
          JSON.stringify(chatMessage),
        );

        // 2. Persist to Database
        // Important: Ensure backend Controller uses @RequestBody
        const headers = {
          Authorization: "Bearer " + localStorage.getItem("token"),
        };
        const re = await axiosInstance.post(
          "http://localhost:8080/api/v1/user/chat/one-to-one",
          chatMessage,
        );
        console.log(re);

        // 3. Update local UI
        fetchChatHistory();
        // 4. Clear input field
        setUserData({ ...userData, message: "" });
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };
  const fetchChatHistory = async () => {
    if (user?.sub && usernameBook) {
      try {
        // This matches your @GetMapping path exactly
        const response = await axiosInstance.get(
          `http://localhost:8080/api/v1/user/chat/${user.sub}/${usernameBook}`,
        );
        console.log(response.data.data);
        // Assuming your ApiResponse has the list in 'data'
        if (response.data && response.data.data) {
          setMessages(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, []); // Runs when the chat partner changes

  return (
    // <div className="chat-container">
    //   <div className="chat-header">
    //     Chatting with: <strong>{usernameBook}</strong>
    //   </div>

    //   <div className="chat-box">
    //     {userData.connected ? (
    //       <ul className="message-list">
    //         {messages.map((msg, index) => (
    //           <li
    //             key={index}
    //             // Check if the message sender matches current logged in user
    //             className={msg.senderName === user.sub ? "self" : "other"}
    //           >
    //             <div className="message-content">{msg.message}</div>
    //           </li>
    //         ))}
    //       </ul>
    //     ) : (
    //       <div className="loading-status">Connecting to chat server...</div>
    //     )}
    //   </div>

    //   <div className="input-area">
    //     <input
    //       type="text"
    //       placeholder="Type your message..."
    //       value={userData.message}
    //       onChange={(e) =>
    //         setUserData({ ...userData, message: e.target.value })
    //       }
    //       onKeyPress={(e) => e.key === "Enter" && sendPrivateMessage()}
    //     />
    //     <button onClick={sendPrivateMessage} disabled={!userData.connected}>
    //       Send
    //     </button>
    //   </div>
    // </div>
    <ChatComponent
      usernameBook={usernameBook} // The person you are talking to
      userData={userData} // Contains { connected: boolean, message: string }
      setUserData={setUserData} // State setter for the input field
      messages={messages} // The array of message objects
      user={user} // The logged-in user (for user.sub check)
      sendPrivateMessage={sendPrivateMessage} // The function to emit the message
    />
  );
};

export default ChatRoom;
