import { StorageService, TimeEntry } from './StorageService';
import { format } from 'date-fns';

export class TimeTrackerService {
  private currentUrl: string | null = null;
  private startTime: number | null = null;
  private storage: StorageService;

  constructor(storage: StorageService) {
    this.storage = storage;
  }

  startTracking(url: string): void {
    if (this.currentUrl) {
      this.saveCurrentSession();
    }
    
    this.currentUrl = url;
    this.startTime = Date.now();
  }

  async saveCurrentSession(): Promise<void> {
    if (!this.currentUrl || !this.startTime) return;

    const duration = Date.now() - this.startTime;
    const entry: TimeEntry = {
      url: this.currentUrl,
      duration,
      lastVisited: Date.now(),
    };

    await this.storage.saveTimeEntry(entry);
    await this.updateDailyStats(this.currentUrl, duration);

    this.currentUrl = null;
    this.startTime = null;
  }

  private async updateDailyStats(url: string, duration: number): Promise<void> {
    const stats = await this.storage.getDailyStats();
    const today = format(new Date(), 'yyyy-MM-dd');
    const domain = new URL(url).hostname;

    if (!stats[today]) {
      stats[today] = {};
    }

    stats[today][domain] = (stats[today][domain] || 0) + duration;
    await this.storage.saveDailyStats(stats);
  }
}