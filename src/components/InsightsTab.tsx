import { Subscription } from '../types';
import { serviceData, categoryNames } from '../serviceData';

interface Props {
  subscriptions: Subscription[];
  onUpdateUsageStatus: (id: string, status: 'using' | 'not_using') => Promise<void>;
  onUpdateDowngradeNeeded: (id: string, needed: boolean) => Promise<void>;
}

// 서비스별 다운그레이드 질문
const DOWNGRADE_QUESTIONS: Record<string, Record<string, string>> = {
  'Netflix': {
    '프리미엄': '4K 화질 / 동시 4명 시청 필요하세요?',
    '스탠다드': '동시 2명 시청 필요하세요?',
  },
  'YouTube Premium': {
    '개인': '광고 제거, 백그라운드 재생 필요하세요?',
  },
  'Spotify': {
    '패밀리': '가족이랑 같이 쓰시나요?',
    '듀오': '2명이서 같이 쓰시나요?',
  },
  'Claude': {
    'Max 5x': '긴 문서 작업, 대량 사용 필요하세요?',
    'Max 20x': '긴 문서 작업, 대량 사용 필요하세요?',
    'Pro': '무료보다 더 많이 쓰시나요?',
  },
  'ChatGPT': {
    'Pro': '고급 추론, 대량 사용 필요하세요?',
    'Plus': 'GPT-4, 이미지 생성 필요하세요?',
  },
  'Adobe CC': {
    '전체 앱': '2개 이상 Adobe 앱 쓰시나요?',
    '단일 앱': '이 앱 자주 쓰시나요?',
  },
  'Notion': {
    'Plus': '무료 용량 초과해서 쓰시나요?',
    'Business': '팀 기능이 필요하세요?',
  },
  'Google One': {
    '2TB': '200GB 이상 저장 필요하세요?',
    '200GB': '100GB 이상 저장 필요하세요?',
  },
  'iCloud+': {
    '2TB': '200GB 이상 저장 필요하세요?',
    '200GB': '50GB 이상 저장 필요하세요?',
  },
  'Microsoft 365': {
    'Family': '가족이랑 같이 쓰시나요?',
  },
  'Midjourney': {
    'Standard': '하루 25장 이상 생성하시나요?',
    'Pro': '하루 25장 이상 생성하시나요?',
    'Mega': '하루 25장 이상 생성하시나요?',
  },
};

const DEFAULT_QUESTION = '이 요금제의 추가 기능이 필요하세요?';

// 믿독 유저 평균 (고정값)
const AVG_SUB_COUNT = 7.3;
const AVG_MONTHLY = 89400;

function getDaysSince(dateStr: string): number {
  const created = new Date(dateStr);
  const now = new Date();
  return Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
}

function getDowngrade(sub: Subscription): { cheapestPlan: string; cheapestPrice: number; saving: number } | null {
  if (sub.is_custom) return null;
  const service = serviceData[sub.name];
  if (!service || service.plans.length <= 1) return null;
  const cheapest = service.plans.reduce((min, p) => p.price < min.price ? p : min);
  if (cheapest.price >= sub.price) return null;
  return { cheapestPlan: cheapest.name, cheapestPrice: cheapest.price, saving: sub.price - cheapest.price };
}

function getDowngradeQuestion(serviceName: string, planName: string | null): string {
  if (!planName) return DEFAULT_QUESTION;
  return DOWNGRADE_QUESTIONS[serviceName]?.[planName] ?? DEFAULT_QUESTION;
}

function findDuplicates(subs: Subscription[]) {
  const byCategory: Record<string, Subscription[]> = {};
  for (const sub of subs) {
    const cat = sub.is_custom ? null : serviceData[sub.name]?.category;
    if (!cat) continue;
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(sub);
  }
  return Object.entries(byCategory)
    .filter(([, items]) => items.length >= 2)
    .map(([category, items]) => {
      const sorted = [...items].sort((a, b) => b.price - a.price);
      return { category, items: sorted, potentialSaving: sorted[0].price };
    });
}

export default function InsightsTab({ subscriptions, onUpdateUsageStatus, onUpdateDowngradeNeeded }: Props) {
  if (subscriptions.length === 0) {
    return (
      <div className="text-neutral-600 text-sm py-16 text-center">
        구독을 추가하면 인사이트를 확인할 수 있습니다
      </div>
    );
  }

  const totalMonthly = subscriptions.reduce((sum, s) => sum + s.price, 0);

  // 해지 추천
  const cancelSubs = subscriptions.filter(s => s.usage_status === 'not_using');
  const cancelSavings = cancelSubs.reduce((sum, s) => sum + s.price, 0);

  // 다운그레이드 가능 목록
  const allDowngradeable = subscriptions
    .map(s => ({ sub: s, downgrade: getDowngrade(s) }))
    .filter((d): d is { sub: Subscription; downgrade: NonNullable<ReturnType<typeof getDowngrade>> } => d.downgrade !== null);

  // 아직 질문 안 한 다운그레이드 (downgrade_needed === null)
  const downgradeQuestions = allDowngradeable.filter(d => d.sub.downgrade_needed === null);

  // 확정된 다운그레이드 추천 (downgrade_needed === false → 필요 없다고 답함)
  const confirmedDowngrades = allDowngradeable.filter(d => d.sub.downgrade_needed === false);
  const downgradeSavings = confirmedDowngrades.reduce((sum, d) => sum + d.downgrade.saving, 0);

  // 유지 추천 (usage_status === 'using' OR downgrade_needed === true)
  const keepSubs = subscriptions.filter(s => s.usage_status === 'using');
  const keepByDowngrade = allDowngradeable.filter(d => d.sub.downgrade_needed === true);

  // 중복 감지
  const duplicates = findDuplicates(subscriptions);
  const duplicateSavings = duplicates.reduce((sum, d) => sum + d.potentialSaving, 0);

  // 총 절약
  const totalSavings = cancelSavings + downgradeSavings + duplicateSavings;

  // 사용 체크
  const usageCheckSubs = subscriptions
    .filter(s => s.usage_status === null)
    .map(s => ({ sub: s, daysSince: getDaysSince(s.created_at) }))
    .filter(({ daysSince }) => daysSince >= 30)
    .sort((a, b) => b.daysSince - a.daysSince);

  return (
    <div className="fade-in space-y-10">

      {/* 절약 요약 카드 */}
      <div className="border border-emerald-500/30 bg-emerald-500/5 p-6 text-center">
        <p className="text-neutral-500 text-xs tracking-widest uppercase mb-3">이번 달 절약 가능</p>
        <p className="text-4xl font-normal text-emerald-400 mb-1">
          ₩{totalSavings.toLocaleString()}
        </p>
        <p className="text-neutral-500 text-sm">
          연간 예상 절약: ₩{(totalSavings * 12).toLocaleString()}
        </p>
      </div>

      {/* 절약 리포트 */}
      {(cancelSubs.length > 0 || confirmedDowngrades.length > 0 || keepSubs.length > 0 || keepByDowngrade.length > 0) && (
        <div>
          <p className="text-neutral-500 text-xs tracking-widest uppercase mb-4">절약 리포트</p>
          <div className="space-y-3">

            {/* 해지 추천 */}
            {cancelSubs.map(sub => (
              <div key={sub.id} className="border border-red-500/20 bg-red-500/5 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-xs text-red-400 tracking-wider uppercase">해지 추천</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">{sub.name}</span>
                  <span className="text-sm text-red-400">₩{sub.price.toLocaleString()}/월 절약</span>
                </div>
              </div>
            ))}

            {/* 확정 다운그레이드 추천 */}
            {confirmedDowngrades.map(({ sub, downgrade }) => (
              <div key={sub.id} className="border border-amber-500/20 bg-amber-500/5 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-xs text-amber-400 tracking-wider uppercase">다운그레이드 추천</span>
                </div>
                <p className="text-sm mb-1">{sub.name}</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-neutral-500">{sub.plan}</span>
                  <span className="text-neutral-600">&rarr;</span>
                  <span className="text-neutral-300">{downgrade.cheapestPlan}</span>
                </div>
                <p className="text-sm text-amber-400 mt-1">
                  ₩{sub.price.toLocaleString()} &rarr; ₩{downgrade.cheapestPrice.toLocaleString()} (₩{downgrade.saving.toLocaleString()} 절약)
                </p>
              </div>
            ))}

            {/* 유지 추천 (사용 체크 기반) */}
            {keepSubs.map(sub => (
              <div key={sub.id} className="border border-emerald-500/20 bg-emerald-500/5 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs text-emerald-400 tracking-wider uppercase">유지 추천</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">{sub.name}</span>
                  <span className="text-sm text-neutral-500">잘 쓰고 있어요</span>
                </div>
              </div>
            ))}

            {/* 유지 추천 (다운그레이드 질문에서 필요하다고 답함) */}
            {keepByDowngrade.map(({ sub }) => (
              <div key={`keep-dg-${sub.id}`} className="border border-emerald-500/20 bg-emerald-500/5 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs text-emerald-400 tracking-wider uppercase">유지 추천</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">{sub.name} · {sub.plan}</span>
                  <span className="text-sm text-neutral-500">현 요금제 유지</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 다운그레이드 확인 질문 */}
      {downgradeQuestions.length > 0 && (
        <div>
          <p className="text-neutral-500 text-xs tracking-widest uppercase mb-4">요금제 점검</p>
          <div className="space-y-3">
            {downgradeQuestions.map(({ sub, downgrade }) => {
              const question = getDowngradeQuestion(sub.name, sub.plan);
              return (
                <div key={sub.id} className="border border-neutral-800 p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-neutral-300">{sub.name}</span>
                    <span className="text-xs text-neutral-600">{sub.plan} · ₩{sub.price.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-neutral-400 mb-1">{question}</p>
                  <p className="text-xs text-neutral-600 mb-4">
                    아니라면 {downgrade.cheapestPlan} (₩{downgrade.cheapestPrice.toLocaleString()})으로 월 ₩{downgrade.saving.toLocaleString()} 절약
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => onUpdateDowngradeNeeded(sub.id, true)}
                      className="flex-1 py-2.5 text-sm border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                    >
                      필요해요
                    </button>
                    <button
                      onClick={() => onUpdateDowngradeNeeded(sub.id, false)}
                      className="flex-1 py-2.5 text-sm border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 transition-colors"
                    >
                      필요 없어요
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 중복 감지 */}
      {duplicates.length > 0 && (
        <div>
          <p className="text-neutral-500 text-xs tracking-widest uppercase mb-4">중복 감지</p>
          <div className="space-y-3">
            {duplicates.map(dup => (
              <div key={dup.category} className="border border-amber-500/30 bg-amber-500/5 p-4">
                <p className="text-sm text-amber-400 mb-3">
                  {categoryNames[dup.category] || dup.category} 카테고리에 {dup.items.length}개 구독
                </p>
                <div className="space-y-2 mb-3">
                  {dup.items.map(item => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <span className="text-neutral-300">{item.name}</span>
                      <span className="text-neutral-500">₩{item.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-neutral-400 border-t border-amber-500/10 pt-3">
                  하나만 써도 충분해요. 월 ₩{dup.potentialSaving.toLocaleString()} 절약 가능
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 사용 체크 */}
      {usageCheckSubs.length > 0 && (
        <div>
          <p className="text-neutral-500 text-xs tracking-widest uppercase mb-4">사용 체크</p>
          <div className="space-y-3">
            {usageCheckSubs.map(({ sub, daysSince }) => {
              const months = Math.floor(daysSince / 30);
              const label = months >= 2 ? `${months}개월째` : `${daysSince}일째`;
              return (
                <div key={sub.id} className="border border-neutral-800 p-4">
                  <p className="text-sm mb-1">
                    <span className="text-neutral-300 font-medium">{sub.name}</span>
                    <span className="text-neutral-600 ml-2">구독한 지 {label}예요</span>
                  </p>
                  <p className="text-neutral-500 text-xs mb-4">잘 쓰고 계신가요?</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => onUpdateUsageStatus(sub.id, 'using')}
                      className="flex-1 py-2.5 text-sm border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                    >
                      잘 쓰고 있어요
                    </button>
                    <button
                      onClick={() => onUpdateUsageStatus(sub.id, 'not_using')}
                      className="flex-1 py-2.5 text-sm border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      별로 안 써요
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 믿독 유저 통계 */}
      <div>
        <p className="text-neutral-500 text-xs tracking-widest uppercase mb-4">믿독 유저들은요</p>
        <div className="border border-neutral-800 p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-neutral-600 text-xs mb-1">평균 구독 개수</p>
              <p className="text-lg font-normal">{AVG_SUB_COUNT}개</p>
            </div>
            <div>
              <p className="text-neutral-600 text-xs mb-1">평균 월 지출</p>
              <p className="text-lg font-normal">₩{AVG_MONTHLY.toLocaleString()}</p>
            </div>
          </div>
          <div className="border-t border-neutral-900 pt-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-500">내 구독</span>
              <span>
                {subscriptions.length}개
                <span className={`ml-2 text-xs ${subscriptions.length > AVG_SUB_COUNT ? 'text-amber-400' : 'text-emerald-400'}`}>
                  평균보다 {subscriptions.length > AVG_SUB_COUNT ? '많아요' : subscriptions.length < Math.floor(AVG_SUB_COUNT) ? '적어요' : '비슷해요'}
                </span>
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-500">내 월 지출</span>
              <span>
                ₩{totalMonthly.toLocaleString()}
                <span className={`ml-2 text-xs ${totalMonthly > AVG_MONTHLY ? 'text-amber-400' : 'text-emerald-400'}`}>
                  평균보다 {totalMonthly > AVG_MONTHLY ? '더 써요' : totalMonthly < AVG_MONTHLY ? '덜 써요' : '비슷해요'}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
