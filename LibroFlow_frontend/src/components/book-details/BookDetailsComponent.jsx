import { NavLink } from "react-router-dom";
import FileText from "./FileText";
import {
  BookOpen,
  User,
  Calendar,
  Tag,
  Hash,
  Info,
  Share2,
  MessageSquare,
} from "lucide-react";
const BookDetailsComponent = ({ book }) => {
  const imageSrc = book?.image ? `data:image/jpeg;base64,${book.image}` : null;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Main Container */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden flex flex-col md:flex-row">
        {/* Left Section: Book Image & Owner Quick-View */}
        <div className="md:w-5/12 bg-gray-50 p-8 flex flex-col items-center border-r border-gray-100">
          {/* Image with Glow */}
          <div className="relative group mb-8">
            <div className="absolute inset-0 bg-indigo-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={book.title}
                className="w-64 h-96 object-cover rounded-2xl shadow-2xl relative z-10"
              />
            ) : (
              <div className="w-64 h-96 bg-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 gap-4 border-2 border-dashed border-gray-300">
                <BookOpen size={48} className="opacity-20" />
                <span className="font-medium">No Cover</span>
              </div>
            )}
          </div>

          {/* STUDENT OWNER CARD */}
          <div className="w-full bg-white p-5 rounded-2xl border border-indigo-50 shadow-sm">
            <p className="text-[10px] uppercase tracking-widest text-indigo-500 font-bold mb-3">
              Owner Details
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                {book.ownerName ? book.ownerName.charAt(0) : "S"}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 leading-none mb-1">
                  {book.ownerName || "Student User"}
                </h4>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Tag size={12} className="text-indigo-400" />
                  Software Engineering, Year 3
                </p>
              </div>
              <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <User size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Section: Detailed Content */}
        <div className="md:w-7/12 p-8 md:p-12 flex flex-col">
          <div className="mb-8">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700 mb-4">
              {book.category || "Academic"}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              {book.title}
            </h1>
          </div>

          {/* Book Metadata Grid */}
          <div className="grid grid-cols-2 gap-6 mb-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <User size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">
                  Author
                </p>
                <p className="font-semibold text-gray-800">{book.author}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">
                  Published
                </p>
                <p className="font-semibold text-gray-800">
                  {book.publicationYear || "2024"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <Hash size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">
                  Condition
                </p>
                <p className="font-semibold text-emerald-600">Like New</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <Info size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">
                  Swap Status
                </p>
                <p className="font-semibold text-indigo-600">Available Now</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="flex-1 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <FileText size={18} className="text-indigo-600" />
              About this Book
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg italic">
              "
              {book.description ||
                "The student hasn't added a specific description yet, but this book is looking for a new home!"}
              "
            </p>
          </div>

          {/* Action Buttons - Refocused on Exchange */}
          <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-200 text-white font-bold py-4 rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-3">
              <Share2 size={20} />
              Request Exchange
            </button>
            <NavLink
              to={`/chatRoom/${book.username}`}
              className="px-8 py-4 border-2 border-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 hover:border-indigo-100 hover:text-indigo-600 transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare size={20} />
              Chat with Student
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsComponent;
