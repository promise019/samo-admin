import { useState } from "react";
import Button from "../component/UI/Button";
import type { ChangeEvent, FormEvent } from "react";
import { uploadAdminPost } from "../lib/storage";
import { auth } from "../lib/firebase";
import { Timestamp } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import { Loader2, PenLine /* ImageIcon, X */ } from "lucide-react";
import StatisticsBoard from "../component/Layout/statisticsBoard";

export default function Dashboard() {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    verse: "",
    says: "",
    // img: null as File | null, // Image Logic Paused
  });
  const [isloading, setLoading] = useState(false);
  // const [previewUrl, setPreviewUrl] = useState<string | null>(null); // Image Logic Paused

  /* // Handle Image Selection Logic Paused
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPostData({ ...postData, img: file });
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
    setPostData({ ...postData, img: null });
    setPreviewUrl(null);
  };
  */

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

      await uploadAdminPost({
        adminId: auth.currentUser?.uid,
        title: postData.title,
        message: postData.message,
        verse: postData.verse,
        says: postData.says,
        // imageFile: postData.img, // Image Logic Paused
        createdAt: now,
        publishedAt: now,
        status: "published",
        isAdminPost: true,
      });

      toast.success("Daily Word published successfully!");
      setPostData({ title: "", message: "", verse: "", says: "" });
      // setPreviewUrl(null); // Image Logic Paused
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to publish.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-24 p-4 md:p-6 space-y-5 bg-gray-50 min-h-screen">
      <ToastContainer position="top-center" autoClose={3000} />
      <StatisticsBoard />

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

          {/* IMAGE UPLOAD SECTION - COMMENTED FOR FUTURE USE
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-500 uppercase ml-1">Background Image (Optional)</label>
            {!previewUrl ? (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ImageIcon className="text-gray-400 mb-2" size={24} />
                  <p className="text-xs text-gray-500">Click to upload image</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
            ) : (
              <div className="relative w-full h-40 rounded-xl overflow-hidden border border-gray-200">
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                <button type="button" onClick={clearImage} className="absolute top-2 right-2 p-1 bg-red-800 text-white rounded-full hover:bg-red-900 transition-colors">
                  <X size={16} />
                </button>
              </div>
            )}
          </div> 
          */}

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
