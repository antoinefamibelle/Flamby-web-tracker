import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { StorageService, DailyStats } from "@/services/StorageService";

export default function StatsView() {
  const [stats, setStats] = useState<DailyStats>({});
  const [period, setPeriod] = useState("week");
  const storage = new StorageService();

  useEffect(() => {
    const loadStats = async () => {
      const data = await storage.getDailyStats();
      setStats(data);
    };
    loadStats();
  }, []);

  const chartData = Object.entries(stats).map(([date, domains]) => ({
    date,
    total: Object.values(domains).reduce((acc, time) => acc + time, 0) / (60 * 1000), // Convert to minutes
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Usage Statistics</h2>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="p-4">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}