import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';
import { Subscription } from '../types';
import { serviceData, categoryNames } from '../serviceData';

interface Props {
  subscriptions: Subscription[];
}

const CATEGORY_COLORS: Record<string, string> = {
  OTT: '#ef4444',
  Music: '#f97316',
  Shopping: '#eab308',
  AI: '#8b5cf6',
  Productivity: '#3b82f6',
  Design: '#ec4899',
  Dev: '#6366f1',
  Content: '#14b8a6',
  Gaming: '#22c55e',
  Cloud: '#06b6d4',
  Fitness: '#f43f5e',
  Delivery: '#fb923c',
  Telecom: '#a855f7',
  Webtoon: '#2dd4bf',
  custom: '#737373',
};

const KR_AVG_MONTHLY = 125000;

function buildMonthlyTrend(subscriptions: Subscription[]) {
  const now = new Date();
  const months: { label: string; total: number }[] = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = `${d.getMonth() + 1}월`;
    const endOfMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0);

    const activeSubs = subscriptions.filter((s) => {
      const created = new Date(s.created_at);
      return created <= endOfMonth;
    });

    const total = activeSubs.reduce((sum, s) => sum + s.price, 0);
    months.push({ label, total });
  }

  return months;
}

export default function SpendingAnalysis({ subscriptions }: Props) {
  const totalMonthly = subscriptions.reduce((sum, s) => sum + s.price, 0);
  const totalYearly = totalMonthly * 12;
  const avgPerSub = subscriptions.length > 0 ? Math.round(totalMonthly / subscriptions.length) : 0;

  const monthlyTrend = buildMonthlyTrend(subscriptions);
  const prevMonth = monthlyTrend.length >= 2 ? monthlyTrend[monthlyTrend.length - 2].total : 0;
  const diff = totalMonthly - prevMonth;

  const categoryData = Object.entries(
    subscriptions.reduce<Record<string, number>>((acc, sub) => {
      const category = sub.is_custom ? 'custom' : (serviceData[sub.name]?.category ?? 'custom');
      acc[category] = (acc[category] || 0) + sub.price;
      return acc;
    }, {})
  )
    .map(([category, total]) => ({
      name: categoryNames[category] || '기타',
      value: total,
      category,
    }))
    .sort((a, b) => b.value - a.value);

  const topSubs = [...subscriptions]
    .sort((a, b) => b.price - a.price)
    .slice(0, 5)
    .map(s => ({ name: s.name, price: s.price }));

  if (subscriptions.length === 0) {
    return (
      <div className="text-neutral-600 text-sm py-16 text-center">
        구독을 추가하면 분석을 확인할 수 있습니다
      </div>
    );
  }

  return (
    <div className="fade-in space-y-10">
      {/* 요약 카드 */}
      <div>
        <p className="text-neutral-500 text-xs tracking-widest uppercase mb-4">요약</p>
        <div className="grid grid-cols-3 gap-3">
          <div className="border border-neutral-800 p-4">
            <p className="text-neutral-600 text-xs mb-1">월간</p>
            <p className="text-lg font-normal">₩{totalMonthly.toLocaleString()}</p>
            {diff !== 0 && (
              <p className={`text-xs mt-1 ${diff > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                {diff > 0 ? '▲' : '▼'} ₩{Math.abs(diff).toLocaleString()}
              </p>
            )}
          </div>
          <div className="border border-neutral-800 p-4">
            <p className="text-neutral-600 text-xs mb-1">연간</p>
            <p className="text-lg font-normal">₩{totalYearly.toLocaleString()}</p>
          </div>
          <div className="border border-neutral-800 p-4">
            <p className="text-neutral-600 text-xs mb-1">평균</p>
            <p className="text-lg font-normal">₩{avgPerSub.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* 한국 평균 벤치마크 */}
      <div className="border border-neutral-800 p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-neutral-500 text-xs tracking-widest uppercase">한국 평균 대비</p>
          <span className="text-xs text-neutral-600">한국 평균 ₩{KR_AVG_MONTHLY.toLocaleString()}/월</span>
        </div>
        <div className="h-3 bg-neutral-900 rounded-full overflow-hidden relative">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${Math.min((totalMonthly / (KR_AVG_MONTHLY * 1.5)) * 100, 100)}%`,
              backgroundColor: totalMonthly > KR_AVG_MONTHLY ? '#ef4444' : '#22c55e',
            }}
          />
          <div
            className="absolute top-0 h-full w-0.5 bg-neutral-400"
            style={{ left: `${(KR_AVG_MONTHLY / (KR_AVG_MONTHLY * 1.5)) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className={`text-sm ${totalMonthly <= KR_AVG_MONTHLY ? 'text-emerald-400' : 'text-red-400'}`}>
            ₩{totalMonthly.toLocaleString()}
          </span>
          <span className="text-xs text-neutral-600">
            평균보다 {totalMonthly > KR_AVG_MONTHLY
              ? `₩${(totalMonthly - KR_AVG_MONTHLY).toLocaleString()} 더 써요`
              : totalMonthly < KR_AVG_MONTHLY
                ? `₩${(KR_AVG_MONTHLY - totalMonthly).toLocaleString()} 절약 중`
                : '비슷해요'}
          </span>
        </div>
      </div>

      {/* 월별 추이 차트 */}
      <div>
        <p className="text-neutral-500 text-xs tracking-widest uppercase mb-4">최근 6개월 추이</p>
        <div style={{ height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyTrend} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#737373', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#525252', fontSize: 11 }}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                width={40}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#171717',
                  border: '1px solid #262626',
                  borderRadius: 4,
                  color: '#e5e5e5',
                  fontSize: 13,
                }}
                formatter={(value: number) => [`₩${value.toLocaleString()}`, '월 지출']}
              />
              <ReferenceLine
                y={KR_AVG_MONTHLY}
                stroke="#525252"
                strokeDasharray="4 4"
                label={{ value: '한국 평균', fill: '#525252', fontSize: 10, position: 'right' }}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#8b5cf6"
                strokeWidth={2}
                fill="url(#colorTotal)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 도넛 차트 */}
      <div>
        <p className="text-neutral-500 text-xs tracking-widest uppercase mb-4">카테고리별 비율</p>
        <div className="relative" style={{ height: 240 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {categoryData.map((entry, i) => (
                  <Cell key={i} fill={CATEGORY_COLORS[entry.category] || '#525252'} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-neutral-500 text-xs">합계</p>
            <p className="text-xl font-normal">₩{totalMonthly.toLocaleString()}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {categoryData.map((entry) => (
            <div key={entry.category} className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: CATEGORY_COLORS[entry.category] || '#525252' }}
              />
              <span className="text-sm text-neutral-400 flex-1 truncate">{entry.name}</span>
              <span className="text-sm text-neutral-500">₩{entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 상위 구독 TOP 5 */}
      {topSubs.length > 1 && (
        <div>
          <p className="text-neutral-500 text-xs tracking-widest uppercase mb-4">상위 구독</p>
          <div className="space-y-3">
            {topSubs.map((sub, i) => {
              const widthPercent = (sub.price / topSubs[0].price) * 100;
              return (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-300">{sub.name}</span>
                    <span className="text-neutral-500">₩{sub.price.toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 bg-neutral-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white/30 rounded-full transition-all"
                      style={{ width: `${widthPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 해지 시 절약 시뮬레이션 */}
      <div>
        <p className="text-neutral-500 text-xs tracking-widest uppercase mb-4">해지하면 얼마나?</p>
        <div className="space-y-2">
          {[...subscriptions]
            .sort((a, b) => b.price - a.price)
            .slice(0, 5)
            .map((sub) => (
              <div key={sub.id} className="flex items-center justify-between text-sm border border-neutral-800/50 p-3">
                <span className="text-neutral-300">{sub.name}</span>
                <span className="text-emerald-400/80">
                  연 ₩{(sub.price * 12).toLocaleString()} 절약
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* 일 평균 지출 */}
      <div className="border border-neutral-800 p-6 text-center">
        <p className="text-neutral-600 text-xs tracking-widest uppercase mb-2">일 평균 지출</p>
        <p className="text-3xl font-normal">₩{Math.round(totalMonthly / 30).toLocaleString()}</p>
        <p className="text-neutral-600 text-sm mt-1">하루</p>
      </div>
    </div>
  );
}
