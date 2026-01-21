import { Loader2, Trash2, Edit3, X, Check, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { deletePost, updatePost } from "../lib/storage";
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
  says: string;
  createdAt: any;
}

export default function AdminPostedPosts() {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Edit States
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<AdminPost | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const q = query(
          collection(db, "posts"),
          where("adminId", "==", user.uid),
          orderBy("createdAt", "desc"),
        );

        const unsubscribePosts = onSnapshot(
          q,
          (snapshot) => {
            const fetchedPosts = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })) as AdminPost[];
            setPosts(fetchedPosts);
            setLoading(false);
          },
          (error) => {
            console.error("Firestore Error:", error);
            setLoading(false);
          },
        );
        return () => unsubscribePosts();
      } else {
        setPosts([]);
        setLoading(false);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  // --- LOGIC FUNCTIONS ---

  const handleShare = async (post: AdminPost) => {
    const fullMessage =
      `📖 *${post.title}*\n\n` +
      `📍 Verse: ${post.verse}\n` +
      `💬 "${post.says}"\n\n` +
      `📝 Reflection:\n${post.message}\n\n` +
      `Read more at:`;

    const shareData = {
      title: post.title,
      text: fullMessage,
      url: "https://bible-posts-yk2m.vercel.app/",
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      try {
        await navigator.clipboard.writeText(
          `${shareData.text} ${shareData.url}`,
        );
        toast.success("Link copied to clipboard!");
      } catch (err) {
        toast.error("Failed to copy link");
      }
    }
  };

  const handleEditClick = (post: AdminPost) => {
    setEditingId(post.id);
    setEditForm({ ...post });
  };

  const handleUpdate = async () => {
    if (!editForm) return;
    try {
      setIsUpdating(true);
      await updatePost(editForm.id, {
        title: editForm.title,
        message: editForm.message,
        verse: editForm.verse,
        says: editForm.says,
      });
      toast.success("Post updated!");
      setEditingId(null);
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
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

  const [latestPost, ...olderPosts] = posts;

  return (
    <section className="pb-26 px-4 md:p-6 bg-gray-50 min-h-screen space-y-10">
      {/* LATEST POST - HERO SECTION */}
      {latestPost && (
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            Latest Publication
          </h2>
          <PostCard
            post={latestPost}
            index={0}
            isHero={true}
            isEditing={editingId === latestPost.id}
            isExpanded={expandedPost === latestPost.id}
            isDeleting={deletingId === latestPost.id}
            isUpdating={isUpdating}
            editForm={editForm}
            setEditForm={setEditForm}
            onEdit={() => handleEditClick(latestPost)}
            onCancel={() => setEditingId(null)}
            onUpdate={handleUpdate}
            onDelete={() => handleDelete(latestPost.id)}
            onShare={() => handleShare(latestPost)}
            onToggleExpand={() =>
              setExpandedPost(
                expandedPost === latestPost.id ? null : latestPost.id,
              )
            }
          />
        </div>
      )}

      {/* OLDER POSTS - GRID SECTION */}
      {olderPosts.length > 0 && (
        <div className="max-w-7xl mx-auto space-y-6">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-200 pb-2">
            Previous Reflections
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {olderPosts.map((post, idx) => (
              <PostCard
                key={post.id}
                post={post}
                index={idx + 1}
                isHero={false}
                isEditing={editingId === post.id}
                isExpanded={expandedPost === post.id}
                isDeleting={deletingId === post.id}
                isUpdating={isUpdating}
                editForm={editForm}
                setEditForm={setEditForm}
                onEdit={() => handleEditClick(post)}
                onCancel={() => setEditingId(null)}
                onUpdate={handleUpdate}
                onDelete={() => handleDelete(post.id)}
                onShare={() => handleShare(post)}
                onToggleExpand={() =>
                  setExpandedPost(expandedPost === post.id ? null : post.id)
                }
              />
            ))}
          </div>
        </div>
      )}

      {posts.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          No reflections have been posted yet.
        </div>
      )}
    </section>
  );
}

/**
 * REUSABLE CARD COMPONENT
 */
function PostCard({
  post,
  index,
  isHero,
  isEditing,
  isExpanded,
  isDeleting,
  isUpdating,
  editForm,
  setEditForm,
  onEdit,
  onCancel,
  onUpdate,
  onDelete,
  onShare,
  onToggleExpand,
}: any) {
  const staticBg = bgImages[index % bgImages.length];

  return (
    <article
      className={`relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ease-in-out ${
        isHero ? "h-[450px] md:h-[550px] w-full" : "h-80"
      }`}
      style={{
        backgroundImage: `url(${staticBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/80" />

      <div className="relative h-full flex flex-col text-white p-6 md:p-10">
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-4">
          {isEditing ? (
            <div className="space-y-3 p-4 bg-black/20 rounded-xl backdrop-blur-sm border border-white/10">
              <input
                className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-xs text-red-400 font-bold uppercase outline-none focus:border-red-500"
                value={editForm?.verse}
                onChange={(e) =>
                  setEditForm({ ...editForm, verse: e.target.value })
                }
              />
              <input
                className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-lg font-bold outline-none focus:border-white/50"
                value={editForm?.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
              />
              <textarea
                className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-sm h-16 resize-none"
                value={editForm?.says}
                onChange={(e) =>
                  setEditForm({ ...editForm, says: e.target.value })
                }
              />
              <textarea
                className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-sm h-32 resize-none"
                value={editForm?.message}
                onChange={(e) =>
                  setEditForm({ ...editForm, message: e.target.value })
                }
              />
            </div>
          ) : (
            <>
              <span
                className={`${isHero ? "text-xl" : "text-lg"} font-bold uppercase tracking-tighter text-red-500`}
              >
                {post.verse}
              </span>
              <h2
                className={`${isHero ? "text-4xl md:text-6xl max-w-3xl" : "text-xl"} font-black leading-tight tracking-tight`}
              >
                {post.title}
              </h2>
              {post.says && (
                <p
                  className={`${isHero ? "text-xl" : "text-sm"} font-medium text-gray-100 italic border-l-4 border-red-600 pl-4 py-2 bg-white/5 rounded-r-lg`}
                >
                  "{post.says}"
                </p>
              )}
              <p
                className={`${isHero ? "text-base md:text-lg" : "text-xs"} text-gray-300 leading-relaxed ${!isExpanded && !isHero && "line-clamp-3"}`}
              >
                {post.message}
              </p>
            </>
          )}
        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex justify-between items-center pt-5 border-t border-white/10">
          <div className="flex gap-4 md:gap-8 items-center">
            {isEditing ? (
              <button
                onClick={onCancel}
                className="text-sm font-bold text-gray-400 hover:text-white flex items-center gap-2"
              >
                <X size={18} /> Cancel
              </button>
            ) : (
              <>
                <button
                  onClick={onToggleExpand}
                  className="text-sm font-bold text-gray-200 hover:text-white transition-colors"
                >
                  {isExpanded
                    ? "Minimize"
                    : isHero
                      ? "Read Full Reflection"
                      : "Read"}
                </button>
                <button
                  onClick={onEdit}
                  className="text-sm font-bold text-gray-400 hover:text-blue-400 flex items-center gap-1 transition-colors"
                >
                  <Edit3 size={16} /> Edit
                </button>
                <button
                  className="text-sm font-bold text-gray-400 hover:text-green-400 flex items-center gap-1 transition-colors"
                  onClick={onShare}
                >
                  <Share2 size={16} /> Share
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            {isEditing ? (
              <button
                disabled={isUpdating}
                onClick={onUpdate}
                className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-full text-sm font-black flex items-center gap-2 transition-all shadow-lg shadow-green-900/20"
              >
                {isUpdating ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Check size={18} />
                )}{" "}
                SAVE
              </button>
            ) : (
              <Button
                disabled={isDeleting}
                onClick={onDelete}
                className="bg-red-600/20 hover:bg-red-600 border border-red-600/50 px-2 py-2 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all"
              >
                {isDeleting ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Trash2 size={14} />
                )}
                {isDeleting ? "..." : ""}
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
