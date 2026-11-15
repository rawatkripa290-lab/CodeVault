
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { Code2, Lock, Mail } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

      const response = await API.post("/auth/login", formData);

      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-10">

      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-blue-300 p-8 shadow-2xl">

        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-800/10">
            <Code2 size={30} className="text-blue-800" />
          </div>

          <h1 className="text-3xl font-bold text-blue-900">
            Code<span className="text-blue-500">Vault</span>
          </h1>

          <h2 className="mt-4 text-xl font-semibold text-black">
            Welcome Back!
          </h2>

          <p className="mt-2 text-sm text-slate-700">
            Login to access your developer knowledge.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-medium text-black">
              Email Address
            </label>

            <div className="flex items-center rounded-lg border border-blue-400 bg-blue-800 px-3 focus-within:border-sky-800">
              <Mail size={18} className="text-black" />

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
            <label className="mb-2 block text-sm font-medium text-black">
              Password
            </label>

            <div className="flex items-center rounded-lg border border-blue-400 bg-slate-800 px-3 focus-within:border-blue-500">
              <Lock size={18} className="text-slate-400" />

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-transparent px-3 py-3 text-white outline-none placeholder:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-700 py-3 font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login to CodeVault"}
          </button>

        </form>

        {message && (
          <p className="mt-4 rounded-lg bg-red-500/10 p-3 text-center text-sm text-red-400">
            {message}
          </p>
        )}

        <div className="mt-6 border-t border-slate-800 pt-5 text-center">
          <p className="text-sm text-blue-700">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-black hover:text-blue-800"
            >
              Create Account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;
