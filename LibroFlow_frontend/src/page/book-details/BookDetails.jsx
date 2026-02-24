import React, { useEffect, useState } from "react";
import SideBar from "../../components/side-bar/SideBar";
import { useParams, useNavigate } from "react-router-dom";
import AdminHeader from "../../components/header/AdminHeader";
import axiosInstance from "../../utils/axiosInstance";
import { Info, Loader2 } from "lucide-react";
import BookDetailsComponent from "../../components/book-details/BookDetailsComponent";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axiosInstance.get(`/api/v1/book/${id}`);
        setBook(res.data.data);
      } catch (err) {
        console.error("Error fetching book:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-900">
      <SideBar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col">
        <AdminHeader
          setIsSidebarOpen={setIsSidebarOpen}
          children={
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/")}
                className="text-gray-400 hover:text-indigo-600 transition-colors"
              >
                Library
              </button>
              <span className="text-gray-300">/</span>
              <span className="font-semibold text-gray-800 truncate max-w-[200px]">
                {book?.title}
              </span>
            </div>
          }
        />

        <main className="flex-1 p-6 md:p-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
              <p className="text-gray-500 font-medium tracking-wide">
                Fetching book details...
              </p>
            </div>
          ) : !book ? (
            <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100 max-w-2xl mx-auto">
              <Info className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800">
                Book Not Found
              </h2>
              <p className="text-gray-500 mt-2">
                The book you are looking for might have been removed or the ID
                is incorrect.
              </p>
            </div>
          ) : (
            <BookDetailsComponent book={book} />
          )}
        </main>
      </div>
    </div>
  );
};

export default BookDetails;
