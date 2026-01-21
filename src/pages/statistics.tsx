import {
  TrendingUp,
  Users,
  Share2,
  Eye,
  ArrowUpRight,
  Calendar,
  ChevronRight,
} from "lucide-react";

export default function StatisticsPage() {
  return (
    <div className="pb-24 p-4 md:p-8 bg-gray-50 min-h-screen space-y-6">
      {/* HEADER */}
      <header className="flex justify-between items-center">
        {/* <div>
          <h1 className="text-2xl font-black text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500 font-medium">
            Overview of your ministry reach
          </p>
        </div> */}
        <button className="bg-white p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
          <Calendar size={20} />
        </button>
      </header>

      {/* PRIMARY STATS GRID */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Eye className="text-blue-600" size={20} />}
          label="Total Views"
          value="42.8k"
          trend="+12%"
        />
        <StatCard
          icon={<Users className="text-purple-600" size={20} />}
          label="Active Users"
          value="2,405"
          trend="+5.4%"
        />
        <StatCard
          icon={<Share2 className="text-green-600" size={20} />}
          label="Shares"
          value="892"
          trend="+18%"
        />
        <StatCard
          icon={<TrendingUp className="text-red-600" size={20} />}
          label="Avg. Reading Time"
          value="4m 12s"
          trend="-2%"
          negative
        />
      </section>

      {/* DETAILED INSIGHTS SECTION */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* TOP PERFORMING POSTS */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-gray-800">Top Reflections</h2>
            <button className="text-xs font-bold text-red-800 hover:underline flex items-center gap-1">
              View All <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-4">
            {[
              {
                title: "Walking in Faith",
                views: "1.2k",
                shares: "45",
                growth: 85,
              },
              {
                title: "Strength in the Storm",
                views: "980",
                shares: "32",
                growth: 70,
              },
              {
                title: "The Power of Prayer",
                views: "850",
                shares: "28",
                growth: 60,
              },
            ].map((post, i) => (
              <div
                key={i}
                className="group flex items-center justify-between p-3 hover:bg-gray-50 rounded-2xl transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center font-bold text-red-800">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">
                      {post.title}
                    </p>
                    <p className="text-xs text-gray-400">
                      {post.views} views • {post.shares} shares
                    </p>
                  </div>
                </div>
                <div className="w-24 bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-red-800 h-full rounded-full"
                    style={{ width: `${post.growth}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AUDIENCE RETENTION / DEVICE STATS */}
        <div className="bg-red-950 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="relative">
            <h2 className="font-bold mb-4 opacity-90">User Retention</h2>
            <div className="text-4xl font-black mb-2">78%</div>
            <p className="text-xs opacity-70 mb-6">
              Users returning weekly to read their daily word.
            </p>

            <div className="space-y-4">
              <div className="flex justify-between text-xs">
                <span>Mobile App</span>
                <span>65%</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full">
                <div className="bg-white h-full rounded-full w-[65%]" />
              </div>

              <div className="flex justify-between text-xs">
                <span>Web Browser</span>
                <span>35%</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full">
                <div className="bg-white/40 h-full rounded-full w-[35%]" />
              </div>
            </div>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/**
 * REUSABLE STAT CARD
 */
function StatCard({ icon, label, value, trend, negative }: any) {
  return (
    <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="p-2 bg-gray-50 rounded-xl">{icon}</div>
        <div
          className={`flex items-center text-[10px] font-bold px-2 py-1 rounded-full ${
            negative ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
          }`}
        >
          <ArrowUpRight size={10} className={negative ? "rotate-90" : ""} />
          {trend}
        </div>
      </div>
      <h3 className="text-2xl font-black text-gray-800">{value}</h3>
      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">
        {label}
      </p>
    </div>
  );
}
