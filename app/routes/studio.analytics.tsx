import { BarChart2, Eye, ThumbsUp, Users } from 'lucide-react';
import type { Route } from './+types/studio.analytics';
export function meta({ }: Route.MetaArgs) {
  return [{ title: "Analytics - Youtube Studio" }];
}
export default function StudioAnalytics() {
  const stats = [
    { label: 'Views', value: '127K', icon: Eye, color: 'text-blue-500' },
    { label: 'Likes', value: '12.5K', icon: ThumbsUp, color: 'text-green-500' },
    { label: 'Subscribers', value: '1.2M', icon: Users, color: 'text-purple-500' },
    { label: 'Watch Time', value: '45K Hrs', icon: BarChart2, color: 'text-orange-500' },
  ];
  const chartData = [20, 45, 35, 60, 55, 75, 90, 80, 95, 100, 120, 110];
  return (
    <div className="min-h-screen bg-[#1f1f1f] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Channel Analytics</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-[#282828] rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-zinc-400">{stat.label}</span>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-green-500 mt-1">+12% From Last Month</div>
            </div>
          ))}
        </div>
        <div className="bg-[#282828] rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Views Over Time</h2>
          <div className="flex items-end justify-between h-64 gap-2">
            {chartData.map((value, index) => (
              <div key={index} className="flex-1 bg-blue-600 rounded-t" style={{ height: `${value}%` }}></div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-zinc-400">
            <span>Jan</span>
            <span>Dec</span>
          </div>
        </div>
      </div>
    </div>
  )
}