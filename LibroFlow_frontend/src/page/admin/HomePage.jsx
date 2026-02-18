import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  Search,
  BookOpen,
  Library,
  PlusCircle,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  Loader2,
  AlertCircle,
  Book as BookIcon,
  Trash2,
  HandHelping,
  ChevronDown,
  Settings,
} from "lucide-react";

function HomePage() {
  // --- STATE ---
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role") || "user";

  // --- AUTH HELPER ---
  const getAuthHeader = () => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // --- API LOGIC ---
  useEffect(() => {
    fetchAllBooks();
  }, []);

  const fetchAllBooks = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:8080/api/v1/all", {
        headers: getAuthHeader(),
      });
      setBooks(response.data.data || []);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        // Only navigate home if they were trying to access protected data
        console.log("Unauthorized access or expired token");
      }
      setError("Unable to load library collection.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return fetchAllBooks();
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/user/book/author/${searchTerm}`,
        { headers: getAuthHeader() },
      );
      setBooks(response.data.data || []);
      setError("");
    } catch (err) {
      setBooks([]);
      setError(`No books found by: "${searchTerm}"`);
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (author, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/admin/book/delete/${author}/${title}`,
        { headers: getAuthHeader() },
      );
      fetchAllBooks();
    } catch (err) {
      alert("Unauthorized or server error.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-x-hidden relative font-sans">
      {/* 1. MOBILE SIDEBAR OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden transition-all"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 2. SIDEBAR NAVIGATION */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-[70] w-64 bg-white border-r border-gray-100 
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static lg:block
      `}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-10 px-2">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-lg shadow-indigo-100">
                <BookOpen size={18} />
              </div>
              <span className="text-xl font-black text-gray-900 tracking-tighter">
                LibroFlow
              </span>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1.5 text-gray-400 hover:bg-gray-50 rounded-md"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 space-y-1">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 p-2.5 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-sm"
            >
              <Library size={18} /> <span>Catalog</span>
            </Link>
            {token && userRole === "admin" && (
              <Link
                to="/add-book"
                className="flex items-center gap-3 p-2.5 rounded-xl text-gray-500 hover:bg-gray-50 transition-all text-sm font-semibold"
              >
                <PlusCircle size={18} /> <span>Add New Book</span>
              </Link>
            )}
            {token && (
              <Link
                to="/profile"
                className="flex items-center gap-3 p-2.5 rounded-xl text-gray-500 hover:bg-gray-50 transition-all text-sm font-semibold"
              >
                <UserIcon size={18} /> <span>My Account</span>
              </Link>
            )}
          </nav>

          {token && (
            <div className="pt-6 border-t border-gray-100">
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                className="flex items-center gap-3 w-full p-3 text-red-500 font-bold text-sm hover:bg-red-50 rounded-xl transition-all"
              >
                <LogOut size={18} /> <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* 3. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* BIGGER HEADER (h-28) */}
        <header className="h-28 bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 px-6 md:px-12">
          <div className="grid grid-cols-3 items-center h-full">
            {/* Left: Hamburger */}
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-3 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-colors lg:hidden"
              >
                <Menu size={24} />
              </button>
            </div>

            {/* Center: Search Bar */}
            <div className="flex justify-center">
              <form
                onSubmit={handleSearch}
                className="relative w-full max-w-md group"
              >
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search author..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-400 outline-none transition-all text-sm font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>
            </div>

            {/* Right: Auth State Toggle */}
            <div className="flex justify-end items-center">
              {token ? (
                /* LOGGED IN VIEW */
                <div className="flex items-center gap-4 relative group">
                  <div className="hidden sm:block text-right">
                    <p className="text-[11px] font-black text-gray-900 leading-none uppercase tracking-tighter">
                      {userRole.replace("ROLE_", "")}
                    </p>
                    <p className="text-[10px] text-green-500 font-bold italic tracking-tighter">
                      ONLINE
                    </p>
                  </div>
                  <button className="flex items-center gap-3 p-1.5 pr-4 hover:bg-gray-100 rounded-2xl transition-all border border-transparent hover:border-gray-200 group/btn">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100 font-bold text-sm">
                      {userRole === "admin" ? "A" : "U"}
                    </div>
                    <ChevronDown
                      size={16}
                      className="text-gray-400 group-hover/btn:rotate-180 transition-transform"
                    />
                  </button>
                  {/* Dropdown Menu */}
                  <div className="absolute top-[85%] right-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100] p-2">
                    <button
                      onClick={() => navigate("/profile")}
                      className="w-full flex items-center gap-3 p-3 text-sm font-bold text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all"
                    >
                      <UserIcon size={18} /> <span>My Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        localStorage.clear();
                        navigate("/");
                      }}
                      className="w-full flex items-center gap-3 p-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <LogOut size={18} /> <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* GUEST VIEW - Minimalist Design */
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigate("/login")}
                    className="px-5 py-2.5 text-[11px] font-black text-gray-400 hover:text-indigo-600 uppercase tracking-widest transition-all"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    className="group relative flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-indigo-200 transition-all active:scale-95"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <UserIcon size={14} />
                    </div>
                    <span className="text-[11px] font-black text-gray-700 uppercase tracking-widest">
                      Create Account
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* BOOK COLLECTION GRID */}
        <div className="p-6 md:p-10">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase">
              Library Inventory
            </h2>
            <div className="h-1 w-12 bg-indigo-600 mt-1 mx-auto lg:mx-0 rounded-full"></div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
          ) : error ? (
            <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100 max-w-lg mx-auto">
              <AlertCircle size={40} className="mx-auto text-amber-400 mb-3" />
              <h3 className="text-lg font-bold text-gray-900">{error}</h3>
              <button
                onClick={fetchAllBooks}
                className="text-indigo-600 text-sm font-bold mt-2"
              >
                View All Books
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {books.map((book, idx) => (
                <div
                  key={idx}
                  className="group bg-white border border-gray-100 rounded-2xl p-2.5 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col"
                >
                  <div className="aspect-[3/4] w-full bg-indigo-50/50 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden">
                    <BookIcon
                      size={32}
                      className="text-indigo-200 group-hover:opacity-20 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-indigo-600/90 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2">
                      <button className="w-full py-1.5 bg-white text-indigo-600 rounded-lg text-[10px] font-black uppercase flex items-center justify-center gap-1.5 hover:bg-indigo-50">
                        <HandHelping size={12} /> Borrow
                      </button>
                      {userRole === "ROLE_ADMIN" && (
                        <button
                          onClick={() => deleteBook(book.author, book.title)}
                          className="w-full py-1.5 bg-red-500 text-white rounded-lg text-[10px] font-black uppercase flex items-center justify-center gap-1.5 hover:bg-red-600"
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      )}
                    </div>
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-white/90 rounded text-[8px] font-black text-indigo-600 border border-indigo-100 group-hover:hidden">
                      {book.pages}P
                    </div>
                  </div>
                  <div className="flex-1 px-1">
                    <h3 className="font-bold text-gray-900 text-[11px] leading-tight mb-0.5 line-clamp-1 group-hover:text-indigo-600">
                      {book.title}
                    </h3>
                    <p className="text-[10px] font-medium text-gray-400 truncate uppercase tracking-tighter">
                      {book.author}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
