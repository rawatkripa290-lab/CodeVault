
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { Code2, ArrowLeft, Save } from "lucide-react";
import CodeBlock from "../components/CodeBlock";

function AddKnowledge() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "note",
    content: "",
    language: "",
    category: "",
    tags: "",
    url: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

      const data = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map(tag => tag.trim())
          .filter(tag => tag !== "")
      };

      await API.post("/knowledge", data);

      navigate("/dashboard");

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Unable to save knowledge. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputStyle =
    "w-full rounded-lg border border-yellow-400 bg-yellow-50 px-4 py-3 text-black outline-none transition focus:border-red-600 focus:ring-2 focus:ring-yellow-200";

  const labelStyle =
    "mb-2 block text-sm font-semibold text-black";

  return (
    <div className="min-h-screen bg-yellow-50 px-4 py-8 sm:px-8">

      <div className="w-full">

        {/* Header */}
        <div className="mb-8 flex items-center gap-3">

          <Link
            to="/dashboard"
            className="rounded-lg border border-yellow-400 bg-yellow-300 p-2 text-black transition hover:bg-red-600 hover:text-white"
          >
            <ArrowLeft size={20} />
          </Link>

          <div>
            <h1 className="text-2xl font-extrabold text-black">
              Add Knowledge<span className="text-red-600">.</span>
            </h1>

            <p className="text-sm text-zinc-600">
              Save something new to your developer library.
            </p>
          </div>

        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-yellow-400 bg-white p-6 shadow-lg sm:p-8">

          <div className="mb-7 flex items-center gap-3 border-b border-yellow-200 pb-5">

            <div className="rounded-xl bg-black p-3 text-yellow-300">
              <Code2 size={25} />
            </div>

            <div>
              <h2 className="font-bold text-black">
                Knowledge Details
              </h2>

              <p className="text-sm text-zinc-500">
                Fill in the information below.
              </p>
            </div>

          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Title */}
            <div>
              <label className={labelStyle}>Title *</label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Binary Search"
                className={inputStyle}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className={labelStyle}>Description</label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a short description..."
                rows="2"
                className={inputStyle}
              />
            </div>

            {/* Type */}
            <div>
              <label className={labelStyle}>Knowledge Type *</label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={inputStyle}
                required
              >
                <option value="note">Note</option>
                <option value="snippet">Code Snippet</option>
                <option value="resource">Resource</option>
              </select>
            </div>

            {/* Content */}
            <div>
              <label className={labelStyle}>
                {formData.type === "snippet" ? "Code" : "Content"}
              </label>

              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder={
                  formData.type === "snippet"
                    ? "Paste your code here..."
                    : "Write your notes here..."
                }
                rows="7"
                className={`${inputStyle} font-mono text-sm`}
              />
            </div>

            {/* Live Code Preview */}
            {formData.type === "snippet" && formData.content.trim() && (
              <div className="space-y-2 rounded-xl border border-yellow-400 bg-yellow-50 p-4">

                <h3 className="text-sm font-bold text-black">
                  Code Preview
                </h3>

                <CodeBlock
                  code={formData.content}
                  language={formData.language || "javascript"}
                />

              </div>
            )}

            {/* Tags */}
            <div>
              <label className={labelStyle}>Tags</label>

              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="arrays, searching, algorithms"
                className={inputStyle}
              />

              <p className="mt-2 text-xs text-zinc-500">
                Separate multiple tags using commas.
              </p>
            </div>

            {/* Resource URL */}
            {formData.type === "resource" && (
              <div>
                <label className={labelStyle}>Resource URL</label>

                <input
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className={inputStyle}
                />
              </div>
            )}

            {/* Error Message */}
            {message && (
              <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                {message}
              </p>
            )}

            {/* Submit */}
            <div className="flex flex-col gap-3 border-t border-yellow-200 pt-5 sm:flex-row">

              <button
                type="submit"
                disabled={loading}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-bold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save size={18} />
                {loading ? "Saving..." : "Save Knowledge"}
              </button>

              <Link
                to="/dashboard"
                className="rounded-lg border border-yellow-400 bg-yellow-300 px-5 py-3 text-center font-semibold text-black transition hover:bg-black hover:text-yellow-300"
              >
                Cancel
              </Link>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AddKnowledge;
