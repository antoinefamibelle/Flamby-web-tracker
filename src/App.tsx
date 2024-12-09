import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Timer, PieChart, Calendar } from "lucide-react";
import DashboardView from "./components/DashboardView";
import StatsView from "./components/StatsView";
import HistoryView from "./components/HistoryView";

function App() {
  return (
    <div className="w-[400px] h-[500px] p-4 bg-background text-foreground">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Timer className="w-6 h-6" />
          <h1 className="text-xl font-bold">Screen Time Tracker</h1>
        </div>
      </header>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <PieChart className="w-4 h-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Stats
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Timer className="w-4 h-4" />
            History
          </TabsTrigger>
        </TabsList>

        <Card className="mt-4 p-4">
          <TabsContent value="dashboard">
            <DashboardView />
          </TabsContent>
          <TabsContent value="stats">
            <StatsView />
          </TabsContent>
          <TabsContent value="history">
            <HistoryView />
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
}

export default App;