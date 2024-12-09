import { StorageService } from '../services/StorageService';
import { TimeTrackerService } from '../services/TimeTrackerService';

const storage = new StorageService();
const timeTracker = new TimeTrackerService(storage);

// Track active tab changes
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  if (tab.url) {
    timeTracker.startTracking(tab.url);
  }
});

// Track URL changes within the same tab
chrome.tabs.onUpdated.addListener((_, changeInfo) => {
  if (changeInfo.url) {
    timeTracker.startTracking(changeInfo.url);
  }
});

// Save data when the browser is closed
chrome.runtime.onSuspend.addListener(() => {
  timeTracker.saveCurrentSession();
});