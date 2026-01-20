import { Loader2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../lib/firebase";
import { deletePost } from "../lib/storage";
import { toast } from "react-toastify";
import Button from "../component/UI/Button";

// Import your static assets
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
    if (!window.confirm("Delete this Word?")) return;
    setDeletingId(postId);
    try {
      await deletePost(postId);
      toast.success("Removed from public feed");
    } catch (error) {
      toast.error("Failed to delete");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading)
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-red-900" size={40} />
      </div>
    );

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <div className="grid pb-17 md:pb-0 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => {
          const isExpanded = expandedPost === post.id;
          const isDeleting = deletingId === post.id;

          // Rotate through static images based on index
          const staticBg = bgImages[index % bgImages.length];

          return (
            <article
              key={post.id}
              className="relative h-64 rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02]"
              style={{
                backgroundImage: `url(${staticBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Dark Gradient Overlay for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

              <div className="relative h-full flex flex-col text-white">
                <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400">
                    {post.verse}
                  </p>
                  <h2 className="text-xl font-extrabold leading-tight">
                    {post.title}
                  </h2>
                  <p className="italic text-sm text-gray-100 line-clamp-3">
                    "{post.message}"
                  </p>

                  {isExpanded && (
                    <div className="pt-3 mt-3 border-t border-white/20 animate-in fade-in slide-in-from-top-2">
                      <p className="text-xs text-gray-300 leading-relaxed">
                        ID: {post.id} <br />
                        Published:{" "}
                        {post.createdAt?.toDate().toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>

                <div className="p-4 flex justify-between items-center bg-black/40 backdrop-blur-md">
                  <button
                    onClick={() => setExpandedPost(isExpanded ? null : post.id)}
                    className="text-xs font-medium hover:underline"
                  >
                    {isExpanded ? "Show Less" : "Details"}
                  </button>

                  <Button
                    disabled={isDeleting}
                    className="flex items-center gap-2 bg-red-700 hover:bg-red-600 px-4 py-2 rounded-xl text-xs font-bold transition-all"
                    onClick={() => handleDelete(post.id)}
                  >
                    {isDeleting ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Trash2 size={14} />
                    )}
                    {isDeleting ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
