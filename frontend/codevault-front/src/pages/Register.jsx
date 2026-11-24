
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { Code2, User, Mail, Lock } from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const response = await API.post("/auth/register", formData);

      setMessage(response.data.message);
      navigate("/login");

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed px-4 py-10"
      style={{
        backgroundImage: "url('/dev-background.png')"
      }}
    >
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/60 bg-yellow-300 p-8 shadow-2xl">

        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-black">
            <Code2 size={30} className="text-yellow-300" />
          </div>

          <h1 className="text-3xl font-bold text-black">
            Yellow<span className="text-red-500">Byte</span>
          </h1>

          <h2 className="mt-4 text-xl font-semibold text-black">
            Create Your Account
          </h2>

          <p className="mt-2 text-sm text-red-500">
            Start organizing your developer knowledge.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="mb-2 block text-md font-medium text-black">
              Username
            </label>

            <div className="flex items-center rounded-lg border border-slate-700 bg-black px-3 focus-within:border-black">
              <User size={18} className="text-white" />

              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full bg-transparent px-3 py-3 text-white outline-none placeholder:text-white"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-md font-medium text-black">
              Email Address
            </label>

            <div className="flex items-center rounded-lg border border-slate-700 bg-black px-3 focus-within:border-black">
              <Mail size={18} className="text-white" />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent px-3 py-3 text-white outline-none placeholder:text-white"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-md font-medium text-black">
              Password
            </label>

            <div className="flex items-center rounded-lg border border-slate-700 bg-black px-3 focus-within:border-black">
              <Lock size={18} className="text-white" />

              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full bg-transparent px-3 py-3 text-white outline-none placeholder:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-red-700 py-3 font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-red-400">
            {message}
          </p>
        )}

        <div className="mt-6 border-t border-slate-800 pt-5 text-center">
          <p className="text-md text-black">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-red-700 hover:text-black"
            >
              Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Register;
