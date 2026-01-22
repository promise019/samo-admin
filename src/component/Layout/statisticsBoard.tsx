import { useState, useEffect } from "react";
import { collection, onSnapshot, query, doc } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function StatisticsBoard() {
  const [statsData, setStatsData] = useState({
    likes: 0,
    views: 0,
    shares: 0,
  });

  useEffect(() => {
    // 1. Sync Likes: Listen to all documents in 'posts' and sum them up
    const qPosts = query(collection(db, "posts"));
    const unsubPosts = onSnapshot(qPosts, (snapshot) => {
      const likesSum = snapshot.docs.reduce(
        (acc, doc) => acc + (doc.data().likes || 0),
        0,
      );
      setStatsData((prev) => ({ ...prev, likes: likesSum }));
    });

    // 2. Sync Views & Shares: Listen to the global metadata document
    const statsRef = doc(db, "siteStats", "metadata");
    const unsubStats = onSnapshot(statsRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setStatsData((prev) => ({
          ...prev,
          views: data.views || 0,
          shares: data.shares || 0,
        }));
      }
    });

    return () => {
      unsubPosts();
      unsubStats();
    };
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num.toString();
  };

  const displayStats = [
    {
      value: formatNumber(statsData.views),
      label: "Views",
      color: "bg-red-950",
    },
    {
      value: formatNumber(statsData.likes),
      label: "Likes",
      color: "bg-red-900",
    },
    {
      value: formatNumber(statsData.shares),
      label: "Shares",
      color: "bg-stone-900",
    },
  ];

  return (
    <section className="grid grid-cols-3 gap-2 md:gap-4">
      {displayStats.map((stat) => (
        <div
          key={stat.label}
          className={`${stat.color} text-white rounded-2xl p-3 md:p-5 shadow-sm transition-all duration-700`}
        >
          <h1 className="text-xl md:text-3xl font-black tabular-nums">
            {stat.value}
          </h1>
          <p className="text-[10px] md:text-xs uppercase tracking-wider opacity-70 font-medium">
            {stat.label}
          </p>
        </div>
      ))}
    </section>
  );
}
