import { useState, useRef, useEffect } from 'react';
import {
  NotificationItem,
  NotificationSettings,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
  requestBrowserPermission,
  getBrowserPermissionStatus,
  loadSettings,
  saveSettings,
} from '../services/notificationService';

interface Props {
  notifications: NotificationItem[];
  onRefresh: () => void;
}

export default function NotificationCenter({ notifications, onRefresh }: Props) {
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<NotificationSettings>(loadSettings);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = getUnreadCount(notifications);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setShowSettings(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  function handleMarkAllRead() {
    markAllAsRead(notifications);
    onRefresh();
  }

  function handleMarkRead(id: string) {
    markAsRead(id);
    onRefresh();
  }

  async function handleToggleBrowser() {
    if (!settings.browserEnabled) {
      const granted = await requestBrowserPermission();
      if (!granted) return;
    }
    const next = { ...settings, browserEnabled: !settings.browserEnabled };
    setSettings(next);
    saveSettings(next);
  }

  function handleToggleDay(day: number) {
    const days = settings.alertDays.includes(day)
      ? settings.alertDays.filter(d => d !== day)
      : [...settings.alertDays, day].sort((a, b) => a - b);
    const next = { ...settings, alertDays: days };
    setSettings(next);
    saveSettings(next);
    onRefresh();
  }

  const browserStatus = getBrowserPermissionStatus();

  function getDotColor(n: NotificationItem) {
    if (n.type === 'trial') return 'bg-emerald-500';
    if (n.daysLeft <= 1) return 'bg-red-500';
    return 'bg-amber-500';
  }

  function getDotGlow(n: NotificationItem) {
    if (n.type === 'trial') return 'shadow-[0_0_6px_rgba(16,185,129,0.4)]';
    if (n.daysLeft <= 1) return 'shadow-[0_0_6px_rgba(239,68,68,0.4)]';
    return 'shadow-[0_0_6px_rgba(245,158,11,0.4)]';
  }

  return (
    <div ref={ref} className="relative">
      {/* 벨 아이콘 버튼 */}
      <button
        onClick={() => { setOpen(!open); setShowSettings(false); }}
        className="relative p-1.5 text-neutral-400 hover:text-white transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 flex items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white px-1">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* 드롭다운 */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-neutral-900 border border-neutral-800 shadow-2xl z-50 slide-up">
          {/* 헤더 */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white">알림</span>
              {unreadCount > 0 && (
                <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="text-[10px] tracking-wider uppercase text-neutral-500 hover:text-white transition-colors"
                >
                  모두 읽음
                </button>
              )}
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* 설정 패널 */}
          {showSettings && (
            <div className="px-4 py-3 border-b border-neutral-800 space-y-3">
              <p className="text-[10px] tracking-widest uppercase text-neutral-500">알림 설정</p>

              {/* 브라우저 알림 토글 */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">브라우저 알림</span>
                <button
                  onClick={handleToggleBrowser}
                  disabled={browserStatus === 'denied' || browserStatus === 'unsupported'}
                  className="relative"
                >
                  <div className={`w-9 h-5 rounded-full transition-colors ${
                    settings.browserEnabled && browserStatus === 'granted'
                      ? 'bg-emerald-500'
                      : 'bg-neutral-700'
                  } ${browserStatus === 'denied' || browserStatus === 'unsupported' ? 'opacity-40' : ''}`}>
                    <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-[3px] transition-transform ${
                      settings.browserEnabled && browserStatus === 'granted'
                        ? 'translate-x-[18px]'
                        : 'translate-x-[3px]'
                    }`} />
                  </div>
                </button>
              </div>
              {browserStatus === 'denied' && (
                <p className="text-[10px] text-red-400">브라우저에서 알림이 차단되어 있습니다</p>
              )}

              {/* 알림 타이밍 */}
              <div>
                <span className="text-xs text-neutral-400 block mb-2">알림 시점</span>
                <div className="flex gap-2">
                  {[
                    { day: 0, label: 'D-day' },
                    { day: 1, label: 'D-1' },
                    { day: 3, label: 'D-3' },
                  ].map(({ day, label }) => (
                    <button
                      key={day}
                      onClick={() => handleToggleDay(day)}
                      className={`px-3 py-1.5 text-xs transition-colors ${
                        settings.alertDays.includes(day)
                          ? 'bg-white text-black font-medium'
                          : 'border border-neutral-700 text-neutral-500 hover:text-white'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 알림 목록 */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-10 text-center">
                <p className="text-neutral-600 text-sm">예정된 알림이 없습니다</p>
              </div>
            ) : (
              notifications.map((n) => (
                <button
                  key={n.id}
                  onClick={() => handleMarkRead(n.id)}
                  className={`w-full text-left px-4 py-3 border-b border-neutral-800/50 hover:bg-neutral-800/30 transition-colors ${
                    n.read ? 'opacity-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${getDotColor(n)} ${!n.read ? getDotGlow(n) : ''}`} />
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${n.read ? 'text-neutral-500' : 'text-white font-medium'}`}>
                        {n.title}
                      </p>
                      <p className="text-xs text-neutral-500 mt-0.5">{n.body}</p>
                    </div>
                    {!n.read && (
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
