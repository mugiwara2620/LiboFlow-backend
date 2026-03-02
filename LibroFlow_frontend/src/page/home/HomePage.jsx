import { useEffect, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import SideBar from "../../components/side-bar/SideBar";
import MainHeader from "../../components/header/MainHeader";
import BookCover from "../../components/home/BookCover";
import { useAuth } from "../../contex/AuthContext";
export default function LibraryPage() {
  const [author, setAuthor] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuth, setAuth] = useState(true); // simulate auth
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { userDetails } = useAuth();
  console.log(userDetails);
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
      console.log(response);
      setLoading(false);
    } catch (err) {
      setError("Failed to load books.");
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      if (author.length !== 0) {
        const response = await axiosInstance.get(
          `http://localhost:8080/api/v1/user/book/author/${author}`,
        );
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
      <MainHeader
        handleSideBar={handleSideBar}
        handleSearch={handleSearch}
        isAuth={isAuth}
        setAuth={setAuth}
        author={author}
      />

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
              <BookCover fetchAllBooks={fetchAllBooks} book={book} idx={idx} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
