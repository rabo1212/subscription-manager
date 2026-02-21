import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { Subscription } from '../types';
import { calculateDday } from '../serviceData';

interface UserGroup {
  userId: string;
  subscriptions: Subscription[];
  totalPrice: number;
}

export default function AdminPanel() {
  const [users, setUsers] = useState<UserGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  useEffect(() => { fetchAll(); }, []);

  async function fetchAll() {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase.from('subscriptions').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      const grouped = new Map<string, Subscription[]>();
      for (const sub of data) {
        const uid = sub.user_id ?? 'unknown';
        if (!grouped.has(uid)) grouped.set(uid, []);
        grouped.get(uid)!.push(sub);
      }
      setUsers(Array.from(grouped.entries()).map(([userId, subs]) => ({
        userId,
        subscriptions: subs,
        totalPrice: subs.reduce((sum, s) => sum + s.price, 0),
      })));
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!supabase || !confirm('삭제할까요?')) return;
    const { error } = await supabase.from('subscriptions').delete().eq('id', id);
    if (!error) {
      setUsers(prev => prev
        .map(u => ({ ...u, subscriptions: u.subscriptions.filter(s => s.id !== id), totalPrice: u.subscriptions.filter(s => s.id !== id).reduce((sum, s) => sum + s.price, 0) }))
        .filter(u => u.subscriptions.length > 0));
    }
  }

  const totalSubs = users.reduce((s, u) => s + u.subscriptions.length, 0);
  const totalRevenue = users.reduce((s, u) => s + u.totalPrice, 0);

  if (loading) return <p className="text-neutral-600 text-sm py-8 text-center">불러오는 중...</p>;

  return (
    <div className="fade-in">
      {/* 요약 */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="border border-neutral-800 p-4">
          <p className="text-neutral-500 text-xs tracking-widest uppercase mb-1">유저</p>
          <p className="text-xl font-light">{users.length}<span className="text-neutral-500 text-sm ml-1">명</span></p>
        </div>
        <div className="border border-neutral-800 p-4">
          <p className="text-neutral-500 text-xs tracking-widest uppercase mb-1">구독</p>
          <p className="text-xl font-light">{totalSubs}<span className="text-neutral-500 text-sm ml-1">건</span></p>
        </div>
        <div className="border border-neutral-800 p-4">
          <p className="text-neutral-500 text-xs tracking-widest uppercase mb-1">총액</p>
          <p className="text-xl font-light">₩{totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      {users.length === 0 ? (
        <p className="text-neutral-600 text-sm text-center py-8">데이터 없음</p>
      ) : (
        <div className="space-y-2">
          {users.map(u => (
            <div key={u.userId} className="border border-neutral-800">
              <button
                onClick={() => setExpandedUser(expandedUser === u.userId ? null : u.userId)}
                className="w-full flex items-center justify-between p-4 hover:bg-neutral-900 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-normal">{u.userId.slice(0, 8)}...</span>
                  <span className="text-xs text-neutral-600">{u.subscriptions.length}건</span>
                </div>
                <span className="text-sm font-light">₩{u.totalPrice.toLocaleString()}</span>
              </button>
              {expandedUser === u.userId && (
                <div className="border-t border-neutral-900 px-4 pb-3">
                  {u.subscriptions.map(sub => {
                    const dday = calculateDday(sub.billing_day);
                    return (
                      <div key={sub.id} className="flex items-center justify-between py-3 border-b border-neutral-900 last:border-0">
                        <div>
                          <span className="text-sm">{sub.name}</span>
                          <span className="text-neutral-600 text-xs ml-2">{sub.plan}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm">₩{sub.price.toLocaleString()}</span>
                          <span className={`text-xs ${dday <= 3 ? 'text-red-500' : 'text-neutral-600'}`}>D-{dday}</span>
                          <button onClick={() => handleDelete(sub.id)} className="text-neutral-700 hover:text-red-500 text-xs transition-colors">삭제</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
