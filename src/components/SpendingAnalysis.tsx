import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
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
  custom: '#737373',
};

export default function SpendingAnalysis({ subscriptions }: Props) {
  const totalMonthly = subscriptions.reduce((sum, s) => sum + s.price, 0);
  const totalYearly = totalMonthly * 12;
  const avgPerSub = subscriptions.length > 0 ? Math.round(totalMonthly / subscriptions.length) : 0;

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

      {/* 일 평균 지출 */}
      <div className="border border-neutral-800 p-6 text-center">
        <p className="text-neutral-600 text-xs tracking-widest uppercase mb-2">일 평균 지출</p>
        <p className="text-3xl font-normal">₩{Math.round(totalMonthly / 30).toLocaleString()}</p>
        <p className="text-neutral-600 text-sm mt-1">하루</p>
      </div>
    </div>
  );
}
