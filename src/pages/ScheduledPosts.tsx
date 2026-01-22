import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import {
  Calendar,
  Clock,
  Send,
  Loader2,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PostData {
  title: string;
  message: string;
  verse: string;
  says: string;
  scheduledAt: string;
}

export default function ScheduledPosts() {
  const [scheduledPosts, setScheduledPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);

  const [formData, setFormData] = useState<PostData>({
    title: "",
    message: "",
    verse: "",
    says: "",
    scheduledAt: "",
  });

  useEffect(() => {
    // We query for posts where publishedAt is in the FUTURE
    const q = query(
      collection(db, "posts"),
      where("publishedAt", ">", Timestamp.now()),
      orderBy("publishedAt", "asc"),
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const posts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setScheduledPosts(posts);
        setLoading(false);
      },
      (error) => {
        console.error("Firestore Error:", error);
        // If this logs an error about "Index", click the link in your console!
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.title.trim() ||
      !formData.message.trim() ||
      !formData.scheduledAt
    ) {
      toast.warn("Required fields missing");
      return;
    }

    setIsPublishing(true);
    try {
      const user = auth.currentUser;
      const selectedDate = new Date(formData.scheduledAt);

      await addDoc(collection(db, "posts"), {
        title: formData.title,
        message: formData.message,
        verse: formData.verse,
        says: formData.says,
        adminId: user?.uid,
        createdAt: serverTimestamp(),
        publishedAt: Timestamp.fromDate(selectedDate), // Save as Firestore Timestamp
        status: "scheduled",
      });

      toast.success("Post scheduled!");
      setFormData({
        title: "",
        message: "",
        verse: "",
        says: "",
        scheduledAt: "",
      });
    } catch (error) {
      toast.error("Failed to save post");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Remove this post?")) return;
    try {
      await deleteDoc(doc(db, "posts", id));
      toast.success("Post removed");
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="p-3 sm:p-6 md:p-8 bg-gray-50 min-h-screen space-y-6 pb-24 overflow-x-hidden">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

      {/* HEADER */}
      <div className="flex items-center gap-3 max-w-6xl mx-auto px-1">
        <div className="p-2 sm:p-3 bg-amber-100 text-amber-700 rounded-xl sm:rounded-2xl">
          <Clock size={20} className="sm:w-6 sm:h-6" />
        </div>
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 truncate uppercase tracking-tight">
            Post Queue
          </h1>
          <p className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase opacity-60">
            Currently Scheduled
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 max-w-6xl mx-auto items-start">
        {/* LEFT: FORM (Former UI Style) */}
        <section className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-[2.5rem] shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm sm:text-base">
            <Calendar size={16} className="text-amber-600" /> New Schedule
          </h2>

          <form onSubmit={handleSchedule} className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                className="w-full p-3 sm:p-4 bg-gray-100 border-none rounded-xl sm:rounded-2xl text-sm outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <input
                className="w-full p-3 sm:p-4 bg-gray-100 border-none rounded-xl sm:rounded-2xl text-sm outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Verse"
                value={formData.verse}
                onChange={(e) =>
                  setFormData({ ...formData, verse: e.target.value })
                }
              />
            </div>

            <input
              className="w-full p-3 sm:p-4 bg-gray-100 border-none rounded-xl sm:rounded-2xl text-sm outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Scripture Text"
              value={formData.says}
              onChange={(e) =>
                setFormData({ ...formData, says: e.target.value })
              }
            />

            <textarea
              className="w-full p-3 sm:p-4 bg-gray-100 border-none rounded-xl sm:rounded-[2rem] h-24 sm:h-40 resize-none text-sm outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Message..."
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />

            <div className="p-4 sm:p-5 bg-amber-50 rounded-xl sm:rounded-[2rem] border border-amber-100">
              <label className="text-[9px] sm:text-[10px] font-black text-amber-800 uppercase block mb-2 tracking-widest">
                Release Date
              </label>
              <input
                type="datetime-local"
                className="w-full bg-white p-2 sm:p-3 rounded-lg sm:rounded-xl border-none font-bold text-amber-900 text-sm outline-none shadow-sm"
                value={formData.scheduledAt}
                onChange={(e) =>
                  setFormData({ ...formData, scheduledAt: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              disabled={isPublishing}
              className="w-full py-4 sm:py-5 bg-gray-900 text-white rounded-xl sm:rounded-[2rem] font-black uppercase text-xs sm:text-sm tracking-widest flex justify-center items-center gap-3 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isPublishing ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Send size={16} />
              )}
              {isPublishing ? "Scheduling..." : "Confirm"}
            </button>
          </form>
        </section>

        {/* RIGHT: LIST (Former UI Style) */}
        <section className="space-y-3">
          <h2 className="font-bold text-gray-400 uppercase text-[10px] tracking-[0.2em] px-2 flex justify-between">
            Queue <span>{scheduledPosts.length}</span>
          </h2>

          {loading ? (
            <div className="flex justify-center p-10">
              <Loader2 className="animate-spin text-amber-500" size={24} />
            </div>
          ) : scheduledPosts.length === 0 ? (
            <div className="bg-white rounded-2xl sm:rounded-[3rem] p-10 sm:p-20 text-center border-2 border-dashed border-gray-100 flex flex-col items-center gap-2">
              <AlertCircle size={32} className="text-gray-200" />
              <p className="text-xs sm:text-sm text-gray-400 font-medium">
                No pending posts
              </p>
            </div>
          ) : (
            <div className="grid gap-2 sm:gap-4">
              {scheduledPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white p-3 sm:p-5 rounded-xl sm:rounded-[2rem] border border-gray-100 flex items-center justify-between group shadow-sm"
                >
                  <div className="min-w-0 flex-1 pr-2">
                    <div className="flex items-center gap-1.5 text-[9px] font-black text-amber-600 uppercase mb-0.5">
                      <Clock size={10} />
                      {/* Check if toDate exists to avoid crashes */}
                      {post.publishedAt?.toDate
                        ? post.publishedAt.toDate().toLocaleString([], {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Invalid Date"}
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm sm:text-base truncate">
                      {post.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-gray-400 italic truncate">
                      {post.verse}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-2 sm:p-3 text-gray-200 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
