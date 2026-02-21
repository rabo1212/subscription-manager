import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from './services/supabaseClient';
import { Subscription, SubscriptionInsert } from './types';
import AuthForm from './components/AuthForm';
import AdminPanel from './components/AdminPanel';
import SpendingAnalysis from './components/SpendingAnalysis';
import InsightsTab from './components/InsightsTab';
import LandingPage from './components/LandingPage';
import TermsPage from './components/TermsPage';
import PrivacyPage from './components/PrivacyPage';
import RefundPage from './components/RefundPage';
import { serviceData, categoryNames, calculateDday, calculateTrialDaysLeft } from './serviceData';
import { cancellationGuides } from './cancellationData';
import type { User } from '@supabase/supabase-js';
import type { ServicePlan } from './serviceData';

const ADMIN_EMAIL = '311015330@naver.com';
const FREE_LIMIT = 3;
const PRO_PRICE = 3900;

const GUEST_SAMPLE: Subscription[] = [
  { id: 'g1', user_id: 'guest', name: 'Netflix', plan: '스탠다드', price: 13500, billing_day: 15, is_custom: false, is_trial: false, trial_end_date: null, usage_status: 'using', downgrade_needed: false, created_at: '' },
  { id: 'g2', user_id: 'guest', name: 'YouTube Premium', plan: '개인', price: 10450, billing_day: 5, is_custom: false, is_trial: false, trial_end_date: null, usage_status: 'using', downgrade_needed: false, created_at: '' },
  { id: 'g3', user_id: 'guest', name: 'ChatGPT', plan: 'Plus', price: 28900, billing_day: 22, is_custom: false, is_trial: true, trial_end_date: '2026-02-01', usage_status: 'using', downgrade_needed: false, created_at: '' },
];

function MainApp() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isGuest, setIsGuest] = useState(() => searchParams.get('guest') === 'true');
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  // 모달
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedSub, setSelectedSub] = useState<Subscription | null>(null);

  // 추가 단계
  const [addStep, setAddStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<ServicePlan | null>(null);
  const [selectedDate, setSelectedDate] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // 커스텀
  const [customName, setCustomName] = useState('');
  const [customPrice, setCustomPrice] = useState('');
  const [customDate, setCustomDate] = useState(1);

  // 무료체험
  const [isTrial, setIsTrial] = useState(false);
  const [trialEndDate, setTrialEndDate] = useState('');
  const [showTrialAlert, setShowTrialAlert] = useState(true);

  // 플랜 (Free/Pro)
  const [isPro, setIsPro] = useState(() => localStorage.getItem('isPro') === 'true');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [upgradeReason, setUpgradeReason] = useState('');

  // 탭
  const [tab, setTab] = useState<'my' | 'analytics' | 'admin'>('my');
  const [bottomTab, setBottomTab] = useState<'home' | 'insights'>('home');
  const isAdmin = !isGuest && user?.email === ADMIN_EMAIL;

  const totalPrice = subscriptions.reduce((sum, s) => sum + s.price, 0);
  const serviceNames = Object.keys(serviceData);
  const categories = ['all', ...new Set(Object.values(serviceData).map(s => s.category))];

  const filteredServices = serviceNames.filter(name => {
    const matchSearch = name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedCategory === 'all' || serviceData[name].category === selectedCategory;
    return matchSearch && matchCat;
  });

  const sortedSubscriptions = [...subscriptions].sort(
    (a, b) => calculateDday(a.billing_day) - calculateDday(b.billing_day)
  );

  const expiringTrials = subscriptions.filter(s => {
    if (!s.is_trial || !s.trial_end_date) return false;
    const daysLeft = calculateTrialDaysLeft(s.trial_end_date);
    return daysLeft >= 0 && daysLeft <= 3;
  });

  // Auth
  useEffect(() => {
    if (isGuest) {
      setAuthLoading(false);
      setSubscriptions(GUEST_SAMPLE);
      setLoading(false);
      return;
    }
    if (!supabase) { setAuthLoading(false); return; }
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (isGuest) return;
    if (user) fetchSubscriptions();
    else { setSubscriptions([]); setLoading(false); }
  }, [user]);

  // 첫 방문 온보딩 체크
  useEffect(() => {
    if (!isGuest && user && !localStorage.getItem('hasVisited')) {
      setShowOnboarding(true);
    }
  }, [user]);

  async function fetchSubscriptions() {
    if (!supabase || !user) { setLoading(false); return; }
    setLoading(true);
    const { data, error } = await supabase
      .from('subscriptions').select('*').eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (!error && data) setSubscriptions(data);
    setLoading(false);
  }

  async function addSubscription(
    name: string, plan: string, price: number, billingDay: number,
    isCustom: boolean, trial: boolean = false, trialEnd: string | null = null
  ) {
    if (isGuest) {
      const newSub: Subscription = {
        id: `g${Date.now()}`, user_id: 'guest', name, plan, price,
        billing_day: billingDay, is_custom: isCustom,
        is_trial: trial, trial_end_date: trialEnd,
        usage_status: 'using', downgrade_needed: false, created_at: '',
      };
      setSubscriptions(prev => [newSub, ...prev]);
      return;
    }
    if (!supabase || !user) return;
    const { data: inserted, error } = await supabase
      .from('subscriptions')
      .insert({
        user_id: user.id, name, plan, price,
        billing_day: billingDay, is_custom: isCustom,
        is_trial: trial, trial_end_date: trialEnd,
      } as SubscriptionInsert)
      .select().single();
    if (!error && inserted) setSubscriptions(prev => [inserted, ...prev]);
  }

  async function deleteSubscription(id: string) {
    if (isGuest) {
      setSubscriptions(prev => prev.filter(s => s.id !== id));
      return;
    }
    if (!supabase) return;
    const { error } = await supabase.from('subscriptions').delete().eq('id', id);
    if (!error) setSubscriptions(prev => prev.filter(s => s.id !== id));
  }

  // 모달 핸들러
  function resetAddModal() {
    setShowAddModal(false);
    setAddStep(1); setSelectedService(null); setSelectedPlan(null);
    setSelectedDate(1); setSearchQuery(''); setSelectedCategory('all');
    setIsTrial(false); setTrialEndDate('');
  }

  function resetCustomModal() {
    setShowCustomModal(false);
    setCustomName(''); setCustomPrice(''); setCustomDate(1);
    setIsTrial(false); setTrialEndDate('');
  }

  function handleSelectService(name: string) { setSelectedService(name); setAddStep(2); }
  function handleSelectPlan(plan: ServicePlan) { setSelectedPlan(plan); setAddStep(3); }

  function handleAddSubscription() {
    if (!selectedService || !selectedPlan) return;
    if (!checkFreeLimit()) { resetAddModal(); return; }
    addSubscription(
      selectedService, selectedPlan.name, selectedPlan.price, selectedDate, false,
      isTrial, isTrial ? trialEndDate || null : null
    );
    resetAddModal();
  }

  function handleAddCustom() {
    if (!customName || !customPrice) return;
    if (!checkFreeLimit()) { resetCustomModal(); return; }
    addSubscription(
      customName, '직접입력', parseInt(customPrice), customDate, true,
      isTrial, isTrial ? trialEndDate || null : null
    );
    resetCustomModal();
  }

  function handleDelete(id: string) {
    deleteSubscription(id);
    setShowDetailModal(false);
  }

  async function updateUsageStatus(id: string, status: 'using' | 'not_using') {
    if (isGuest) {
      setSubscriptions(prev => prev.map(s => s.id === id ? { ...s, usage_status: status } : s));
      return;
    }
    if (!supabase) return;
    const { error } = await supabase
      .from('subscriptions')
      .update({ usage_status: status })
      .eq('id', id);
    if (!error) {
      setSubscriptions(prev =>
        prev.map(s => s.id === id ? { ...s, usage_status: status } : s)
      );
    }
  }

  async function updateDowngradeNeeded(id: string, needed: boolean) {
    if (isGuest) {
      setSubscriptions(prev => prev.map(s => s.id === id ? { ...s, downgrade_needed: needed } : s));
      return;
    }
    if (!supabase) return;
    const { error } = await supabase
      .from('subscriptions')
      .update({ downgrade_needed: needed })
      .eq('id', id);
    if (!error) {
      setSubscriptions(prev =>
        prev.map(s => s.id === id ? { ...s, downgrade_needed: needed } : s)
      );
    }
  }

  async function handleLogout() {
    if (isGuest) {
      setIsGuest(false);
      setSubscriptions([]);
      navigate('/app');
      return;
    }
    if (!supabase) return;
    setTab('my');
    setBottomTab('home');
    await supabase.auth.signOut();
  }

  // 플랜 관리
  function handleSelectPro() {
    localStorage.setItem('isPro', 'true');
    setIsPro(true);
    setShowOnboarding(false);
    setShowUpgradeModal(false);
    setShowPlanModal(false);
  }

  function handleSelectFree() {
    localStorage.setItem('hasVisited', 'true');
    setShowOnboarding(false);
  }

  function handleCancelPro() {
    localStorage.removeItem('isPro');
    setIsPro(false);
    setShowPlanModal(false);
  }

  function checkFreeLimit(): boolean {
    if (!isPro && subscriptions.length >= FREE_LIMIT) {
      setUpgradeReason('limit');
      setShowUpgradeModal(true);
      return false;
    }
    return true;
  }

  function checkCustomAllowed(): boolean {
    if (!isPro) {
      setUpgradeReason('custom');
      setShowUpgradeModal(true);
      return false;
    }
    return true;
  }

  // 무료체험 토글 UI
  function TrialToggle() {
    return (
      <div className="border border-neutral-800 p-4">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-neutral-400">무료체험 중</span>
          <div
            onClick={() => setIsTrial(!isTrial)}
            className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${isTrial ? 'bg-emerald-500' : 'bg-neutral-700'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${isTrial ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </div>
        </label>
        {isTrial && (
          <div className="mt-4">
            <label className="text-neutral-500 text-xs tracking-widest uppercase block mb-2">체험 종료일</label>
            <input
              type="date"
              value={trialEndDate}
              onChange={(e) => setTrialEndDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full bg-transparent border border-neutral-800 px-4 py-3 text-white focus:border-neutral-600 focus:outline-none transition-colors text-sm [color-scheme:dark]"
            />
          </div>
        )}
      </div>
    );
  }

  // 광고 목업 (무료 이용자 전용)
  function AdBanner() {
    if (isPro) return null;
    return (
      <div className="w-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-6" style={{ minHeight: 100 }}>
        <div className="text-center">
          <span className="text-[10px] tracking-widest uppercase text-neutral-600 border border-neutral-700 px-1.5 py-0.5">AD</span>
          <p className="text-neutral-700 text-xs mt-2">광고 영역</p>
        </div>
      </div>
    );
  }

  if (authLoading) {
    return <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-neutral-600">불러오는 중...</div>;
  }
  if (!user && !isGuest) return <AuthForm />;

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-normal pb-20">

      {/* 게스트 배너 */}
      {isGuest && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-8 py-2">
          <p className="text-center text-xs text-amber-400">
            체험 모드 · 데이터는 저장되지 않습니다
          </p>
        </div>
      )}

      {/* Header */}
      <header className="px-8 py-6 border-b border-neutral-800">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="text-sm tracking-[0.3em] uppercase font-semibold cursor-pointer hover:text-neutral-300 transition-colors"
              onClick={() => navigate('/')}
            >MITDOK</button>
            {isAdmin && (
              <span className="text-[10px] tracking-wider uppercase bg-white text-black px-1.5 py-0.5">admin</span>
            )}
          </div>
          <div className="flex items-center gap-4">
            {!isGuest && (
              <button
                onClick={() => setShowPlanModal(true)}
                className={`text-[10px] tracking-wider uppercase px-2.5 py-1 hover:opacity-80 transition-opacity ${
                  isPro
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black font-medium'
                    : 'border border-neutral-700 text-neutral-400'
                }`}
              >
                구독 · {isPro ? 'Pro' : '무료'}
              </button>
            )}
            <button onClick={handleLogout} className="text-xs text-neutral-600 hover:text-white transition-colors">
              {isGuest ? '회원가입' : '로그아웃'}
            </button>
          </div>
        </div>
      </header>

      {/* 홈 탭 콘텐츠 */}
      {bottomTab === 'home' && (
        <>
          {/* 상단 탭 */}
          <div className="max-w-md mx-auto px-8 pt-6">
            <div className="flex border border-neutral-800">
              <button
                onClick={() => setTab('my')}
                className={`flex-1 py-2 text-xs tracking-widest uppercase transition-colors ${tab === 'my' ? 'bg-white text-black' : 'text-neutral-500 hover:text-white'}`}
              >내 구독</button>
              <button
                onClick={() => setTab('analytics')}
                className={`flex-1 py-2 text-xs tracking-widest uppercase transition-colors ${tab === 'analytics' ? 'bg-white text-black' : 'text-neutral-500 hover:text-white'}`}
              >분석</button>
              {isAdmin && (
                <button
                  onClick={() => setTab('admin')}
                  className={`flex-1 py-2 text-xs tracking-widest uppercase transition-colors ${tab === 'admin' ? 'bg-white text-black' : 'text-neutral-500 hover:text-white'}`}
                >관리자</button>
              )}
            </div>
          </div>

          {tab === 'admin' && isAdmin ? (
            <div className="px-8 py-10 max-w-md mx-auto"><AdminPanel /></div>
          ) : tab === 'analytics' ? (
            <div className="px-8 py-10 max-w-md mx-auto">
              <AdBanner />
              <SpendingAnalysis subscriptions={subscriptions} />
            </div>
          ) : (
        <main className="px-8 py-10 max-w-md mx-auto">
          {/* 무료체험 만료 임박 알림 */}
          {showTrialAlert && expiringTrials.length > 0 && (
            <div className="mb-6 border border-emerald-500/30 bg-emerald-500/5 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-emerald-400 text-xs tracking-widest uppercase">무료체험 만료 임박</p>
                <button onClick={() => setShowTrialAlert(false)} className="text-neutral-600 hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {expiringTrials.map(trial => {
                const daysLeft = calculateTrialDaysLeft(trial.trial_end_date!);
                return (
                  <div key={trial.id} className="flex items-center justify-between py-2">
                    <span className="text-sm">{trial.name}</span>
                    <span className={`text-sm ${daysLeft === 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                      {daysLeft === 0 ? '오늘 만료!' : `${daysLeft}일 남음`}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* 광고 */}
          <AdBanner />

          {/* Monthly Total */}
          <div className="mb-12">
            <p className="text-neutral-500 text-xs tracking-widest uppercase mb-3">Monthly Total</p>
            <p className="text-5xl font-normal tracking-tight mb-2">
              ₩{totalPrice.toLocaleString()}
            </p>
            <p className="text-neutral-500 text-sm">
              {subscriptions.length}개 구독 중{!isPro && ` (${FREE_LIMIT}개 제한)`} · 연 ₩{(totalPrice * 12).toLocaleString()}
            </p>
          </div>

          <div className="h-px bg-neutral-800 mb-10"></div>

          {/* 결제 예정 */}
          <div className="mb-10">
            <p className="text-neutral-500 text-xs tracking-widest uppercase mb-6">결제 예정</p>

            {loading ? (
              <p className="text-neutral-600 text-sm py-8 text-center">불러오는 중...</p>
            ) : subscriptions.length === 0 ? (
              <p className="text-neutral-600 text-sm py-8 text-center">등록된 구독이 없습니다</p>
            ) : (
              <div className="space-y-1">
                {sortedSubscriptions.map((sub) => {
                  const dday = calculateDday(sub.billing_day);
                  const trialDaysLeft = sub.is_trial && sub.trial_end_date
                    ? calculateTrialDaysLeft(sub.trial_end_date) : null;
                  const isTrialExpired = trialDaysLeft !== null && trialDaysLeft < 0;
                  const isTrialExpiringSoon = trialDaysLeft !== null && trialDaysLeft >= 0 && trialDaysLeft <= 3;

                  return (
                    <div
                      key={sub.id}
                      onClick={() => { setSelectedSub(sub); setShowDetailModal(true); }}
                      className={`group flex items-center justify-between py-4 border-b border-neutral-900 cursor-pointer hover:border-neutral-700 transition-colors ${isTrialExpired ? 'opacity-50' : ''}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full ${
                          isTrialExpiringSoon ? 'bg-emerald-500 animate-pulse' :
                          dday <= 3 ? 'bg-red-500' : dday <= 7 ? 'bg-amber-500' : 'bg-neutral-600'
                        }`} />
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-normal tracking-wide">{sub.name}</p>
                            {sub.is_trial && (
                              <span className={`text-[10px] tracking-wider uppercase px-1.5 py-0.5 ${
                                isTrialExpired ? 'bg-neutral-800 text-neutral-500' :
                                isTrialExpiringSoon ? 'bg-emerald-500/20 text-emerald-400' :
                                'bg-emerald-500/10 text-emerald-500'
                              }`}>
                                {isTrialExpired ? '만료' :
                                 trialDaysLeft === 0 ? '오늘 만료' :
                                 `체험 D-${trialDaysLeft}`}
                              </span>
                            )}
                          </div>
                          <p className="text-neutral-600 text-sm">{sub.plan} · 매달 {sub.billing_day}일</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-normal">₩{sub.price.toLocaleString()}</p>
                        <p className={`text-sm ${dday <= 3 ? 'text-red-500' : 'text-neutral-600'}`}>
                          {dday === 0 ? '오늘' : `D-${dday}`}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 구독 추가 버튼 */}
          <button
            onClick={() => {
              if (!checkFreeLimit()) return;
              setShowAddModal(true);
            }}
            className="w-full py-4 border border-neutral-800 text-neutral-400 text-sm tracking-widest uppercase hover:border-neutral-600 hover:text-white transition-all"
          >
            + 구독 추가
            {!isPro && subscriptions.length >= FREE_LIMIT && (
              <span className="ml-2 text-[10px] text-amber-500 tracking-wider">Pro 필요</span>
            )}
          </button>
        </main>
          )}
        </>
      )}

      {/* 인사이트 탭 콘텐츠 */}
      {bottomTab === 'insights' && (
        <>
          <div
            className={`px-8 py-10 max-w-md mx-auto ${!isPro ? 'select-none' : ''}`}
            style={!isPro ? { filter: 'blur(8px)' } : {}}
          >
            <InsightsTab
              subscriptions={subscriptions}
              onUpdateUsageStatus={updateUsageStatus}
              onUpdateDowngradeNeeded={updateDowngradeNeeded}
            />
          </div>
          {!isPro && (
            <div className="fixed inset-0 z-30 flex items-center justify-center pointer-events-none">
              <div className="bg-neutral-950/90 border border-neutral-800 p-8 text-center max-w-xs pointer-events-auto">
                <p className="text-2xl mb-3">🔒</p>
                <p className="font-medium mb-2">Pro 구독으로</p>
                <p className="font-medium mb-4">인사이트 확인하기</p>
                <p className="text-neutral-500 text-xs mb-6">
                  절약 분석, 해지/다운그레이드 추천,<br />중복 감지, 사용량 체크까지
                </p>
                <button
                  onClick={() => { setUpgradeReason('insights'); setShowUpgradeModal(true); }}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Pro 시작하기
                  <span className="font-normal ml-1.5 opacity-80">₩{PRO_PRICE.toLocaleString()}/월</span>
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* === Add Modal === */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/90 flex items-end justify-center z-50">
          <div className="slide-up bg-neutral-950 w-full max-w-md border-t border-neutral-800 p-8 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                {addStep > 1 && (
                  <button onClick={() => setAddStep(addStep - 1)} className="text-neutral-500 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                )}
                <p className="text-xs tracking-widest uppercase text-neutral-500">
                  {addStep === 1 && '서비스 선택'}
                  {addStep === 2 && '요금제 선택'}
                  {addStep === 3 && '결제일 선택'}
                </p>
              </div>
              <button onClick={resetAddModal} className="text-neutral-500 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {addStep === 1 && (
              <>
                <input
                  type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="서비스 검색..." className="w-full bg-transparent border border-neutral-800 px-4 py-3 text-white placeholder-neutral-600 focus:border-neutral-600 focus:outline-none transition-colors text-sm mb-4"
                />
                <div className="flex flex-wrap gap-2 mb-6">
                  {categories.map(cat => (
                    <button key={cat} onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 text-xs border transition-colors ${selectedCategory === cat ? 'border-white text-white' : 'border-neutral-800 text-neutral-500 hover:border-neutral-600'}`}>
                      {cat === 'all' ? '전체' : categoryNames[cat] || cat}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3 mb-6 max-h-[40vh] overflow-y-auto">
                  {filteredServices.map(service => (
                    <button key={service} onClick={() => handleSelectService(service)}
                      className="text-left p-4 border border-neutral-800 hover:border-neutral-600 transition-colors group">
                      <p className="font-normal text-sm group-hover:text-white transition-colors truncate">{service}</p>
                      <p className="text-neutral-600 text-xs mt-1">{categoryNames[serviceData[service].category] || serviceData[service].category}</p>
                    </button>
                  ))}
                </div>
                <button onClick={() => {
                    if (!checkCustomAllowed()) { resetAddModal(); return; }
                    resetAddModal(); setShowCustomModal(true);
                  }}
                  className="w-full py-4 border border-dashed border-neutral-800 text-neutral-500 text-sm tracking-wide hover:border-neutral-600 hover:text-neutral-300 transition-all">
                  + 직접 입력하기
                  {!isPro && <span className="ml-2 text-[10px] text-amber-500 tracking-wider uppercase">Pro</span>}
                </button>
              </>
            )}

            {addStep === 2 && selectedService && (
              <div className="space-y-3">
                <p className="text-white text-lg mb-2">{selectedService}</p>
                <p className="text-neutral-600 text-sm mb-6">{categoryNames[serviceData[selectedService].category]}</p>
                {serviceData[selectedService].plans.map(plan => (
                  <button key={plan.name} onClick={() => handleSelectPlan(plan)}
                    className="w-full flex items-center justify-between p-4 border border-neutral-800 hover:border-neutral-600 transition-colors text-left">
                    <span className="font-normal">{plan.name}</span>
                    <span className="text-neutral-400">₩{plan.price.toLocaleString()}/월</span>
                  </button>
                ))}
              </div>
            )}

            {addStep === 3 && (
              <div>
                <p className="text-white text-lg mb-2">{selectedService}</p>
                <p className="text-neutral-500 text-sm mb-8">{selectedPlan?.name} · ₩{selectedPlan?.price.toLocaleString()}/월</p>
                <p className="text-neutral-500 text-xs tracking-widest uppercase mb-4">결제일</p>
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                    <button key={day} onClick={() => setSelectedDate(day)}
                      className={`aspect-square flex items-center justify-center text-sm border transition-colors ${selectedDate === day ? 'border-white bg-white text-black' : 'border-neutral-800 hover:border-neutral-600'}`}>
                      {day}
                    </button>
                  ))}
                </div>
                <p className="text-neutral-500 text-sm mb-6 text-center">매달 {selectedDate}일 결제</p>

                {/* 무료체험 토글 */}
                <div className="mb-6">
                  <TrialToggle />
                </div>

                <button onClick={handleAddSubscription}
                  className="w-full py-4 bg-white text-black text-sm tracking-widest uppercase hover:bg-neutral-200 transition-colors">
                  구독 추가
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* === Custom Modal === */}
      {showCustomModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 px-8">
          <div className="fade-in bg-neutral-950 w-full max-w-sm border border-neutral-800 p-8">
            <div className="flex items-center justify-between mb-8">
              <p className="text-xs tracking-widest uppercase text-neutral-500">직접 입력</p>
              <button onClick={resetCustomModal} className="text-neutral-500 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="space-y-6 mb-8">
              <div>
                <label className="text-neutral-500 text-xs tracking-widest uppercase block mb-2">서비스명</label>
                <input type="text" value={customName} onChange={(e) => setCustomName(e.target.value)} placeholder="예: 헬스장, PT..."
                  className="w-full bg-transparent border border-neutral-800 px-4 py-3 text-white placeholder-neutral-600 focus:border-neutral-600 focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="text-neutral-500 text-xs tracking-widest uppercase block mb-2">월 금액 (₩)</label>
                <input type="number" value={customPrice} onChange={(e) => setCustomPrice(e.target.value)} placeholder="10000"
                  className="w-full bg-transparent border border-neutral-800 px-4 py-3 text-white placeholder-neutral-600 focus:border-neutral-600 focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="text-neutral-500 text-xs tracking-widest uppercase block mb-4">결제일</label>
                <div className="grid grid-cols-7 gap-2 max-h-40 overflow-y-auto">
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                    <button key={day} onClick={() => setCustomDate(day)}
                      className={`aspect-square flex items-center justify-center text-xs border transition-colors ${customDate === day ? 'border-white bg-white text-black' : 'border-neutral-800 hover:border-neutral-600'}`}>
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* 무료체험 토글 */}
              <TrialToggle />
            </div>
            <button onClick={handleAddCustom} disabled={!customName || !customPrice}
              className="w-full py-4 bg-white text-black text-sm tracking-widest uppercase hover:bg-neutral-200 transition-colors disabled:bg-neutral-800 disabled:text-neutral-600 disabled:cursor-not-allowed">
              구독 추가
            </button>
          </div>
        </div>
      )}

      {/* === Detail Modal === */}
      {showDetailModal && selectedSub && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 px-8">
          <div className="fade-in bg-neutral-950 w-full max-w-sm border border-neutral-800 p-8 max-h-[85vh] overflow-y-auto">
            <div className="mb-8">
              <p className="text-xs tracking-widest uppercase text-neutral-500 mb-2">구독 상세</p>
              <p className="text-2xl font-normal">{selectedSub.name}</p>
              <p className="text-neutral-500 text-sm mt-1">{selectedSub.plan}</p>
            </div>
            <div className="space-y-6 mb-10">
              <div className="flex justify-between items-center pb-4 border-b border-neutral-900">
                <span className="text-neutral-500 text-sm">월 금액</span>
                <span className="font-normal">₩{selectedSub.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-neutral-900">
                <span className="text-neutral-500 text-sm">연간 예상</span>
                <span className="font-normal">₩{(selectedSub.price * 12).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-neutral-900">
                <span className="text-neutral-500 text-sm">결제일</span>
                <span className="font-normal">매달 {selectedSub.billing_day}일</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-500 text-sm">다음 결제</span>
                <span className={`font-normal ${calculateDday(selectedSub.billing_day) <= 3 ? 'text-red-500' : ''}`}>
                  D-{calculateDday(selectedSub.billing_day)}
                </span>
              </div>
            </div>

            {/* 무료체험 정보 */}
            {selectedSub.is_trial && selectedSub.trial_end_date && (
              <div className="mb-10 border border-emerald-500/20 p-4">
                <p className="text-emerald-400 text-xs tracking-widest uppercase mb-3">무료체험</p>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500 text-sm">종료일</span>
                  <span className="font-normal">{selectedSub.trial_end_date}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-neutral-500 text-sm">남은 일수</span>
                  <span className={`font-normal ${calculateTrialDaysLeft(selectedSub.trial_end_date) <= 3 ? 'text-emerald-400' : ''}`}>
                    {(() => {
                      const d = calculateTrialDaysLeft(selectedSub.trial_end_date);
                      return d < 0 ? '만료됨' : d === 0 ? '오늘 만료' : `${d}일`;
                    })()}
                  </span>
                </div>
              </div>
            )}

            {/* 해지 방법 */}
            {!selectedSub.is_custom && cancellationGuides[selectedSub.name] && (
              <div className="mb-10 pt-6 border-t border-neutral-900">
                <p className="text-neutral-500 text-xs tracking-widest uppercase mb-4">해지 방법</p>
                <div className="space-y-3">
                  {cancellationGuides[selectedSub.name].steps.map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-neutral-600 text-sm min-w-[20px]">{i + 1}.</span>
                      <span className="text-sm text-neutral-300">{step}</span>
                    </div>
                  ))}
                </div>
                {cancellationGuides[selectedSub.name].note && (
                  <p className="text-neutral-500 text-xs mt-4 border-l-2 border-neutral-800 pl-3">
                    {cancellationGuides[selectedSub.name].note}
                  </p>
                )}
                {cancellationGuides[selectedSub.name].url && (
                  <a
                    href={cancellationGuides[selectedSub.name].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-4 w-full py-3 text-center border border-neutral-800 text-sm text-neutral-400 hover:border-neutral-600 hover:text-white transition-all"
                  >
                    해지 페이지로 이동 →
                  </a>
                )}
              </div>
            )}

            <div className="space-y-3">
              <button onClick={() => handleDelete(selectedSub.id)}
                className="w-full py-3 text-red-500 text-sm tracking-wide hover:text-red-400 transition-colors">
                구독 삭제
              </button>
              <button onClick={() => setShowDetailModal(false)}
                className="w-full py-3 text-neutral-600 text-sm hover:text-neutral-400 transition-colors">
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === Onboarding Modal (첫 방문) === */}
      {showOnboarding && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[60] px-8">
          <div className="fade-in bg-neutral-950 w-full max-w-sm border border-neutral-800 p-8">
            <div className="text-center mb-8">
              <p className="text-xs tracking-widest uppercase text-neutral-500 mb-4">MITDOK</p>
              <p className="text-2xl font-normal mb-2">구독을 슬기롭게</p>
              <p className="text-neutral-500 text-sm">커피 한 잔 값으로, 모든 구독을 한눈에</p>
            </div>

            <div className="space-y-4 mb-8">
              {/* Free 플랜 */}
              <div className="border border-neutral-800 p-5">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-normal tracking-wide">Free</p>
                  <p className="text-neutral-500 text-sm">₩0</p>
                </div>
                <div className="space-y-2 text-sm text-neutral-400">
                  <p>· 구독 {FREE_LIMIT}개까지 등록</p>
                  <p>· 지출 분석</p>
                  <p>· 광고 포함</p>
                </div>
                <button
                  onClick={handleSelectFree}
                  className="w-full mt-5 py-3 border border-neutral-700 text-neutral-400 text-sm tracking-widest uppercase hover:border-neutral-500 hover:text-white transition-all"
                >
                  무료로 시작
                </button>
              </div>

              {/* Pro 플랜 */}
              <div className="border border-amber-500/30 p-5 relative">
                <div className="absolute -top-2.5 left-4 bg-neutral-950 px-2">
                  <span className="text-[10px] tracking-widest uppercase text-amber-500">추천</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-normal tracking-wide">Pro</p>
                  <p className="text-amber-500 text-sm">₩{PRO_PRICE.toLocaleString()}/월</p>
                </div>
                <div className="space-y-2 text-sm text-neutral-300">
                  <p>· 무제한 구독 등록</p>
                  <p>· 지출 분석</p>
                  <p>· 커스텀 구독 직접 입력</p>
                  <p>· D-day 알림</p>
                  <p>· 무료체험 만료 알림</p>
                  <p>· 인사이트 전체</p>
                  <p>· 광고 제거</p>
                </div>
                <button
                  onClick={handleSelectPro}
                  className="w-full mt-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-sm tracking-widest uppercase font-medium hover:opacity-90 transition-opacity"
                >
                  Pro 시작하기
                </button>
              </div>
            </div>

            <p className="text-neutral-600 text-xs text-center">언제든 업그레이드할 수 있어요</p>
          </div>
        </div>
      )}

      {/* === Upgrade Modal (한도 초과) === */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60] px-8">
          <div className="fade-in bg-neutral-950 w-full max-w-sm border border-neutral-800 p-8">
            <div className="text-center mb-8">
              <div className="w-12 h-12 mx-auto mb-4 border border-amber-500/30 flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v-3m0-3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              {upgradeReason === 'limit' ? (
                <>
                  <p className="text-lg font-normal mb-2">구독 {FREE_LIMIT}개 한도 도달</p>
                  <p className="text-neutral-500 text-sm">
                    Free 플랜은 최대 {FREE_LIMIT}개까지 등록할 수 있어요.
                    <br />Pro로 업그레이드하면 무제한으로 등록할 수 있어요.
                  </p>
                </>
              ) : upgradeReason === 'insights' ? (
                <>
                  <p className="text-lg font-normal mb-2">인사이트는 Pro 전용</p>
                  <p className="text-neutral-500 text-sm mb-4">
                    스마트한 구독 관리를 시작하세요.
                  </p>
                  <div className="text-left space-y-2 text-sm text-neutral-400">
                    <p>· 절약 가능 금액 분석</p>
                    <p>· 해지/다운그레이드/유지 추천</p>
                    <p>· 중복 구독 감지</p>
                    <p>· 사용량 체크 리마인드</p>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-lg font-normal mb-2">Pro 전용 기능</p>
                  <p className="text-neutral-500 text-sm">
                    커스텀 구독 등록은 Pro 플랜에서 사용할 수 있어요.
                    <br />커피 한 잔 값으로 모든 기능을 이용해보세요.
                  </p>
                </>
              )}
            </div>

            <div className="space-y-3">
              <button
                onClick={handleSelectPro}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-sm tracking-widest uppercase font-medium hover:opacity-90 transition-opacity"
              >
                Pro 업그레이드 · ₩{PRO_PRICE.toLocaleString()}/월
              </button>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="w-full py-3 text-neutral-600 text-sm hover:text-neutral-400 transition-colors"
              >
                나중에
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === Bottom Tab Bar === */}
      <nav className="fixed bottom-0 left-0 right-0 bg-neutral-950 border-t border-neutral-800 z-40">
        <div className="max-w-md mx-auto flex">
          <button
            onClick={() => setBottomTab('home')}
            className={`flex-1 py-3 flex flex-col items-center gap-1 transition-colors ${bottomTab === 'home' ? 'text-white' : 'text-neutral-600'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-[10px] tracking-wider">홈</span>
          </button>
          <button
            onClick={() => setBottomTab('insights')}
            className={`flex-1 py-3 flex flex-col items-center gap-1 transition-colors ${bottomTab === 'insights' ? 'text-white' : 'text-neutral-600'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span className="text-[10px] tracking-wider">
              인사이트{!isPro && ' 🔒'}
            </span>
          </button>
        </div>
      </nav>

      {/* === Plan Management Modal === */}
      {showPlanModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60] px-8">
          <div className="fade-in bg-neutral-950 w-full max-w-sm border border-neutral-800 p-8 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <p className="text-xs tracking-widest uppercase text-neutral-500">플랜 관리</p>
              <button onClick={() => setShowPlanModal(false)} className="text-neutral-500 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 현재 플랜 */}
            <div className="mb-8">
              <div className={`border p-5 ${isPro ? 'border-amber-500/30' : 'border-neutral-800'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-normal">{isPro ? 'Pro' : 'Free'}</p>
                    {isPro && (
                      <span className="text-[10px] tracking-wider uppercase bg-gradient-to-r from-amber-500 to-orange-500 text-black px-1.5 py-0.5 font-medium">
                        활성
                      </span>
                    )}
                  </div>
                  <p className={`text-sm ${isPro ? 'text-amber-500' : 'text-neutral-500'}`}>
                    {isPro ? `₩${PRO_PRICE.toLocaleString()}/월` : '₩0'}
                  </p>
                </div>
                <p className="text-neutral-500 text-sm">
                  {isPro
                    ? '무제한 등록, 인사이트, 광고 제거'
                    : `구독 ${FREE_LIMIT}개 등록, 기본 분석, 광고 포함`}
                </p>
              </div>
            </div>

            {/* 플랜 비교 */}
            <div className="mb-8">
              <div className="grid grid-cols-3 py-3 text-xs tracking-widest uppercase text-neutral-500 border-b border-neutral-800">
                <span>기능</span>
                <span className="text-center">Free</span>
                <span className="text-center text-amber-500">Pro <span className="text-[10px] ml-1 bg-amber-500/10 px-1 py-0.5 rounded-sm">추천</span></span>
              </div>
              <div className="space-y-0">
                {[
                  { feature: '구독 등록', free: `${FREE_LIMIT}개`, pro: '무제한' },
                  { feature: '지출 분석', free: '✅', pro: '✅' },
                  { feature: '커스텀 구독', free: '❌', pro: '✅' },
                  { feature: 'D-day 알림', free: '❌', pro: '✅' },
                  { feature: '무료체험 알림', free: '❌', pro: '✅' },
                  { feature: '인사이트', free: '❌', pro: '✅' },
                  { feature: '광고', free: '있음', pro: '없음' },
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-3 py-3 border-b border-neutral-900 text-sm">
                    <span className="text-neutral-400">{row.feature}</span>
                    <span className="text-neutral-600 text-center">{row.free}</span>
                    <span className="text-neutral-300 text-center">{row.pro}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 인사이트 기능 상세 */}
            <div className="mb-8 border border-amber-500/20 bg-amber-500/5 p-5">
              <p className="text-amber-400 text-xs tracking-widest uppercase mb-3">Pro 인사이트 기능</p>
              <div className="space-y-2 text-sm text-neutral-300">
                <p>· 절약 가능 금액 분석</p>
                <p>· 다운그레이드 추천</p>
                <p>· 중복 구독 감지</p>
                <p>· 사용량 체크 리마인드</p>
                <p>· 믿독 유저 통계 비교</p>
              </div>
              <p className="text-neutral-500 text-xs mt-3">커피 한 잔 값으로, 모든 구독을 한눈에</p>
            </div>

            {/* 액션 */}
            <div className="space-y-3">
              {isPro ? (
                <>
                  <div className="border border-emerald-500/20 bg-emerald-500/5 p-4 text-center mb-2">
                    <p className="text-emerald-400 text-xs tracking-widest uppercase mb-1">현재 플랜</p>
                    <p className="text-sm">Pro · ₩{PRO_PRICE.toLocaleString()}/월</p>
                  </div>
                  <button
                    onClick={handleCancelPro}
                    className="w-full py-3 border border-neutral-800 text-neutral-500 text-sm tracking-wide hover:border-red-500/30 hover:text-red-400 transition-all"
                  >
                    Pro 해지하기
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSelectPro}
                    className="w-full py-4 bg-[#0064FF] text-white text-sm font-medium hover:bg-[#0055DD] transition-colors flex items-center justify-center gap-2"
                  >
                    <span className="font-bold">토스</span>로 결제하기 · ₩{PRO_PRICE.toLocaleString()}/월
                  </button>
                  <p className="text-neutral-600 text-[11px] text-center">토스페이먼츠 간편결제</p>
                </>
              )}
              <button
                onClick={() => setShowPlanModal(false)}
                className="w-full py-3 text-neutral-600 text-sm hover:text-neutral-400 transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={<MainApp />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/refund" element={<RefundPage />} />
    </Routes>
  );
}
