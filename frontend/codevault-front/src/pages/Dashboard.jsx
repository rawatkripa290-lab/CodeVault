
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";
import {
  Code2,
  LayoutDashboard,
  BookOpen,
  FileCode,
  Bookmark,
  Search,
  LogOut,
  Plus,
  FolderOpen,
  Clock
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();

  const [knowledge, setKnowledge] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    fetchKnowledge();
  }, []);

  async function fetchKnowledge() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await API.get("/knowledge");
      setKnowledge(response.data.knowledge || []);

    } catch (error) {
      console.error("Error fetching knowledge:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  function handleViewKnowledge(id) {
    navigate(`/knowledge/${id}`);
  }

  const notes = knowledge.filter(item => item.type === "note").length;
  const snippets = knowledge.filter(item => item.type === "snippet").length;
  const resources = knowledge.filter(item => item.type === "resource").length;

  const stats = [
    {
      title: "Total Knowledge",
      count: knowledge.length,
      icon: BookOpen,
      color: "bg-yellow-300 text-black"
    },
    {
      title: "Notes",
      count: notes,
      icon: LayoutDashboard,
      color: "bg-red-100 text-red-700"
    },
    {
      title: "Code Snippets",
      count: snippets,
      icon: FileCode,
      color: "bg-zinc-200 text-black"
    },
    {
      title: "Resources",
      count: resources,
      icon: Bookmark,
      color: "bg-yellow-100 text-yellow-700"
    }
  ];

  const filteredKnowledge = knowledge
    .filter((item) => {
      const matchesSearch =
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase()) ||
        item.category?.toLowerCase().includes(search.toLowerCase()) ||
        item.tags?.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase())
        );

      const matchesType =
        selectedType === "all" || item.type === selectedType;

      const matchesLanguage =
        selectedLanguage === "all" ||
        item.language === selectedLanguage;

      const matchesCategory =
        selectedCategory === "all" ||
        item.category === selectedCategory;

      return matchesSearch && matchesType && matchesLanguage && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

  // Category-wise distribution
  const categoryData = Object.entries(
    knowledge.reduce((acc, item) => {
      const category = item.category || "Uncategorized";
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({
    name,
    value
  }));

  // Programming language distribution
  const languageData = Object.entries(
    knowledge.reduce((acc, item) => {
      if (item.type === "snippet" && item.language) {
        acc[item.language] = (acc[item.language] || 0) + 1;
      }
      return acc;
    }, {})
  ).map(([name, total]) => ({
    name,
    total
  }));

  // Recently updated knowledge
  const recentKnowledge = [...knowledge]
    .sort((a, b) => {
      const dateA = new Date(a.updatedAt || a.createdAt);
      const dateB = new Date(b.updatedAt || b.createdAt);
      return dateB - dateA;
    })
    .slice(0, 5);

  const chartColors = [
    "#eab308",
    "#dc2626",
    "#171717",
    "#ca8a04",
    "#991b1b",
    "#737373"
  ];

  return (
    <div className="min-h-screen bg-yellow-50 text-black">

      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-yellow-400/20 bg-black p-6 md:flex md:flex-col">

          <div className="mb-10 flex items-center gap-3">
            <div className="rounded-xl bg-yellow-300 p-2 text-black">
              <Code2 size={25} />
            </div>

            <h1 className="text-2xl font-bold text-yellow-300">
              Yellow<span className="text-white">Byte</span>
            </h1>
          </div>

          <p className="mb-3 text-xl font-semibold uppercase tracking-wider text-white">
            Workspace
          </p>

          <nav className="space-y-2">
            <button className="flex w-full items-center gap-3 rounded-lg bg-yellow-300 px-4 py-3 text-left font-semibold text-black">
              <LayoutDashboard size={19} />
              Dashboard
            </button>

            <button
              onClick={() => document.getElementById("knowledge-records")?.scrollIntoView({ behavior: "smooth" })}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-white transition hover:bg-yellow-300 hover:text-black"
            >
              <BookOpen size={19} />
              My Knowledge
            </button>

            <button
              onClick={() => document.getElementById("knowledge-filters")?.scrollIntoView({ behavior: "smooth" })}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-white transition hover:bg-yellow-300 hover:text-black"
            >
              <FolderOpen size={19} />
              Categories
            </button>
          </nav>

          <div className="mt-auto border-t border-yellow-400/20 pt-5">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-400 transition hover:bg-red-600 hover:text-white"
            >
              <LogOut size={19} />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1 p-5 sm:p-8">

          {/* Header */}
          <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>
              <h2 className="text-2xl font-extrabold text-black sm:text-3xl">
                Let's Start<span className="text-red-600">.</span>
              </h2>

              <p className="mt-1 text-sm text-zinc-600">
                Welcome back! Here's your knowledge overview.
              </p>
            </div>

            <button
              onClick={() => navigate("/add-knowledge")}
              className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-black"
            >
              <Plus size={19} />
              Add Knowledge
            </button>

          </header>

          {/* Statistics */}
          <section className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <div
                  key={index}
                  className="rounded-xl border border-yellow-300 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg "
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-zinc-500">
                        {stat.title}
                      </p>

                      <h3 className="mt-3 text-3xl font-extrabold text-black">
                        {stat.count}
                      </h3>
                    </div>

                    <div className={`rounded-xl p-3 ${stat.color}`}>
                      <Icon size={24} />
                    </div>
                  </div>
                </div>
              );
            })}

          </section>

          {/* Dashboard Analytics */}
          <section className="mb-8 grid grid-cols-1 gap-5 xl:grid-cols-2">

            {/* Category Distribution */}
            <div className="rounded-xl border border-yellow-400 bg-white p-5 shadow-sm">

              <h3 className="mb-1 text-2xl font-bold text-black">
                Category Distribution
              </h3>

              <p className="mb-4 text-xl text-zinc-900">
                Your knowledge across different categories
              </p>

              {categoryData.length === 0 ? (
                <p className="py-16 text-center text-zinc-400">
                  No category data available
                </p>
              ) : (
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      label
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={chartColors[index % chartColors.length]}
                        />
                      ))}
                    </Pie>

                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Programming Languages */}
            <div className="rounded-xl border border-yellow-400 bg-white p-5 shadow-sm">

              <h3 className="mb-1 text-2xl font-bold text-black">
                Programming Languages
              </h3>

              <p className="mb-4 text-xl text-zinc-900">
                Your saved code snippets by language
              </p>

              {languageData.length === 0 ? (
                <p className="py-16 text-center text-zinc-400">
                  No programming language data available
                </p>
              ) : (
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={languageData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12 }}
                    />

                    <YAxis allowDecimals={false} />

                    <Tooltip />

                    <Bar
                      dataKey="total"
                      fill="#dc2626"
                      radius={[6, 6, 0, 0]}
                    />

                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

          </section>

          {/* Recently Updated Knowledge */}
          <section className="mb-8 rounded-xl border border-yellow-400 bg-white p-5 shadow-sm">

            <div className="mb-5">
              <h3 className="text-xl font-bold text-black">
                Recently Updated
              </h3>

              <p className="text-sm text-zinc-600">
                Your latest knowledge updates
              </p>
            </div>

            {recentKnowledge.length === 0 ? (
              <p className="py-8 text-center text-zinc-400">
                No knowledge available
              </p>
            ) : (
              <div className="space-y-4">

                {recentKnowledge.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => handleViewKnowledge(item._id)}
                    className="flex cursor-pointer items-center justify-between gap-3 rounded-lg p-3 transition hover:bg-yellow-50"
                  >

                    <div className="min-w-0">
                      <h4 className="truncate font-semibold text-black">
                        {item.title}
                      </h4>

                      <p className="mt-1 text-xs capitalize text-zinc-500">
                        {item.type} · {item.category || "Uncategorized"}
                      </p>
                    </div>

                    <div className="shrink-0 text-xs text-red-600">
                      {new Date(
                        item.updatedAt || item.createdAt
                      ).toLocaleDateString()}
                    </div>

                  </div>
                ))}

              </div>
            )}

          </section>

          {/* Search */}
          <section className="mb-8 rounded-xl border border-yellow-400 bg-white p-5 shadow-sm">

            <h3 className="mb-4 text-xl font-bold text-black">
              Find Your Knowledge
            </h3>

            <div className="flex items-center rounded-lg border border-yellow-300 bg-yellow-50 px-4 transition focus-within:border-red-500">
              <Search size={20} className="text-red-600" />

              <input
                type="text"
                placeholder="Search by title, description, category or tag..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent px-3 py-3 text-black outline-none placeholder:text-zinc-500 text-xl"
              />
            </div>

          </section>

          {/* Filters */}
          <div
            id="knowledge-filters"
            className="mt-4 mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="rounded-lg border border-yellow-400 bg-white p-3 text-md text-black outline-none focus:border-red-500"
            >
              <option value="all">All Types</option>
              <option value="note">Notes</option>
              <option value="snippet">Snippets</option>
              <option value="resource">Resources</option>
            </select>

            {/* Language Filter */}
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="rounded-lg border border-yellow-400 bg-white p-3 text-sm text-black outline-none focus:border-red-500"
            >
              <option value="all">All Languages</option>
              {[...new Set(knowledge.map(item => item.language).filter(Boolean))].map(language => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg border border-yellow-400 bg-white p-3 text-sm text-black outline-none focus:border-red-500"
            >
              <option value="all">All Categories</option>
              {[...new Set(knowledge.map(item => item.category).filter(Boolean))].map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Sorting */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="rounded-lg border border-yellow-400 bg-white p-3 text-sm text-black outline-none focus:border-red-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>

          </div>

          {/* Knowledge Records */}
          <section id="knowledge-records">

            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-2xl font-extrabold text-black">
                Recent Knowledge
              </h3>

              <span className="rounded-lg bg-yellow-300 px-3 py-1 text-sm font-bold text-black">
                {filteredKnowledge.length} items
              </span>
            </div>

            {loading ? (
              <p className="rounded-xl border border-yellow-400 bg-white p-8 text-center text-zinc-500">
                Loading your knowledge...
              </p>
            ) : filteredKnowledge.length === 0 ? (
              <div className="rounded-xl border border-dashed border-yellow-500 bg-white p-10 text-center">
                <BookOpen size={40} className="mx-auto mb-3 text-yellow-500" />

                <h4 className="font-bold text-black">
                  No knowledge found
                </h4>

                <p className="mt-2 text-sm text-zinc-500">
                  Start saving your notes, code snippets and resources.
                </p>

                <button
                  onClick={() => navigate("/add-knowledge")}
                  className="mt-5 rounded-lg bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-black"
                >
                  Add Knowledge
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

                {filteredKnowledge.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => handleViewKnowledge(item._id)}
                    className="cursor-pointer rounded-xl border border-yellow-400 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-red-500 hover:shadow-lg"
                  >

                    <div className="mb-3 flex items-start justify-between gap-3">

                      <h4 className="text-lg font-bold text-black">
                        {item.title}
                      </h4>

                      <span className="shrink-0 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold capitalize text-red-700 text-md">
                        {item.type}
                      </span>

                    </div>

                    <p className="mb-4 text-sm leading-6 text-zinc-600">
                      {item.description || "No description available."}
                    </p>

                    <div className="mb-4 flex flex-wrap gap-2">

                      {item.language && (
                        <span className="rounded-md bg-yellow-300 px-3 py-1 text-xs font-semibold text-black">
                          {item.language}
                        </span>
                      )}

                      {item.category && (
                        <span className="rounded-md bg-zinc-900 px-3 py-1 text-xs text-yellow-300">
                          {item.category}
                        </span>
                      )}

                      {item.tags?.map((tag, index) => (
                        <span
                          key={index}
                          className="rounded-md bg-red-50 px-3 py-1 text-md text-red-700"
                        >
                          #{tag}
                        </span>
                      ))}

                    </div>

                    <div className="flex items-center gap-2 border-t border-yellow-100 pt-3 text-md  text-zinc-500">
                      <Clock size={14} className="text-red-600 " />
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>

                  </div>
                ))}

              </div>
            )}

          </section>

        </main>
      </div>
    </div>
  );
}

export default Dashboard;
