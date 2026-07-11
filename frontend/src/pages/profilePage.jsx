import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MoreVertical,
  Mail,
  Phone,
  CalendarDays,
  Power,
  CirclePower,
  Info,
  ImageIcon,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const ProfilePage = ({ onBack, onOpenSettings }) => {
  const { authUser, logout } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);

  const memberSince = authUser?.createdAt
    ? new Date(authUser.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Recently";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* ================= Header ================= */}

      <div className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/70 border-b border-slate-800">
        <div className="max-w-4xl mx-auto h-16 flex items-center justify-between px-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 hover:text-cyan-400 transition"
          >
            <ArrowLeft size={22} />
            <span className="font-medium">Profile</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-full hover:bg-slate-800 transition"
            >
              <MoreVertical size={20} />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden z-50">
                <button
                  className="w-full px-4 py-3 text-left hover:bg-slate-800 transition"
                  onClick={() => {
                    console.log("Edit Profile");
                    setShowMenu(false);
                  }}
                >
                  ✏️ Edit Profile
                </button>

                <button
                  className="w-full px-4 py-3 text-left hover:bg-slate-800 transition"
                  onClick={() => {
                    setShowMenu(false);
                    onOpenSettings();
                  }}
                >
                  ⚙️ Settings
                </button>

                <button
                  className="w-full px-4 py-3 text-left text-red-400 hover:bg-red-500/20 transition"
                  onClick={() => {
                    logout();
                    setShowMenu(false);
                  }}
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= Body ================= */}

      <div className="max-w-3xl mx-auto py-10 px-5">
        {/* ================= Avatar ================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: -30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="flex flex-col items-center"
        >
          <div className="relative">
            <div
              className="
              w-40
              h-40
              rounded-full
              bg-gradient-to-r
              from-cyan-400
              via-indigo-500
              to-purple-500
              p-1
            "
            >
              <img
                src={
                  authUser?.profilePic ||
                  `https://ui-avatars.com/api/?name=${authUser?.fullName}`
                }
                alt="profile"
                className="w-full h-full rounded-full object-cover bg-slate-800"
              />
            </div>

            <span
              className="
                absolute
                bottom-3
                right-3
                w-6
                h-6
                rounded-full
                bg-green-500
                border-4
                border-slate-950
              "
            />
          </div>

          <h1 className="text-3xl font-bold mt-6">{authUser?.fullName}</h1>

          <p className="text-cyan-400 mt-1">
            @{authUser?.username || "username"}
          </p>

          <div className="mt-2 text-green-400 text-sm">● Online</div>
        </motion.div>

        {/* ================= About ================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
          }}
          className="
          mt-10
          bg-slate-900/70
          rounded-3xl
          border
          border-slate-800
          p-6
          backdrop-blur-xl
        "
        >
          <div className="flex items-center gap-3">
            <Info className="text-cyan-400" />

            <h2 className="font-semibold text-lg">About</h2>
          </div>

          <p className="text-slate-300 mt-4 leading-7">
            {authUser?.about ||
              "Building awesome chat applications with React, Tailwind CSS and modern UI."}
          </p>
        </motion.div>

        {/* ================= Information ================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
          }}
          className="
          mt-6
          bg-slate-900/70
          rounded-3xl
          border
          border-slate-800
          overflow-hidden
        "
        >
          {/* Email */}

          <div className="flex items-center gap-4 p-6 border-b border-slate-800">
            <Mail className="text-cyan-400" />

            <div>
              <p className="text-sm text-slate-400">Email</p>

              <p className="font-medium">{authUser?.email}</p>
            </div>
          </div>

          {/* Phone */}

          <div className="flex items-center gap-4 p-6 border-b border-slate-800">
            <Phone className="text-cyan-400" />

            <div>
              <p className="text-sm text-slate-400">Phone</p>

              <p>{authUser?.phone || "Not Added"}</p>
            </div>
          </div>

          {/* Member */}

          <div className="flex items-center gap-4 p-6">
            <CalendarDays className="text-cyan-400" />

            <div>
              <p className="text-sm text-slate-400">Member Since</p>

              <p>{memberSince}</p>
            </div>
          </div>
        </motion.div>

        {/* ================= Shared Media ================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
          }}
          className="
          mt-6
          bg-slate-900/70
          rounded-3xl
          border
          border-slate-800
          p-6
        "
        >
          <div className="flex items-center gap-3 mb-5">
            <ImageIcon className="text-cyan-400" />

            <h2 className="font-semibold">Shared Media</h2>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="
                h-28
                rounded-xl
                bg-slate-800
                flex
                items-center
                justify-center
                hover:bg-slate-700
                transition
                cursor-pointer
              "
              >
                <ImageIcon className="text-slate-500" size={30} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* ================= Danger Zone ================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.4,
          }}
          className="
          mt-8
          border
          border-red-500/20
          bg-red-500/5
          rounded-3xl
          p-6
        "
        >
          <h2 className="text-red-400 font-semibold text-lg">Danger Zone</h2>

          <p className="text-slate-400 mt-2 mb-6">
            Logging out will end your current session.
          </p>

          <button
            onClick={logout}
            className="
            w-full
            h-12
            rounded-xl
            border
            border-red-500
            text-red-400
            hover:bg-red-500
            hover:text-white
            transition
            flex
            items-center
            justify-center
            gap-3
          "
          >
            <CirclePower size={20} />
            Logout
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
