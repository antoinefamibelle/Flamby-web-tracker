import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatDistanceToNow } from "date-fns";
import { Clock, Globe } from "lucide-react";
import { StorageService, TimeEntry } from "@/services/StorageService";

export default function DashboardView() {
  const [entries, setEntries] = useState<Record<string, TimeEntry>>({});
  const storage = new StorageService();

  useEffect(() => {
    const loadData = async () => {
      const data = await storage.getAllTimeEntries();
      setEntries(data);
    };
    loadData();
  }, []);

  const totalTime = Object.values(entries).reduce(
    (acc, entry) => acc + entry.duration,
    0
  );

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4">Today's Overview</h2>
      
      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="font-medium">Total Screen Time</span>
          </div>
          <span className="text-lg font-bold">
            {Math.round(totalTime / 1000 / 60)} mins
          </span>
        </div>
        <Progress value={Math.min((totalTime / (8 * 60 * 60 * 1000)) * 100, 100)} />
      </Card>

      <div className="space-y-2">
        <h3 className="text-sm font-medium mb-2">Top Sites</h3>
        {Object.entries(entries)
          .sort((a, b) => b[1].duration - a[1].duration)
          .slice(0, 5)
          .map(([domain, entry]) => (
            <Card key={domain} className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <div>
                    <p className="font-medium">{domain}</p>
                    <p className="text-sm text-muted-foreground">
                      Last visited {formatDistanceToNow(entry.lastVisited)} ago
                    </p>
                  </div>
                </div>
                <span className="font-medium">
                  {Math.round(entry.duration / 1000 / 60)} mins
                </span>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
}