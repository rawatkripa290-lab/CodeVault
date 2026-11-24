
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import {
  Pencil,
  Trash2,
  ArrowLeft,
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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-yellow-50">
        <div className="flex items-center gap-3 font-medium text-black">
          <Loader2 className="animate-spin text-red-600" />
          Loading knowledge...
        </div>
      </div>
    );
  }

  if (error || !knowledge) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-yellow-50 px-4">
        <p className="mb-4 text-red-600">
          {error || "Knowledge not found."}
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-black"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-50 px-4 py-8 sm:px-8">

      <div className="w-full">

        {/* Header */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 flex items-center gap-2 rounded-lg border border-yellow-400 bg-yellow-300 px-4 py-2 text-xl font-semibold text-black transition hover:bg-black hover:text-yellow-300"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border-2 border-yellow-300 bg-white shadow-lg">

          {/* Title Section */}
          <div className="border-b border-yellow-200 p-6 sm:p-8">

            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-yellow-300 px-3 py-1 text-md font-bold capitalize text-black">
                {knowledge.type}
              </span>

              {knowledge.language && (
                <span className="rounded-full bg-black px-3 py-1 text-md font-semibold text-yellow-300">
                  {knowledge.language}
                </span>
              )}
            </div>

            <h1 className="text-2xl font-bold text-black sm:text-3xl">
              {knowledge.title}
            </h1>

            <p className="mt-3 leading-7 text-gray-600">
              {knowledge.description || "No description available."}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">

              <button
                onClick={() => navigate(`/knowledge/${id}/edit`)}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-xl font-semibold text-white transition hover:bg-black"
              >
                <Pencil size={16} />
                Edit Knowledge
              </button>

              <button
                onClick={handleDelete}
                className="flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 px-4 py-2.5 text-xl font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
              >
                <Trash2 size={16} />
                Delete
              </button>

            </div>

          </div>

          {/* Metadata */}
          <div className="grid grid-cols-1 gap-4 border-b border-yellow-200 bg-yellow-100 p-6 sm:grid-cols-2">

            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-black p-2 text-yellow-300">
                <Folder size={18} />
              </div>

              <div>
                <p className="text-md text-gray-500">Category</p>
                <p className="font-semibold text-black">
                  {knowledge.category || "Uncategorized"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-black p-2 text-yellow-300">
                <Calendar size={18} />
              </div>

              <div>
                <p className="text-md text-gray-500">Created On</p>
                <p className="font-semibold text-black">
                  {new Date(knowledge.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">

            <div className="mb-4 flex items-center gap-2">
              <FileText size={20} className="text-red-600" />
              <h2 className="text-xl font-bold text-black">
                Knowledge Content
              </h2>
            </div>

            <div className="min-h-40 overflow-x-auto whitespace-pre-wrap break-words rounded-xl border border-yellow-300 bg-yellow-50 p-5 font-mono text-md leading-7 text-black">
              {knowledge.content || "No content has been added."}
            </div>
          </div>

          {/* Tags */}
          <div className="border-t border-yellow-200 p-6 sm:p-8">

            <div className="mb-4 flex items-center gap-2">
              <Tag size={19} className="text-red-600" />
              <h2 className="font-bold text-black">
                Tags
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {knowledge.tags?.length > 0 ? (
                knowledge.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-lg border border-yellow-400 bg-yellow-300 px-3 py-2 text-md font-semibold text-black"
                  >
                    #{tag}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-500">
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
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-red-600 transition hover:text-black"
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
