
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
    "w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelStyle =
    "mb-2 block text-sm font-medium text-slate-700";

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-8">

      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8 flex items-center gap-3">

          <Link
            to="/dashboard"
            className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 transition hover:bg-slate-50"
          >
            <ArrowLeft size={20} />
          </Link>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Add Knowledge
            </h1>

            <p className="text-sm text-slate-500">
              Save something new to your developer library.
            </p>
          </div>

        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          <div className="mb-7 flex items-center gap-3 border-b border-slate-100 pb-5">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <Code2 size={25} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Knowledge Details
              </h2>

              <p className="text-sm text-slate-500">
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
  <div className="space-y-2">
    <h3 className="text-sm font-semibold text-slate-700">
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

              <p className="mt-2 text-xs text-slate-400">
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
              <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {message}
              </p>
            )}

            {/* Submit */}
            <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row">

              <button
                type="submit"
                disabled={loading}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save size={18} />
                {loading ? "Saving..." : "Save Knowledge"}
              </button>

              <Link
                to="/dashboard"
                className="rounded-lg border border-slate-200 px-5 py-3 text-center font-medium text-slate-600 transition hover:bg-slate-50"
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
