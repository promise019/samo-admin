import { useState } from "react";
// import Input from "../component/UI/Input";
import Button from "../component/UI/Button";
import type { ChangeEvent, FormEvent } from "react";
import { uploadAdminPost } from "../lib/storage";
import { auth } from "../lib/firebase";
import { Timestamp } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import { Loader2, PenLine } from "lucide-react";

export default function Dashboard() {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    verse: "",
    says: "",
    img: null as File | null,
  });
  const [isloading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !postData.title.trim() ||
      !postData.message.trim() ||
      !postData.verse.trim()
    ) {
      return toast.warn("Please fill in all required fields");
    }

    setLoading(true);

    try {
      const now = Timestamp.now();

      // Using the exact fields you listed
      await uploadAdminPost({
        adminId: auth.currentUser?.uid,
        title: postData.title,
        message: postData.message,
        verse: postData.verse,
        says: postData.says,
        createdAt: now,
        publishedAt: now, // Added: to match schedule schema
        status: "published", // Added: to match schedule schema
        isAdminPost: true, // Added: your specific dashboard flag
      });

      toast.success("Daily Word published successfully!");
      setPostData({ title: "", message: "", verse: "", says: "", img: null });
    } catch (error: any) {
      toast.error("Failed to publish.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-24 p-4 md:p-6 space-y-5 bg-gray-50 min-h-screen">
      <ToastContainer position="top-center" autoClose={3000} />

      <section className="grid grid-cols-3 gap-2 md:gap-4">
        {[
          { value: "15.2k", label: "Views", color: "bg-red-950" },
          { value: "1.2k", label: "Engage", color: "bg-red-900" },
          { value: "805", label: "Shares", color: "bg-stone-900" },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`${stat.color} text-white rounded-2xl p-3 md:p-5 shadow-sm`}
          >
            <h1 className="text-xl md:text-3xl font-black">{stat.value}</h1>
            <p className="text-[10px] md:text-xs uppercase tracking-wider opacity-70 font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      <section className="bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-red-50 rounded-lg">
            <PenLine size={18} className="text-red-800" />
          </div>
          <h1 className="font-bold text-gray-800">New Daily Word</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-500 uppercase ml-1">
                Title
              </label>
              <input
                className="p-2.5 w-full border rounded-xl border-gray-200 focus:ring-2 focus:ring-red-800 outline-none transition-all text-sm"
                placeholder="Ex: Faith"
                value={postData.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPostData({ ...postData, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-500 uppercase ml-1">
                Verse
              </label>
              <input
                className="p-2.5 w-full border rounded-xl border-gray-200 focus:ring-2 focus:ring-red-800 outline-none transition-all text-sm"
                placeholder="John 3:16"
                value={postData.verse}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPostData({ ...postData, verse: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-500 uppercase ml-1">
              Scripture Text
            </label>
            <input
              className="p-2.5 w-full border rounded-xl border-gray-200 focus:ring-2 focus:ring-red-800 outline-none transition-all text-sm"
              placeholder="For God so loved the world..."
              value={postData.says}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPostData({ ...postData, says: e.target.value })
              }
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-500 uppercase ml-1">
              Reflection
            </label>
            <textarea
              className="p-3 w-full border border-gray-200 rounded-xl h-24 md:h-32 resize-none focus:ring-2 focus:ring-red-800 outline-none transition-all text-sm no-scrollbar"
              placeholder="What is God saying today?"
              value={postData.message}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setPostData({ ...postData, message: e.target.value })
              }
            />
          </div>

          <Button
            type="submit"
            disabled={isloading}
            className="w-full bg-red-800 hover:bg-red-900 text-white font-bold rounded-xl p-3 shadow-lg shadow-red-900/20 transition-all active:scale-[0.98] disabled:opacity-70 mt-2"
          >
            {isloading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" size={20} />
                <span>Publishing...</span>
              </div>
            ) : (
              "Publish Word"
            )}
          </Button>
        </form>
      </section>
    </div>
  );
}
