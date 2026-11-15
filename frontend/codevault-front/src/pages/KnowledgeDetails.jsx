
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { Pencil, Trash2 } from "lucide-react";
import {
  ArrowLeft,
  Code2,
  Calendar,
  Tag,
  Folder,
  FileText,
  ExternalLink,
  Loader2
} from "lucide-react";

function KnowledgeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [knowledge, setKnowledge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchKnowledge() {
      try {
        const response = await API.get("/knowledge");

        const records = response.data.knowledge || [];
        const selectedKnowledge = records.find(
          item => item._id === id
        );

        if (!selectedKnowledge) {
          setError("Knowledge record not found.");
          return;
        }

        setKnowledge(selectedKnowledge);

      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        setError("Unable to load knowledge details.");
      } finally {
        setLoading(false);
      }
    }

    fetchKnowledge();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="flex items-center gap-3 text-slate-500">
          <Loader2 className="animate-spin" />
          Loading knowledge...
        </div>
      </div>
    );
  }

  if (error || !knowledge) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100 px-4">
        <p className="mb-4 text-red-600">
          {error || "Knowledge not found."}
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }
async function handleDelete() {
  const confirmed = window.confirm(
    "Are you sure you want to delete this knowledge?"
  );

  if (!confirmed) return;

  try {
    await API.delete(`/knowledge/${id}`);
    navigate("/dashboard");
  } catch (error) {
    setError(
      error.response?.data?.message || "Unable to delete knowledge."
    );
  }
}
  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-8">

      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Title Section */}
          <div className="border-b border-slate-100 p-6 sm:p-8">

            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold capitalize text-blue-600">
                {knowledge.type}
              </span>

              {knowledge.language && (
                <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-600">
                  {knowledge.language}
                </span>
              )}
            </div>

            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              {knowledge.title}
            </h1>

            <p className="mt-3 leading-7 text-slate-500">
              {knowledge.description || "No description available."}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">

  <button
    onClick={() => navigate(`/knowledge/${id}/edit`)}
    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
  >
    <Pencil size={16} />
    Edit Knowledge
  </button>

  <button
    onClick={handleDelete}
    className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
  >
    <Trash2 size={16} />
    Delete
  </button>

</div>

          </div>

          {/* Metadata */}
          <div className="grid grid-cols-1 gap-4 border-b border-slate-100 bg-slate-50 p-6 sm:grid-cols-2">

            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                <Folder size={18} />
              </div>

              <div>
                <p className="text-xs text-slate-400">Category</p>
                <p className="font-medium text-slate-700">
                  {knowledge.category || "Uncategorized"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-2 text-green-600">
                <Calendar size={18} />
              </div>

              <div>
                <p className="text-xs text-slate-400">Created On</p>
                <p className="font-medium text-slate-700">
                  {new Date(knowledge.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">

            <div className="mb-4 flex items-center gap-2">
              <FileText size={20} className="text-blue-600" />
              <h2 className="text-lg font-semibold text-slate-900">
                Knowledge Content
              </h2>
            </div>

            <div className="min-h-40 overflow-x-auto whitespace-pre-wrap break-words rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-sm leading-7 text-slate-700">
              {knowledge.content || "No content has been added."}
            </div>

          </div>

          {/* Tags */}
          <div className="border-t border-slate-100 p-6 sm:p-8">

            <div className="mb-4 flex items-center gap-2">
              <Tag size={19} className="text-blue-600" />
              <h2 className="font-semibold text-slate-900">
                Tags
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {knowledge.tags?.length > 0 ? (
                knowledge.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600"
                  >
                    #{tag}
                  </span>
                ))
              ) : (
                <p className="text-sm text-slate-400">
                  No tags available.
                </p>
              )}
            </div>

            {/* Resource URL */}
            {knowledge.url && (
              <a
                href={knowledge.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Open Resource
                <ExternalLink size={16} />
              </a>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

export default KnowledgeDetails;
