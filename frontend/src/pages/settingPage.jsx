import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bell,
  Moon,
  Shield,
  Lock,
  Languages,
  HardDrive,
  HelpCircle,
  Info,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const SettingsPage = ({ onBack }) => {
  const { logout } = useAuthStore();

  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const Toggle = ({ value, onChange }) => (
    <button
      onClick={onChange}
      className={`relative w-12 h-7 rounded-full transition ${
        value ? "bg-cyan-500" : "bg-slate-700"
      }`}
    >
      <span
        className={`absolute top-1 w-5 h-5 rounded-full bg-white transition ${
          value ? "left-6" : "left-1"
        }`}
      />
    </button>
  );

  const SettingItem = ({
    icon,
    title,
    subtitle,
    right,
    danger = false,
    onClick,
  }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-5 border-b border-slate-800 hover:bg-slate-800/40 transition ${
        danger ? "text-red-400" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center ${
            danger ? "bg-red-500/10" : "bg-cyan-500/10 text-cyan-400"
          }`}
        >
          {icon}
        </div>

        <div className="text-left">
          <p className="font-medium">{title}</p>

          {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
        </div>
      </div>

      {right || <ChevronRight size={20} className="text-slate-500" />}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}

      <div className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/70 border-b border-slate-800">
        <div className="max-w-3xl mx-auto h-16 flex items-center px-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 hover:text-cyan-400 transition"
          >
            <ArrowLeft size={22} />
            <span className="font-medium text-lg">Settings</span>
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 py-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl overflow-hidden"
        >
          <SettingItem
            icon={<Bell size={22} />}
            title="Notifications"
            subtitle="Receive message notifications"
            right={
              <Toggle
                value={notifications}
                onChange={() => setNotifications(!notifications)}
              />
            }
          />

          <SettingItem
            icon={<Moon size={22} />}
            title="Dark Mode"
            subtitle="Dark appearance"
            right={
              <Toggle
                value={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
            }
          />

          <SettingItem
            icon={<Shield size={22} />}
            title="Privacy"
            subtitle="Manage profile visibility"
          />

          <SettingItem
            icon={<Lock size={22} />}
            title="Security"
            subtitle="Password & authentication"
          />

          <SettingItem
            icon={<Languages size={22} />}
            title="Language"
            subtitle="English"
          />

          <SettingItem
            icon={<HardDrive size={22} />}
            title="Storage"
            subtitle="Manage cache and media"
          />

          <SettingItem
            icon={<HelpCircle size={22} />}
            title="Help & Support"
            subtitle="FAQ and contact support"
          />

          <SettingItem
            icon={<Info size={22} />}
            title="About App"
            subtitle="Version 1.0.0"
          />

          <SettingItem
            danger
            icon={<LogOut size={22} />}
            title="Logout"
            subtitle="Sign out from your account"
            right={null}
            onClick={logout}
          />
        </motion.div>

        {/* Footer */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center text-slate-500 text-sm"
        >
          Chat Application
          <br />
          Made with ❤️ using React & Tailwind CSS
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;
