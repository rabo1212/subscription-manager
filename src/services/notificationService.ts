import { Subscription } from '../types';
import { calculateDday, calculateTrialDaysLeft } from '../serviceData';

// --- 타입 정의 (Capacitor LocalNotifications와 유사한 패턴) ---

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  type: 'billing' | 'trial';
  subscriptionId: string;
  subscriptionName: string;
  daysLeft: number;
  price: number;
  read: boolean;
  createdDate: string; // YYYY-MM-DD
}

export interface NotificationSettings {
  browserEnabled: boolean;
  alertDays: number[]; // ex: [0, 1, 3] → D-day, D-1, D-3
}

const STORAGE_KEY = 'mitdok_notifications';
const SETTINGS_KEY = 'mitdok_notification_settings';
const LAST_BROWSER_NOTIFY_KEY = 'mitdok_last_browser_notify';

// --- 설정 ---

const DEFAULT_SETTINGS: NotificationSettings = {
  browserEnabled: false,
  alertDays: [0, 1, 3],
};

export function loadSettings(): NotificationSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return { ...DEFAULT_SETTINGS };
}

export function saveSettings(settings: NotificationSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

// --- 읽음 상태 관리 ---

function loadReadIds(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw));
  } catch { /* ignore */ }
  return new Set();
}

function saveReadIds(ids: Set<string>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
}

// --- 알림 생성 ---

export function generateNotifications(
  subscriptions: Subscription[],
  settings?: NotificationSettings
): NotificationItem[] {
  const { alertDays } = settings || loadSettings();
  const readIds = loadReadIds();
  const today = new Date().toISOString().split('T')[0];
  const notifications: NotificationItem[] = [];

  for (const sub of subscriptions) {
    // 결제일 알림
    const dday = calculateDday(sub.billing_day);
    if (alertDays.includes(dday)) {
      const id = `billing-${sub.id}-${today}-d${dday}`;
      notifications.push({
        id,
        title: dday === 0
          ? `${sub.name} 결제일`
          : `${sub.name} 결제 D-${dday}`,
        body: dday === 0
          ? `오늘 ${sub.price.toLocaleString()}원이 결제됩니다`
          : `${dday}일 후 ${sub.price.toLocaleString()}원이 결제됩니다`,
        type: 'billing',
        subscriptionId: sub.id,
        subscriptionName: sub.name,
        daysLeft: dday,
        price: sub.price,
        read: readIds.has(id),
        createdDate: today,
      });
    }

    // 무료체험 만료 알림
    if (sub.is_trial && sub.trial_end_date) {
      const trialDays = calculateTrialDaysLeft(sub.trial_end_date);
      if (trialDays >= 0 && alertDays.includes(trialDays)) {
        const id = `trial-${sub.id}-${today}-d${trialDays}`;
        notifications.push({
          id,
          title: trialDays === 0
            ? `${sub.name} 무료체험 만료`
            : `${sub.name} 무료체험 D-${trialDays}`,
          body: trialDays === 0
            ? '오늘 무료체험이 종료됩니다'
            : `${trialDays}일 후 체험이 종료됩니다`,
          type: 'trial',
          subscriptionId: sub.id,
          subscriptionName: sub.name,
          daysLeft: trialDays,
          price: sub.price,
          read: readIds.has(id),
          createdDate: today,
        });
      }
    }
  }

  // D-day가 가까운 순서로 정렬
  notifications.sort((a, b) => a.daysLeft - b.daysLeft);
  return notifications;
}

// --- 읽음 처리 ---

export function markAsRead(notificationId: string): void {
  const ids = loadReadIds();
  ids.add(notificationId);
  saveReadIds(ids);
}

export function markAllAsRead(notifications: NotificationItem[]): void {
  const ids = loadReadIds();
  for (const n of notifications) ids.add(n.id);
  saveReadIds(ids);
}

export function getUnreadCount(notifications: NotificationItem[]): number {
  return notifications.filter(n => !n.read).length;
}

// --- 브라우저 알림 (Web Notification API) ---

export async function requestBrowserPermission(): Promise<boolean> {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;
  const result = await Notification.requestPermission();
  return result === 'granted';
}

export function getBrowserPermissionStatus(): 'granted' | 'denied' | 'default' | 'unsupported' {
  if (!('Notification' in window)) return 'unsupported';
  return Notification.permission;
}

export function showBrowserNotification(title: string, body: string): void {
  if (!('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;
  new Notification(title, {
    body,
    icon: '/favicon.svg',
    badge: '/favicon.svg',
  });
}

/**
 * 앱 접속 시 브라우저 알림 표시 (하루 1회 제한)
 */
export function triggerDailyBrowserNotifications(notifications: NotificationItem[]): void {
  const settings = loadSettings();
  if (!settings.browserEnabled) return;
  if (Notification.permission !== 'granted') return;

  const today = new Date().toISOString().split('T')[0];
  const lastNotified = localStorage.getItem(LAST_BROWSER_NOTIFY_KEY);
  if (lastNotified === today) return;

  const unread = notifications.filter(n => !n.read);
  if (unread.length === 0) return;

  if (unread.length === 1) {
    showBrowserNotification(unread[0].title, unread[0].body);
  } else {
    showBrowserNotification(
      `믿독 알림 ${unread.length}건`,
      unread.map(n => n.title).join(', ')
    );
  }

  localStorage.setItem(LAST_BROWSER_NOTIFY_KEY, today);
}
