export interface TimeEntry {
  url: string;
  duration: number;
  lastVisited: number;
}

export interface DailyStats {
  [date: string]: {
    [domain: string]: number;
  };
}

export class StorageService {
  async saveTimeEntry(entry: TimeEntry): Promise<void> {
    const data = await this.getAllTimeEntries();
    const domain = new URL(entry.url).hostname;
    data[domain] = entry;
    await chrome.storage.local.set({ timeEntries: data });
  }

  async getAllTimeEntries(): Promise<Record<string, TimeEntry>> {
    const result = await chrome.storage.local.get('timeEntries');
    return result.timeEntries || {};
  }

  async saveDailyStats(stats: DailyStats): Promise<void> {
    await chrome.storage.local.set({ dailyStats: stats });
  }

  async getDailyStats(): Promise<DailyStats> {
    const result = await chrome.storage.local.get('dailyStats');
    return result.dailyStats || {};
  }
}