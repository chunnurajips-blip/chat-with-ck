import { Navigate } from "react-router";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import {
  MessageCircleIcon,
  MailIcon,
  LoaderIcon,
  LockIcon,
} from "lucide-react";
import { Link } from "react-router";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await login(formData);

    if (success) {
      Navigate("/chat");
    }
  };
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-5 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-20 w-96 h-96 bg-cyan-500/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-20 w-96 h-96 bg-blue-500/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative w-full max-w-7xl min-h-[750px]">
        <BorderAnimatedContainer>
          <div className="relative overflow-hidden rounded-3xl bg-slate-950/60 backdrop-blur-xl">
            {/* Decorative Blur */}
            <div className="absolute -top-32 -left-32 w-72 h-72 bg-cyan-500/10 rounded-full blur-[120px]" />
            <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-blue-600/10 rounded-full blur-[120px]" />

            <div className="relative flex flex-col md:flex-row">
              {/* LEFT */}
              <div className="md:w-1/2 flex items-center justify-center p-10 border-r border-cyan-500/10">
                <div className="w-full max-w-md">
                  {/* LOGO */}
                  <div className="flex justify-center mb-8">
                    <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shadow-[0_0_35px_rgba(6,182,212,0.35)]">
                      <MessageCircleIcon className="w-10 h-10 text-cyan-400" />
                    </div>
                  </div>

                  {/* Heading */}
                  <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-white tracking-wide">
                      Welcome Back
                    </h1>

                    <p className="text-slate-400 mt-3 leading-relaxed">
                      Sign in to continue chatting with your friends securely.
                    </p>
                  </div>

                  {/* FORM */}
                  <form onSubmit={handleSubmit} className="space-y-7">
                    {/* EMAIL */}
                    <div>
                      <label className="block text-slate-300 mb-3 font-medium">
                        Email Address
                      </label>

                      <div className="relative group">
                        <MailIcon className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-cyan-400 group-focus-within:text-white transition-all" />

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
                          className="w-full pl-14 pr-5 py-4 rounded-2xl bg-slate-900/70 border border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* PASSWORD */}
                    <div>
                      <label className="block text-slate-300 mb-3 font-medium">
                        Password
                      </label>

                      <div className="relative group">
                        <LockIcon className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-cyan-400 group-focus-within:text-white transition-all" />

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
                          className="w-full pl-14 pr-5 py-4 rounded-2xl bg-slate-900/70 border border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Forgot */}
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="text-cyan-400 text-sm hover:text-cyan-300 transition"
                      >
                        Forgot Password?
                      </button>
                    </div>

                    {/* BUTTON */}
                    <button
                      type="submit"
                      disabled={isLoggingIn}
                      className="w-full h-14 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 text-white font-bold text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(34,211,238,.45)] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isLoggingIn ? (
                        <LoaderIcon className="mx-auto h-6 w-6 animate-spin" />
                      ) : (
                        "Sign In"
                      )}
                    </button>
                  </form>

                  {/* Divider */}
                  <div className="flex items-center my-8">
                    <div className="flex-1 border-t border-slate-700" />
                    <span className="px-4 text-slate-500 text-sm">OR</span>
                    <div className="flex-1 border-t border-slate-700" />
                  </div>

                  {/* Signup */}
                  <div className="text-center">
                    <p className="text-slate-400">Don't have an account?</p>

                    <Link
                      to="/signup"
                      className="inline-block mt-3 text-cyan-400 font-semibold hover:text-cyan-300 transition"
                    >
                      Create New Account →
                    </Link>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="hidden md:flex md:w-1/2 relative items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-600/10" />

                <div className="relative text-center px-10">
                  <img
                    src="/login.png"
                    alt="Login Illustration"
                    className="w-[520px] mx-auto object-contain drop-shadow-[0_0_60px_rgba(34,211,238,.25)] hover:scale-105 transition duration-500"
                  />

                  <div className="mt-10">
                    <h2 className="text-3xl font-bold text-white">
                      Chat Without Limits
                    </h2>

                    <p className="mt-4 text-slate-400 leading-7">
                      Experience lightning-fast messaging with secure, real-time
                      conversations. Connect with friends from anywhere in the
                      world.
                    </p>

                    <div className="mt-8 flex justify-center gap-4 flex-wrap">
                      <div className="px-5 py-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                        🔒 End-to-End Secure
                      </div>

                      <div className="px-5 py-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                        ⚡ Lightning Fast
                      </div>

                      <div className="px-5 py-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                        🌎 Global Access
                      </div>
                    </div>
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

export default LoginPage;
