import { Navigate } from "react-router";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import {
  MessageCircleIcon,
  LockIcon,
  MailIcon,
  UserIcon,
  LoaderIcon,
} from "lucide-react";
import { Link } from "react-router";

function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await signup(formData);

    if (success) {
      Navigate("/login");
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full max-w-7xl min-h-[750px]">
        <BorderAnimatedContainer>
          <div className="grid md:grid-cols-2 min-h-[750px] rounded-3xl overflow-hidden backdrop-blur-xl bg-white/5">
            {/* LEFT SIDE */}
            <div className="flex items-center justify-center px-8 py-12 lg:px-16">
              <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-10">
                  <div className="mx-auto flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 shadow-[0_0_40px_rgba(34,211,238,0.45)]">
                    <MessageCircleIcon className="w-10 h-10 text-white" />
                  </div>

                  <h1 className="mt-6 text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Create Account
                  </h1>

                  <p className="mt-3 text-slate-400">
                    Join thousands of users chatting securely around the world.
                  </p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* FULL NAME */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-300">
                      Full Name
                    </label>

                    <div className="relative">
                      <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />

                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            fullName: e.target.value,
                          })
                        }
                        placeholder="chunnu kumar"
                        className="w-full rounded-xl border border-slate-700 bg-slate-900/70 py-3 pl-12 pr-4 text-white placeholder:text-slate-500 outline-none transition duration-300 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20"
                      />
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-300">
                      Email
                    </label>

                    <div className="relative">
                      <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />

                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                        placeholder="chunnurajips@gmail.com"
                        className="w-full rounded-xl border border-slate-700 bg-slate-900/70 py-3 pl-12 pr-4 text-white placeholder:text-slate-500 outline-none transition duration-300 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20"
                      />
                    </div>
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-300">
                      Password
                    </label>

                    <div className="relative">
                      <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />

                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            password: e.target.value,
                          })
                        }
                        placeholder="Enter your password"
                        className="w-full rounded-xl border border-slate-700 bg-slate-900/70 py-3 pl-12 pr-4 text-white placeholder:text-slate-500 outline-none transition duration-300 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20"
                      />
                    </div>
                  </div>

                  {/* BUTTON */}
                  <button
                    type="submit"
                    disabled={isSigningUp}
                    className="w-full rounded-xl py-3 font-semibold text-white bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(34,211,238,0.45)] disabled:opacity-60 disabled:hover:scale-100"
                  >
                    {isSigningUp ? (
                      <div className="flex justify-center">
                        <LoaderIcon className="w-5 h-5 animate-spin" />
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>

                {/* LOGIN LINK */}
                <div className="mt-8 text-center">
                  <p className="text-slate-400">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-semibold text-cyan-400 hover:text-cyan-300 transition"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="hidden md:flex relative items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
              {/* Glow Effects */}
              <div className="absolute w-[420px] h-[420px] rounded-full bg-cyan-500/20 blur-[120px]" />

              <div className="absolute bottom-0 right-0 w-[320px] h-[320px] rounded-full bg-purple-500/20 blur-[120px]" />

              <div className="relative z-10 px-12">
                <img
                  src="/signup.png"
                  alt="Signup Illustration"
                  className="w-full max-w-lg object-contain drop-shadow-[0_0_50px_rgba(34,211,238,0.5)] hover:scale-105 transition duration-700"
                />

                <div className="mt-10 text-center">
                  <h2 className="text-3xl font-bold text-white">
                    Connect With Everyone
                  </h2>

                  <p className="mt-4 text-slate-400 leading-7">
                    Chat instantly with friends, collaborate securely and enjoy
                    a modern messaging experience built for speed and privacy.
                  </p>

                  <div className="mt-8 flex justify-center gap-4 flex-wrap">
                    <span className="px-5 py-2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      🔒 Secure
                    </span>

                    <span className="px-5 py-2 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      ⚡ Fast
                    </span>

                    <span className="px-5 py-2 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                      🌍 Global
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default SignUpPage;
