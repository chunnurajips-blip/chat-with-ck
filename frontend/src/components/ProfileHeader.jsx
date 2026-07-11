import { useState, useRef } from "react";

import { Power, VolumeOffIcon, Volume2Icon, Camera } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader({ onOpenProfile }) {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="relative overflow-hidden border-b border-slate-700/40 bg-slate-900/80 backdrop-blur-xl">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-purple-500/10"></div>

      <div className="relative flex items-center justify-between px-6 py-3">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-cyan-500/30 blur-lg"></div>

            <button
              onClick={() => fileInputRef.current.click()}
              className="relative group size-12 rounded-full overflow-hidden border-2 border-cyan-400 shadow-lg"
            >
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="User image"
                className="size-full object-cover transition duration-300 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                <Camera className="size-4 text-white" />
              </div>
            </button>

            {/* Online Badge */}
            <span className="absolute bottom-1 right-1 size-4 rounded-full bg-green-400 border-2 border-slate-900 animate-pulse"></span>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* User Info */}
          <div>
            <h3
              onClick={onOpenProfile}
              className="text-base font-semibold text-white max-w-[180px] truncate cursor-pointer hover:text-cyan-400 transition-colors duration-200"
            >
              {authUser.fullName}
            </h3>

            <div className="flex items-center gap-2 mt-1">
              <span className="size-2 rounded-full bg-green-400 animate-pulse"></span>

              <p className="text-xs text-emerald-400 font-medium">Active now</p>
            </div>

            {authUser.email && (
              <p className="text-xs text-slate-400 mt-1 truncate max-w-[220px]">
                {authUser.email}
              </p>
            )}
          </div>
        </div>

        {/* RIGHT BUTTONS */}
        <div className="flex items-center gap-3">
          {/* Sound */}
          <button
            onClick={() => {
              mouseClickSound.currentTime = 0;
              mouseClickSound
                .play()
                .catch((error) => console.log("Audio play failed:", error));

              toggleSound();
            }}
            className="size-8 rounded-xl bg-slate-800/70 border border-slate-700 text-slate-300 hover:bg-cyan-500/20 hover:text-cyan-300 hover:border-cyan-500 transition-all duration-300 hover:scale-105 flex items-center justify-center"
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-5" />
            ) : (
              <VolumeOffIcon className="size-5" />
            )}
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="size-11 rounded-xl bg-slate-800/70 border border-slate-700 text-slate-300 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500 transition-all duration-300 hover:scale-105 flex items-center justify-center"
          >
            <Power className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProfileHeader;
