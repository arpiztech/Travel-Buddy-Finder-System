import React from "react";
import { FaPlane, FaBell, FaBookmark, FaCog, FaSearch } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { Slack } from "lucide-react"; // ✅ valid lucide-react icon
import DropboxLogo from "../assets/dropbox.png"; // or .svg if you have it
import AsanaLogo from "../assets/asana.png";     // or .svg if you have it

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-[#0B0B2B] text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#121236] p-6 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-3 rounded-full">
            <FaPlane size={20} />
          </div>
          <h1 className="text-lg font-bold">TRAVEL BUDDY FINDER</h1>
        </div>

        <nav className="flex flex-col gap-4 text-gray-300">
          <button className="flex items-center gap-3 p-2 rounded-lg bg-indigo-600 text-white">
            <FaPlane /> Destinations
          </button>
          <button className="flex items-center gap-3 hover:text-white">
            <FiMessageCircle /> Messages
          </button>
          <button className="flex items-center gap-3 hover:text-white">
            <FaBell /> Notifications
          </button>
          <button className="flex items-center gap-3 hover:text-white">
            <FaBookmark /> Saved Places
          </button>
          <button className="flex items-center gap-3 hover:text-white">
            <FaCog /> Settings
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">Hello, 👋</h2>
            <p className="text-gray-400">Welcome back!</p>
          </div>
          <div className="flex items-center gap-2 bg-[#121236] px-4 py-2 rounded-lg">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-gray-200"
            />
          </div>
        </div>

        {/* Popular Destinations & Calendar */}
        <div className="grid grid-cols-3 gap-6">
          {/* Popular Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Popular Destinations</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba"
                  alt="Iceland"
                  className="w-full h-40 object-cover"
                />
                <p className="absolute bottom-2 left-2 font-semibold">Iceland</p>
              </div>
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                  alt="Italy"
                  className="w-full h-40 object-cover"
                />
                <p className="absolute bottom-2 left-2 font-semibold">Italy</p>
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Upcoming Trips</h3>
            <div className="bg-[#121236] p-4 rounded-xl text-center">
              <p className="font-bold">July</p>
              <div className="grid grid-cols-7 gap-2 mt-3 text-sm text-gray-300">
                {Array.from({ length: 31 }, (_, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded-lg ${
                      i + 1 === 21 ? "bg-indigo-600 text-white" : ""
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Friends + Integrations */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Friends</h3>
            <div className="flex gap-3 mb-6">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                className="w-10 h-10 rounded-full border-2 border-green-500"
              />
              <img
                src="https://randomuser.me/api/portraits/women/45.jpg"
                className="w-10 h-10 rounded-full border-2 border-green-500"
              />
              <img
                src="https://randomuser.me/api/portraits/men/46.jpg"
                className="w-10 h-10 rounded-full border-2 border-green-500"
              />
            </div>

            <h3 className="text-lg font-semibold mb-3">Integrations</h3>
            <div className="flex flex-col gap-3 text-gray-300">
              <div className="flex items-center gap-2">
                <Slack size={20} /> Slack
              </div>
              <div className="flex items-center gap-2">
                <img src={AsanaLogo} alt="Asana" className="w-5 h-5" /> Asana
              </div>
              <div className="flex items-center gap-2">
                <img src={DropboxLogo} alt="Dropbox" className="w-5 h-5" /> Dropbox
              </div>
            </div>

            <h3 className="text-lg font-semibold mt-6">My Card</h3>
            <div className="bg-[#1D1D4F] p-4 rounded-xl mt-3">
              <p className="text-2xl font-bold">$3573.46</p>
              <p className="text-gray-400 mt-1">**** **** ****</p>
            </div>
          </div>
        </div>

        {/* Buddy Requests */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-4">Buddy Requests</h3>
          <div className="flex gap-6">
            {[
              { name: "Jamie", place: "Norway", likes: 12 },
              { name: "Lucas", place: "Bali", likes: 8 },
              { name: "Emma", place: "New Zealand", likes: 10 },
              { name: "Michael", place: "Greece", likes: 10 },
            ].map((buddy, i) => (
              <div
                key={i}
                className="bg-[#121236] p-4 rounded-xl text-center w-40"
              >
                <img
                  src={`https://randomuser.me/api/portraits/${
                    i % 2 === 0 ? "women" : "men"
                  }/${40 + i}.jpg`}
                  className="w-16 h-16 rounded-full mx-auto mb-3"
                />
                <p className="font-semibold">{buddy.name}</p>
                <p className="text-gray-400 text-sm">{buddy.place}</p>
                <p className="mt-2 text-indigo-400">💜 {buddy.likes}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
