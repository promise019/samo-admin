import { Trash2 } from "lucide-react";
import bible from "../assets/image/bible.jpeg";
import dove from "../assets/image/dove.jpeg";
import hand from "../assets/image/hand.jpeg";
import hand1 from "../assets/image/hand1.jpeg";
import handbible from "../assets/image/handbible.jpeg";
import jesusonmount from "../assets/image/jesusonmount.jpeg";
import { useState } from "react";

interface AdminPost {
  id: string;
  title: string;
  verse: string;
  message: string;
  details: string;
  image: string;
  createdAt: string;
}

const mockPosts: AdminPost[] = [
  {
    id: "1",
    title: "Trusting God Beyond What We See",
    verse: "— Proverbs 3:5–6 (ESV)",
    message:
      "“Trust in the LORD with all your heart, and do not lean on your own understanding. In all your ways acknowledge Him, and He will make straight your paths.”",
    details:
      "Faith is often exercised most when clarity is absent. God calls His people to trust Him not based on visible outcomes, but on His proven character. When circumstances are uncertain, reliance on God becomes an intentional decision rather than a reaction to comfort.",
    image: jesusonmount,
    createdAt: "2026-01-12",
  },
  {
    id: "2",
    title: "Walking by Faith",
    verse: "— 2 Corinthians 5:7 (ESV)",
    message: "“For we walk by faith, not by sight.”",
    details:
      "Faith requires movement even when the path ahead is unclear. Walking by faith means trusting God’s guidance above our own perception and feelings.",
    image: bible,
    createdAt: "2026-01-11",
  },
  {
    id: "3",
    title: "God Is Our Refuge",
    verse: "Psalm 46:1",
    message:
      "“Trust in the LORD with all your heart, and do not lean on your own understanding. In all your ways acknowledge Him, and He will make straight your paths.”",
    details:
      "Faith is often exercised most when clarity is absent. God calls His people to trust Him not based on visible outcomes, but on His proven character. When circumstances are uncertain, reliance on God becomes an intentional decision rather than a reaction to comfort.",

    image: dove,
    createdAt: "2026-01-10",
  },
  {
    id: "4",
    title: "Trusting God Beyond What We See",
    verse: "Proverbs 3:5–6",
    message:
      "“Trust in the LORD with all your heart, and do not lean on your own understanding. In all your ways acknowledge Him, and He will make straight your paths.”",
    details:
      "Faith is often exercised most when clarity is absent. God calls His people to trust Him not based on visible outcomes, but on His proven character. When circumstances are uncertain, reliance on God becomes an intentional decision rather than a reaction to comfort.",

    image: hand,
    createdAt: "2026-01-12",
  },
  {
    id: "5",
    title: "Walking by Faith",
    verse: "2 Corinthians 5:7",
    image: hand1,
    message:
      "“Trust in the LORD with all your heart, and do not lean on your own understanding. In all your ways acknowledge Him, and He will make straight your paths.”",
    details:
      "Faith is often exercised most when clarity is absent. God calls His people to trust Him not based on visible outcomes, but on His proven character. When circumstances are uncertain, reliance on God becomes an intentional decision rather than a reaction to comfort.",

    createdAt: "2026-01-11",
  },
  {
    id: "6",
    title: "God Is Our Refuge",
    verse: "Psalm 46:1",
    image: handbible,
    message:
      "“Trust in the LORD with all your heart, and do not lean on your own understanding. In all your ways acknowledge Him, and He will make straight your paths.”",
    details:
      "Faith is often exercised most when clarity is absent. God calls His people to trust Him not based on visible outcomes, but on His proven character. When circumstances are uncertain, reliance on God becomes an intentional decision rather than a reaction to comfort.",

    createdAt: "2026-01-10",
  },
];

export default function AdminPostedPosts() {
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <div className="grid pb-17 md:pb-0 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockPosts.map((post) => {
          const isExpanded = expandedPost === post.id;

          return (
            <article
              key={post.id}
              className="relative h-55 rounded-2xl overflow-hidden shadow-lg"
              style={{
                backgroundImage: `url(${post.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/60" />

              {/* Content wrapper */}
              <div className="relative h-full flex flex-col text-white">
                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-2">
                  <p className="text-xs opacity-90">{post.verse}</p>
                  <h2 className="text-lg font-bold">{post.title}</h2>

                  <p className="italic text-sm">{post.message}</p>

                  {isExpanded && (
                    <p className="text-sm leading-relaxed">{post.details}</p>
                  )}
                </div>

                {/* Sticky footer */}
                <div className="sticky bottom-1 backdrop-blur-sm px-4 py-3 flex justify-between items-center">
                  <button
                    onClick={() => setExpandedPost(isExpanded ? null : post.id)}
                    className="text-sm underline"
                  >
                    {isExpanded ? "Hide" : "Read more"}
                  </button>

                  <button
                    disabled
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-md text-sm"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
