import { useEffect, useState } from "react";
import { Menu, Search, Loader2, AlertCircle, BookOpen } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Icon,
  X,
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../contex/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import auth from "../../util/auth";
import SideBar from "../../components/side-bar/SideBar";
export default function LibraryPage() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { logout, isAdmin } = useAuth();

  const [author, setAuthor] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuth, setAuth] = useState(true); // simulate auth
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() => {
    fetchAllBooks();
  }, []);

  const fetchAllBooks = async () => {
    try {
      setLoading(true);
      setError("");
      setAuthor("");
      const response = await axiosInstance.get(
        "http://localhost:8080/api/v1/all",
      );
      setBooks(response.data.data);
      setAuth(localStorage.getItem("token") !== null);

      setLoading(false);
    } catch (err) {
      setError("Failed to load books.");
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(e);
    try {
      setLoading(true);
      setError("");
      if (author.length !== 0) {
        const response = await axiosInstance.get(
          `http://localhost:8080/api/v1/user/book/author/${author}`,
        );
        console.log(response);
        setBooks(response.data.data);
      } else {
        fetchAllBooks();
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setBooks([]);
      setError("Cannot find " + author + "'s books !");
      setLoading(false);
      // fetchAllBooks();
    }
  };

  const deleteBook = (author, title) => {
    setBooks((prev) =>
      prev.filter((b) => !(b.author === author && b.title === title)),
    );
  };

  const handleSideBar = () => {
    setIsSidebarOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ==============SideBar============== */}
      <SideBar
        setAuth={setAuth}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
        />
      )}

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* LEFT */}
            <div className="flex items-center gap-3">
              {isAuth && (
                <button
                  onClick={handleSideBar}
                  className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition lg:hidden"
                >
                  <Menu size={22} />
                </button>
              )}

              <h1 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                LibroFlow
              </h1>
            </div>

            {/* DESKTOP SEARCH */}
            <div className="hidden md:flex flex-1 justify-center px-6">
              <form
                onSubmit={handleSearch}
                className="relative w-full max-w-lg"
              >
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  value={author}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setAuthor(e.target.value);
                  }}
                  type="text"
                  placeholder="Search by author..."
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 outline-none transition"
                />
                {/* <button type="submit">s</button> */}
              </form>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
              {isAuth ? (
                <NavLink
                  to={"/profile"}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center text-sm font-semibold shadow">
                    {isAdmin ? "A" : "U"}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    Profile
                  </span>
                </NavLink>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="hidden sm:inline-flex px-4 py-2 text-sm font-semibold text-gray-600 hover:text-indigo-600 transition"
                  >
                    Login
                  </button>

                  <button
                    onClick={() => navigate("/signup")}
                    className="px-4 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>

          {/* MOBILE SEARCH */}
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by author..."
                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 outline-none transition"
              />
            </form>
          </div>
        </div>
      </header>

      {/* ================= CONTENT ================= */}
      <main className="px-4 sm:px-6 md:px-10 py-10">
        <div className="mb-12 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Library Inventory
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-indigo-600 to-purple-600 mt-2 mx-auto lg:mx-0 rounded-full"></div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-md border border-gray-100 max-w-lg mx-auto">
            <AlertCircle size={40} className="mx-auto text-amber-400 mb-3" />
            <h3 className="text-lg font-bold text-gray-900">{error}</h3>
            <button
              onClick={fetchAllBooks}
              className="text-indigo-600 text-sm font-semibold mt-3 hover:underline"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {books.map((book, idx) => (
              <div
                key={idx}
                className="group bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Cover */}
                <div className="aspect-[3/4] w-full bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                  <BookOpen
                    size={36}
                    className="text-indigo-200 group-hover:opacity-20 transition-opacity"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-indigo-600/90 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition duration-300 p-4">
                    <button className="w-full py-2 bg-white text-indigo-600 rounded-lg text-xs font-bold uppercase hover:bg-indigo-50 transition">
                      Borrow
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => deleteBook(book.author, book.title)}
                        className="w-full py-2 bg-red-500 text-white rounded-lg text-xs font-bold uppercase hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    )}
                  </div>

                  {/* Badge */}
                  <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 rounded-md text-xs font-bold text-indigo-600 border border-indigo-100 shadow-sm group-hover:hidden">
                    {book.pages} Pages
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1 group-hover:text-indigo-600 transition">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-500 truncate uppercase tracking-wide">
                    {book.author}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
