import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow, format } from "date-fns";
import { Globe } from "lucide-react";
import { StorageService, TimeEntry } from "@/services/StorageService";

export default function HistoryView() {
  const [entries, setEntries] = useState<Record<string, TimeEntry>>({});
  const storage = new StorageService();

  useEffect(() => {
    const loadData = async () => {
      const data = await storage.getAllTimeEntries();
      setEntries(data);
    };
    loadData();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Browsing History</h2>
      
      <ScrollArea className="h-[350px] pr-4">
        <div className="space-y-2">
          {Object.entries(entries)
            .sort((a, b) => b[1].lastVisited - a[1].lastVisited)
            .map(([domain, entry]) => (
              <Card key={domain} className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <div>
                      <p className="font-medium">{domain}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(entry.lastVisited, "MMM d, yyyy h:mm a")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {Math.round(entry.duration / 1000 / 60)} mins
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(entry.lastVisited)} ago
                    </p>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </ScrollArea>
    </div>
  );
}