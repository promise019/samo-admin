import { Loader2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../lib/firebase";
import { deletePost } from "../lib/storage";
import { toast } from "react-toastify";
import Button from "../component/UI/Button";

// Static Assets
import bible from "../assets/image/bible.jpeg";
import dove from "../assets/image/dove.jpeg";
import hand from "../assets/image/hand.jpeg";
import hand1 from "../assets/image/hand1.jpeg";
import handbible from "../assets/image/handbible.jpeg";
import jesusonmount from "../assets/image/jesusonmount.jpeg";

const bgImages = [jesusonmount, bible, dove, hand, hand1, handbible];

interface AdminPost {
  id: string;
  title: string;
  verse: string;
  message: string;
  says: string; // Add this field
  createdAt: any;
}

export default function AdminPostedPosts() {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as AdminPost[];
      setPosts(fetchedPosts);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (postId: string) => {
    if (!window.confirm("Are you sure you want to delete this word?")) return;
    setDeletingId(postId);
    try {
      await deletePost(postId);
      toast.success("Post removed");
    } catch (error) {
      toast.error("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading)
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-red-900" size={32} />
      </div>
    );

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <div className="grid pb-17 md:pb-0 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => {
          const isExpanded = expandedPost === post.id;
          const isDeleting = deletingId === post.id;
          const staticBg = bgImages[index % bgImages.length];

          return (
            <article
              key={post.id}
              className="relative h-64 rounded-3xl overflow-hidden shadow-md"
              style={{
                backgroundImage: `url(${staticBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />

              <div className="relative h-full flex flex-col text-white p-5">
                <div className="flex-1 overflow-y-auto no-scrollbar space-y-3">
                  {/* Verse Reference */}
                  <span className="text-lg font-bold uppercase tracking-widest text-red-400">
                    {post.verse}
                  </span>

                  {/* Title */}
                  <h2 className="text-xl font-bold leading-tight">
                    {post.title}
                  </h2>

                  {/* Biblical Quote (The "Says" field) */}
                  {post.says && (
                    <p className="text-sm font-medium text-gray-100 italic border-l-2 border-red-500 pl-3 py-1">
                      "{post.says}"
                    </p>
                  )}

                  {/* Commentary (The "Message" field) */}
                  <p
                    className={`text-xs text-gray-300 leading-relaxed ${
                      !isExpanded && "line-clamp-2 opacity-80"
                    }`}
                  >
                    {post.message}
                  </p>
                </div>

                <div className="mt-4 flex justify-between items-center pt-3 border-t border-white/10">
                  <button
                    onClick={() => setExpandedPost(isExpanded ? null : post.id)}
                    className="text-xs font-semibold text-gray-400 hover:text-white transition-colors"
                  >
                    {isExpanded ? "Collapse" : "Read Reflection"}
                  </button>

                  <Button
                    disabled={isDeleting}
                    className="flex items-center gap-2 bg-red-600/90 hover:bg-red-600 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all"
                    onClick={() => handleDelete(post.id)}
                  >
                    {isDeleting ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : (
                      <Trash2 size={12} />
                    )}
                    {isDeleting ? "..." : "Delete"}
                  </Button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          No live posts found in the feed.
        </div>
      )}
    </section>
  );
}
