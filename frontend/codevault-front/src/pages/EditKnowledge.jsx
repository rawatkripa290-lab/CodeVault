
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

function EditKnowledge() {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch existing knowledge
  useEffect(() => {
    async function fetchKnowledge() {
      try {
        const response = await API.get("/knowledge");

        const records = response.data.knowledge || [];
        const item = records.find(record => record._id === id);

        if (!item) {
          setMessage("Knowledge record not found.");
          return;
        }

        setFormData({
          title: item.title || "",
          description: item.description || "",
          type: item.type || "note",
          content: item.content || "",
          language: item.language || "",
          category: item.category || "",
          tags: item.tags?.join(", ") || "",
          url: item.url || ""
        });

      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setMessage("Unable to load knowledge.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchKnowledge();
  }, [id, navigate]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");

      const updatedData = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map(tag => tag.trim())
          .filter(tag => tag !== "")
      };

      await API.patch(`/knowledge/${id}`, updatedData);

      navigate(`/knowledge/${id}`);

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Unable to update knowledge."
      );
    } finally {
      setSaving(false);
    }
  }

  const inputStyle =
    "w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelStyle =
    "mb-2 block text-sm font-medium text-slate-700";

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <Loader2 className="animate-spin text-blue-600" />
        <span className="ml-3 text-slate-500">Loading...</span>
      </div>
    );
  }

  if (message && !formData.title) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100">
        <p className="mb-4 text-red-600">{message}</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-3xl">

        <button
          onClick={() => navigate(`/knowledge/${id}`)}
          className="mb-6 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-600 hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
          Back to Details
        </button>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          <h1 className="mb-2 text-2xl font-bold text-slate-900">
            Edit Knowledge
          </h1>

          <p className="mb-7 text-sm text-slate-500">
            Update your saved developer knowledge.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className={labelStyle}>Title *</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>

            <div>
              <label className={labelStyle}>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="2"
                className={inputStyle}
              />
            </div>

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

            <div>
              <label className={labelStyle}>Content</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows="8"
                className={`${inputStyle} font-mono text-sm`}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className={labelStyle}>Language</label>
                <input
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>Category</label>
                <input
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>
            </div>

            <div>
              <label className={labelStyle}>Tags</label>
              <input
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="arrays, searching, algorithms"
                className={inputStyle}
              />
              <p className="mt-2 text-xs text-slate-400">
                Separate tags with commas.
              </p>
            </div>

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

            {message && (
              <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              <Save size={18} />
              {saving ? "Updating..." : "Save Changes"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default EditKnowledge;
