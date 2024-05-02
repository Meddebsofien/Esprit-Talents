import React, { useState, useEffect } from "react";
import "./chatSocket.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBTypography,
  MDBBtn,
  MDBIcon,
  MDBTextArea,
} from "mdb-react-ui-kit";
import io from "socket.io-client";

export default function App() {
  const [studentUsers, setStudentUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    fetchStudentUsers();
    initializeSocket();
    fetchAllMessages();
  }, []);

  const fetchStudentUsers = async () => {
    try {
      const response = await fetch("http://localhost:3700/users/users/Student");
      if (response.ok) {
        const data = await response.json();
        setStudentUsers(data);
      } else {
        console.error("Failed to fetch student users");
      }
    } catch (error) {
      console.error("Error fetching student users:", error);
    }
  };

  const fetchSenderInfo = async (senderId) => {
    try {
      const response = await fetch(`http://localhost:3700/users/getutilisateur/${senderId}`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Failed to fetch sender information");
        return null;
      }
    } catch (error) {
      console.error("Error fetching sender information:", error);
      return null;
    }
  };

  const fetchAllMessages = async () => {
    try {
      const response = await fetch("http://localhost:3700/messages/all");
      if (response.ok) {
        const messages = await response.json();
        const messagesWithSenderInfo = await Promise.all(messages.map(async (message) => {
          if (message.senderId) {
            const senderInfo = await fetchSenderInfo(message.senderId._id);
            return { ...message, senderInfo };
          } else {
            return message;
          }
        }));
        setMessages(messagesWithSenderInfo);
      } else {
        console.error("Failed to fetch messages");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  

 // Inside initializeSocket function
const initializeSocket = () => {
  const newSocket = io("http://localhost:3001");
  newSocket.on("connect", () => {
    console.log("Connected to server");
  });
  newSocket.on("message", (message) => {
    console.log("Received message:", message); // Add this log
    // Check if the sender info is available
    if (message.senderId) {
      // Fetch sender info and update messages state
      fetchSenderInfo(message.senderId._id).then(senderInfo => {
        if (senderInfo) {
          setMessages(prevMessages => [...prevMessages, { ...message, senderInfo }]);
        } else {
          setMessages(prevMessages => [...prevMessages, message]);
        }
      });
    } else {
      // If sender info is not available, simply update messages state
      setMessages(prevMessages => [...prevMessages, message]);
    }
  });
  setSocket(newSocket);
};

const handleSendMessage = async () => {
  if (!socket || !messageInput.trim()) return;

  // Extract user ID from the URL path
  const url = window.location.pathname;
  const parts = url.split("/");
  const userId = parts[parts.length - 1]; // Assuming user ID is the last part of the path

  if (!userId) {
    console.error("User ID not available");
    return;
  }

  const message = {
    senderId: userId,
    content: messageInput.trim(),
    time: new Date().toLocaleTimeString(),
  };

  try {
    const response = await fetch("http://localhost:3700/messages/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    if (response.ok) {
      console.log("Message sent successfully");
      socket.emit("message", message);
      setMessageInput("");
    } else {
      console.error("Failed to send message");
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
};


  return (
    <MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }}>
      <MDBRow>
        <MDBCol md="4">
          <h5 className="font-weight-bold mb-3 text-center text-lg-start">
            Users who are students
          </h5>
          <MDBCard>
            <MDBCardBody>
              <MDBTypography listUnStyled className="mb-0">
                {studentUsers.map((user) => (
                  <li
                    key={user._id}
                    className="p-2 border-bottom"
                    style={{ backgroundColor: "#eee" }}
                  >
                    <a href="#!" className="d-flex justify-content-between">
                      <div className="d-flex flex-row">
                        <img
                          src={
                            user.photo.startsWith("http")
                              ? user.photo
                              : `http://localhost:3700/${user.photo}`
                          }
                          alt="avatar"
                          className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                          width="60"
                        />
                        <div className="pt-1">
                          <p className="fw-bold mb-0">{user.nom}</p>
                          <p className="small text-muted">{user.specialite}</p>
                        </div>
                      </div>
                      <div className="pt-1">
                        <p className="small text-muted mb-1">Just now</p>
                        <span className="badge bg-danger float-end">1</span>
                      </div>
                    </a>
                  </li>
                ))}
              </MDBTypography>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md="8">
          <MDBTypography listUnStyled>
            <ul>
              {messages.map((message, index) => (
                <li key={index}>
                  <MDBCard
                    className={`mb-2 ${
                      message.senderInfo ? "bg-info" : "bg-light"
                    }`}
                  >
                    <MDBCardBody>
                      <p className="fw-bold mb-0">
                        {message.senderInfo ? message.senderInfo.nom : "Sender"}
                      </p>
                      <p className="small text-muted mb-1">{message.time}</p>
                      <p className="mb-0">{message.content}</p>
                    </MDBCardBody>
                  </MDBCard>
                </li>
              ))}
            </ul>
            <li className="bg-white mb-3">
              <MDBTextArea
                label="Message"
                id="textAreaExample"
                rows={4}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
            </li>
            <MDBBtn color="info" rounded className="float-end" onClick={handleSendMessage}>
              Send
            </MDBBtn>
          </MDBTypography>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
