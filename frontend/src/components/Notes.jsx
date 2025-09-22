import React, { useState } from "react";

const NotesAndChat = () => {
  const [activeTab, setActiveTab] = useState("notes");

  // Notes state
  const [myNotes, setMyNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");

  const handleAddNote = () => {
    if (noteInput.trim() === "") return;
    setMyNotes([...myNotes, { text: noteInput, sender: "Me" }]);
    setNoteInput("");
  };

  const handleSendToBuddy = (note) => {
    alert(`Note sent to your buddy: "${note.text}"`);
  };

  // Chat state
  const [messages, setMessages] = useState([
    { sender: "Buddy", text: "Hey! When is your trip starting?" },
  ]);
  const [chatInput, setChatInput] = useState("");

  const handleSendMessage = () => {
    if (chatInput.trim() === "") return;
    const newMsg = { sender: "Me", text: chatInput };
    setMessages([...messages, newMsg]);

    // Fake buddy reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "Buddy", text: "Got your message 👍" },
      ]);
    }, 1000);

    setChatInput("");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">
        ✈️ Travel Buddy Notes & Chat
      </h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("notes")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            activeTab === "notes" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          📝 Notes
        </button>
        <button
          onClick={() => setActiveTab("chat")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            activeTab === "chat" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          💬 Chat
        </button>
      </div>

      {/* Notes Section */}
      {activeTab === "notes" && (
        <div className="w-full max-w-lg">
          {/* Input */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="Write your travel note..."
              className="flex-1 p-2 border rounded-lg shadow-sm"
            />
            <button
              onClick={handleAddNote}
              className="bg-blue-600 text-white px-4 rounded-lg"
            >
              Add
            </button>
          </div>

          {/* Notes list */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              My Notes
            </h3>
            {myNotes.length > 0 ? (
              <ul className="space-y-2">
                {myNotes.map((note, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-gray-100 p-2 rounded-lg"
                  >
                    <span>{note.text}</span>
                    <button
                      onClick={() => handleSendToBuddy(note)}
                      className="text-sm bg-green-500 text-white px-2 py-1 rounded-lg"
                    >
                      Send
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No notes added yet.</p>
            )}
          </div>
        </div>
      )}

      {/* Chat Section */}
      {activeTab === "chat" && (
        <div className="w-full max-w-lg bg-white shadow-md rounded-xl flex flex-col h-[400px]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-xs ${
                  msg.sender === "Me"
                    ? "bg-blue-500 text-white self-end ml-auto"
                    : "bg-gray-200 text-gray-800 self-start"
                }`}
              >
                <strong>{msg.sender}: </strong> {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex p-2 border-t">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded-lg"
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 bg-blue-600 text-white px-4 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesAndChat;
