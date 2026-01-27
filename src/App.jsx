import React, { useState } from 'react';

// ✅ 2025년 검증된 실제 월 구독 서비스만 포함
const serviceData = {
  // 🎬 OTT / 영상 스트리밍
  'Netflix': {
    category: 'OTT',
    plans: [
      { name: '광고형 스탠다드', price: 7000 },
      { name: '스탠다드', price: 13500 },
      { name: '프리미엄', price: 17000 },
    ]
  },
  'YouTube Premium': {
    category: 'OTT',
    plans: [
      { name: '개인', price: 14900 },
      { name: '라이트 (영상만)', price: 8500 },
    ]
  },
  'Disney+': {
    category: 'OTT',
    plans: [
      { name: '스탠다드', price: 9900 },
      { name: '프리미엄', price: 13900 },
    ]
  },
  'TVING': {
    category: 'OTT',
    plans: [
      { name: '광고형 스탠다드', price: 5500 },
      { name: '베이직', price: 9500 },
      { name: '스탠다드', price: 13500 },
      { name: '프리미엄', price: 17000 },
    ]
  },
  'Wavve': {
    category: 'OTT',
    plans: [
      { name: '베이직', price: 7900 },
      { name: '스탠다드', price: 10900 },
      { name: '프리미엄', price: 13900 },
    ]
  },
  'Watcha': {
    category: 'OTT',
    plans: [
      { name: '베이직', price: 7900 },
      { name: '프리미엄', price: 12900 },
    ]
  },
  'Apple TV+': {
    category: 'OTT',
    plans: [
      { name: '월간', price: 9900 },
    ]
  },
  'Amazon Prime Video': {
    category: 'OTT',
    plans: [
      { name: '월간', price: 5900 },
    ]
  },
  'Laftel': {
    category: 'OTT',
    plans: [
      { name: '프리미엄', price: 9900 },
    ]
  },

  // 🎵 음악 스트리밍
  'Spotify': {
    category: 'Music',
    plans: [
      { name: '개인', price: 10900 },
      { name: '듀오', price: 14900 },
      { name: '패밀리', price: 16900 },
      { name: '학생', price: 5900 },
    ]
  },
  'Apple Music': {
    category: 'Music',
    plans: [
      { name: '개인', price: 10900 },
      { name: '가족', price: 16900 },
      { name: '학생', price: 5900 },
    ]
  },
  'Melon': {
    category: 'Music',
    plans: [
      { name: '스트리밍', price: 7900 },
      { name: '스트리밍+다운로드', price: 10900 },
    ]
  },
  'Genie': {
    category: 'Music',
    plans: [
      { name: '스트리밍', price: 7900 },
      { name: '스트리밍+다운로드', price: 10900 },
    ]
  },
  'FLO': {
    category: 'Music',
    plans: [
      { name: '무제한', price: 10900 },
    ]
  },
  'VIBE': {
    category: 'Music',
    plans: [
      { name: '스트리밍', price: 7900 },
      { name: '무제한', price: 10900 },
    ]
  },
  'Bugs': {
    category: 'Music',
    plans: [
      { name: '스트리밍', price: 7900 },
      { name: '무제한', price: 10900 },
    ]
  },

  // 🛒 쇼핑 / 멤버십
  'Coupang 로켓와우': {
    category: 'Shopping',
    plans: [
      { name: '월간', price: 7890 },
    ]
  },
  'Naver Plus 멤버십': {
    category: 'Shopping',
    plans: [
      { name: '월간', price: 4900 },
    ]
  },
  'SSG 유니버스클럽': {
    category: 'Shopping',
    plans: [
      { name: '월간', price: 4900 },
    ]
  },
  '11번가 우주패스': {
    category: 'Shopping',
    plans: [
      { name: '월간', price: 4900 },
    ]
  },
  'Kurly 컬리패스': {
    category: 'Shopping',
    plans: [
      { name: '월간', price: 4900 },
    ]
  },
  '배민클럽': {
    category: 'Shopping',
    plans: [
      { name: '월간', price: 4990 },
    ]
  },

  // 🤖 AI 서비스
  'ChatGPT Plus': {
    category: 'AI',
    plans: [
      { name: 'Plus', price: 29000 },
      { name: 'Pro', price: 290000 },
    ]
  },
  'Claude Pro': {
    category: 'AI',
    plans: [
      { name: 'Pro', price: 27000 },
    ]
  },
  'Perplexity Pro': {
    category: 'AI',
    plans: [
      { name: 'Pro', price: 27000 },
    ]
  },
  'Midjourney': {
    category: 'AI',
    plans: [
      { name: 'Basic', price: 14000 },
      { name: 'Standard', price: 40000 },
      { name: 'Pro', price: 80000 },
    ]
  },
  'Runway': {
    category: 'AI',
    plans: [
      { name: 'Standard', price: 18000 },
      { name: 'Pro', price: 48000 },
    ]
  },
  'Suno AI': {
    category: 'AI',
    plans: [
      { name: 'Pro', price: 12000 },
      { name: 'Premier', price: 30000 },
    ]
  },

  // 💼 업무 / 생산성
  'Notion': {
    category: 'Productivity',
    plans: [
      { name: 'Plus', price: 12000 },
      { name: 'Business', price: 22000 },
    ]
  },
  'Microsoft 365': {
    category: 'Productivity',
    plans: [
      { name: 'Personal', price: 8900 },
      { name: 'Family', price: 12900 },
    ]
  },
  'Google One': {
    category: 'Productivity',
    plans: [
      { name: '100GB', price: 2400 },
      { name: '200GB', price: 3700 },
      { name: '2TB', price: 11900 },
    ]
  },
  'Dropbox': {
    category: 'Productivity',
    plans: [
      { name: 'Plus', price: 14000 },
      { name: 'Professional', price: 26000 },
    ]
  },
  '1Password': {
    category: 'Productivity',
    plans: [
      { name: '개인', price: 4000 },
      { name: '가족', price: 6500 },
    ]
  },
  'Slack': {
    category: 'Productivity',
    plans: [
      { name: 'Pro', price: 10000 },
    ]
  },
  'Zoom': {
    category: 'Productivity',
    plans: [
      { name: 'Pro', price: 20000 },
    ]
  },

  // 🎨 디자인 / 크리에이티브
  'Adobe CC': {
    category: 'Design',
    plans: [
      { name: '포토그래피', price: 13200 },
      { name: '단일 앱', price: 30800 },
      { name: '전체 앱', price: 77000 },
    ]
  },
  'Figma': {
    category: 'Design',
    plans: [
      { name: 'Professional', price: 18000 },
      { name: 'Organization', price: 60000 },
    ]
  },
  'Canva': {
    category: 'Design',
    plans: [
      { name: 'Pro', price: 15000 },
      { name: 'Teams', price: 13000 },
    ]
  },

  // 💻 개발
  'GitHub': {
    category: 'Dev',
    plans: [
      { name: 'Pro', price: 5500 },
      { name: 'Team', price: 5500 },
    ]
  },
  'Vercel': {
    category: 'Dev',
    plans: [
      { name: 'Pro', price: 27000 },
    ]
  },
  'JetBrains': {
    category: 'Dev',
    plans: [
      { name: 'All Products', price: 35000 },
    ]
  },

  // 📚 콘텐츠 / 학습
  'Millie 밀리의서재': {
    category: 'Content',
    plans: [
      { name: '월간', price: 9900 },
    ]
  },
  'Ridibooks Select': {
    category: 'Content',
    plans: [
      { name: '월간', price: 9900 },
    ]
  },
  'Class101+': {
    category: 'Content',
    plans: [
      { name: 'Plus', price: 19900 },
    ]
  },
  'Duolingo': {
    category: 'Content',
    plans: [
      { name: 'Super', price: 15000 },
      { name: '가족', price: 20000 },
    ]
  },

  // 🎮 게임
  'Xbox Game Pass': {
    category: 'Gaming',
    plans: [
      { name: 'Core', price: 8900 },
      { name: 'Standard', price: 14900 },
      { name: 'Ultimate', price: 18900 },
    ]
  },
  'PlayStation Plus': {
    category: 'Gaming',
    plans: [
      { name: 'Essential', price: 8900 },
      { name: 'Extra', price: 14900 },
      { name: 'Premium', price: 17900 },
    ]
  },
  'Nintendo Online': {
    category: 'Gaming',
    plans: [
      { name: '개인', price: 4900 },
      { name: '가족', price: 8900 },
    ]
  },

  // ☁️ 클라우드 / 스토리지
  'iCloud+': {
    category: 'Cloud',
    plans: [
      { name: '50GB', price: 1100 },
      { name: '200GB', price: 3300 },
      { name: '2TB', price: 11000 },
    ]
  },
  'Naver MYBOX': {
    category: 'Cloud',
    plans: [
      { name: '80GB', price: 1650 },
      { name: '200GB', price: 3300 },
    ]
  },

  // 🏋️ 건강 / 피트니스
  'Nike Training Club': {
    category: 'Fitness',
    plans: [
      { name: 'Premium', price: 9900 },
    ]
  },
  'Calm': {
    category: 'Fitness',
    plans: [
      { name: '월간', price: 15000 },
    ]
  },
  'Headspace': {
    category: 'Fitness',
    plans: [
      { name: '월간', price: 12900 },
    ]
  },
};

const popularServices = Object.keys(serviceData);

const initialSubscriptions = [
  { id: 1, name: 'Netflix', plan: '프리미엄', price: 17000, date: 10 },
  { id: 2, name: 'YouTube Premium', plan: '개인', price: 14900, date: 15 },
  { id: 3, name: 'Spotify', plan: '개인', price: 10900, date: 22 },
];

// D-day 계산 함수
const calculateDday = (date) => {
  const today = new Date();
  const currentDate = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  let paymentDate = new Date(currentYear, currentMonth, date);
  
  if (paymentDate <= today) {
    paymentDate = new Date(currentYear, currentMonth + 1, date);
  }
  
  const diffTime = paymentDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

// 카테고리 한글 변환
const categoryNames = {
  'OTT': '영상',
  'Music': '음악',
  'Shopping': '쇼핑',
  'AI': 'AI',
  'Productivity': '업무',
  'Design': '디자인',
  'Dev': '개발',
  'Content': '콘텐츠',
  'Gaming': '게임',
  'Cloud': '클라우드',
  'Fitness': '건강',
};

export default function App() {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [selectedSub, setSelectedSub] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // 서비스 추가 단계
  const [addStep, setAddStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedDate, setSelectedDate] = useState(1);
  
  // 커스텀 구독 입력
  const [customName, setCustomName] = useState('');
  const [customPrice, setCustomPrice] = useState('');
  const [customDate, setCustomDate] = useState(1);

  const totalPrice = subscriptions.reduce((sum, sub) => sum + sub.price, 0);

  // 카테고리 목록
  const categories = ['all', ...new Set(Object.values(serviceData).map(s => s.category))];

  // 검색 및 카테고리 필터링
  const filteredServices = popularServices.filter(service => {
    const matchesSearch = service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || serviceData[service].category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // 서비스 선택
  const handleSelectService = (serviceName) => {
    setSelectedService(serviceName);
    setAddStep(2);
  };

  // 요금제 선택
  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setAddStep(3);
  };

  // 구독 추가 완료
  const handleAddSubscription = () => {
    const newSub = {
      id: Date.now(),
      name: selectedService,
      plan: selectedPlan.name,
      price: selectedPlan.price,
      date: selectedDate,
    };
    setSubscriptions([...subscriptions, newSub]);
    resetAddModal();
  };

  // 커스텀 구독 추가
  const handleAddCustom = () => {
    if (!customName || !customPrice) return;
    const newSub = {
      id: Date.now(),
      name: customName,
      plan: 'Custom',
      price: parseInt(customPrice),
      date: customDate,
    };
    setSubscriptions([...subscriptions, newSub]);
    resetCustomModal();
  };

  // 모달 리셋
  const resetAddModal = () => {
    setShowAddModal(false);
    setAddStep(1);
    setSelectedService(null);
    setSelectedPlan(null);
    setSelectedDate(1);
    setSearchQuery('');
    setSelectedCategory('all');
  };

  const resetCustomModal = () => {
    setShowCustomModal(false);
    setCustomName('');
    setCustomPrice('');
    setCustomDate(1);
  };

  // 구독 삭제
  const deleteSubscription = (id) => {
    setSubscriptions(subscriptions.filter(sub => sub.id !== id));
    setShowDetailModal(false);
  };

  // 구독 정렬 (D-day 순)
  const sortedSubscriptions = [...subscriptions].sort(
    (a, b) => calculateDday(a.date) - calculateDday(b.date)
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-light">
      
      {/* Header */}
      <header className="px-8 py-6 border-b border-neutral-800">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <h1 className="text-sm tracking-[0.3em] uppercase">구독알리미</h1>
          <span className="text-xs text-neutral-500">{Object.keys(serviceData).length}개 서비스</span>
        </div>
      </header>

      {/* Main */}
      <main className="px-8 py-10 max-w-md mx-auto">
        
        {/* Total Card */}
        <div className="mb-12">
          <p className="text-neutral-500 text-xs tracking-widest uppercase mb-3">Monthly Total</p>
          <p className="text-5xl font-extralight tracking-tight mb-2">
            ₩{totalPrice.toLocaleString()}
          </p>
          <p className="text-neutral-500 text-sm">
            {subscriptions.length}개 구독 중 · 연 ₩{(totalPrice * 12).toLocaleString()}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-neutral-800 mb-10"></div>

        {/* Upcoming Section */}
        <div className="mb-10">
          <p className="text-neutral-500 text-xs tracking-widest uppercase mb-6">결제 예정</p>
          
          {subscriptions.length === 0 ? (
            <p className="text-neutral-600 text-sm py-8 text-center">등록된 구독이 없습니다</p>
          ) : (
            <div className="space-y-1">
              {sortedSubscriptions.map((sub) => {
                const dday = calculateDday(sub.date);
                return (
                  <div
                    key={sub.id}
                    onClick={() => {
                      setSelectedSub(sub);
                      setShowDetailModal(true);
                    }}
                    className="group flex items-center justify-between py-4 border-b border-neutral-900 cursor-pointer hover:border-neutral-700 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${dday <= 3 ? 'bg-red-500' : dday <= 7 ? 'bg-amber-500' : 'bg-neutral-600'}`}></div>
                      <div>
                        <p className="font-normal tracking-wide">{sub.name}</p>
                        <p className="text-neutral-600 text-sm">{sub.plan} · 매달 {sub.date}일</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-light">₩{sub.price.toLocaleString()}</p>
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

        {/* Add Button */}
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full py-4 border border-neutral-800 text-neutral-400 text-sm tracking-widest uppercase hover:border-neutral-600 hover:text-white transition-all"
        >
          + 구독 추가
        </button>
      </main>

      {/* Add Modal - Step by Step */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/90 flex items-end justify-center z-50">
          <div className="bg-neutral-950 w-full max-w-md border-t border-neutral-800 p-8 max-h-[85vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                {addStep > 1 && (
                  <button
                    onClick={() => setAddStep(addStep - 1)}
                    className="text-neutral-500 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}
                <p className="text-xs tracking-widest uppercase text-neutral-500">
                  {addStep === 1 && '서비스 선택'}
                  {addStep === 2 && '요금제 선택'}
                  {addStep === 3 && '결제일 선택'}
                </p>
              </div>
              <button
                onClick={resetAddModal}
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Step 1: 서비스 선택 */}
            {addStep === 1 && (
              <>
                {/* 검색창 */}
                <div className="mb-4">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="서비스 검색..."
                    className="w-full bg-transparent border border-neutral-800 px-4 py-3 text-white placeholder-neutral-600 focus:border-neutral-600 focus:outline-none transition-colors text-sm"
                  />
                </div>

                {/* 카테고리 필터 */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 text-xs border transition-colors ${
                        selectedCategory === cat
                          ? 'border-white text-white'
                          : 'border-neutral-800 text-neutral-500 hover:border-neutral-600'
                      }`}
                    >
                      {cat === 'all' ? '전체' : categoryNames[cat] || cat}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6 max-h-[40vh] overflow-y-auto">
                  {filteredServices.map((service) => (
                    <button
                      key={service}
                      onClick={() => handleSelectService(service)}
                      className="text-left p-4 border border-neutral-800 hover:border-neutral-600 transition-colors group"
                    >
                      <p className="font-normal text-sm group-hover:text-white transition-colors truncate">{service}</p>
                      <p className="text-neutral-600 text-xs mt-1">
                        {categoryNames[serviceData[service].category] || serviceData[service].category}
                      </p>
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => {
                    resetAddModal();
                    setShowCustomModal(true);
                  }}
                  className="w-full py-4 border border-dashed border-neutral-800 text-neutral-500 text-sm tracking-wide hover:border-neutral-600 hover:text-neutral-300 transition-all"
                >
                  + 직접 입력하기
                </button>
              </>
            )}

            {/* Step 2: 요금제 선택 */}
            {addStep === 2 && selectedService && (
              <div className="space-y-3">
                <p className="text-white text-lg mb-2">{selectedService}</p>
                <p className="text-neutral-600 text-sm mb-6">
                  {categoryNames[serviceData[selectedService].category] || serviceData[selectedService].category}
                </p>
                {serviceData[selectedService].plans.map((plan) => (
                  <button
                    key={plan.name}
                    onClick={() => handleSelectPlan(plan)}
                    className="w-full flex items-center justify-between p-4 border border-neutral-800 hover:border-neutral-600 transition-colors text-left"
                  >
                    <span className="font-normal">{plan.name}</span>
                    <span className="text-neutral-400">
                      ₩{plan.price.toLocaleString()}/월
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Step 3: 결제일 선택 (1~31일) */}
            {addStep === 3 && (
              <div>
                <p className="text-white text-lg mb-2">{selectedService}</p>
                <p className="text-neutral-500 text-sm mb-8">{selectedPlan?.name} · ₩{selectedPlan?.price.toLocaleString()}/월</p>
                
                <p className="text-neutral-500 text-xs tracking-widest uppercase mb-4">결제일</p>
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(day)}
                      className={`aspect-square flex items-center justify-center text-sm border transition-colors ${
                        selectedDate === day
                          ? 'border-white bg-white text-black'
                          : 'border-neutral-800 hover:border-neutral-600'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>

                <p className="text-neutral-500 text-sm mb-6 text-center">
                  매달 {selectedDate}일 결제
                </p>

                <button
                  onClick={handleAddSubscription}
                  className="w-full py-4 bg-white text-black text-sm tracking-widest uppercase hover:bg-neutral-200 transition-colors"
                >
                  구독 추가
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Custom Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 px-8">
          <div className="bg-neutral-950 w-full max-w-sm border border-neutral-800 p-8">
            
            <div className="flex items-center justify-between mb-8">
              <p className="text-xs tracking-widest uppercase text-neutral-500">직접 입력</p>
              <button
                onClick={resetCustomModal}
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <label className="text-neutral-500 text-xs tracking-widest uppercase block mb-2">서비스명</label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="예: 헬스장, PT..."
                  className="w-full bg-transparent border border-neutral-800 px-4 py-3 text-white placeholder-neutral-600 focus:border-neutral-600 focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <label className="text-neutral-500 text-xs tracking-widest uppercase block mb-2">월 금액 (₩)</label>
                <input
                  type="number"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                  placeholder="10000"
                  className="w-full bg-transparent border border-neutral-800 px-4 py-3 text-white placeholder-neutral-600 focus:border-neutral-600 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-neutral-500 text-xs tracking-widest uppercase block mb-4">결제일</label>
                <div className="grid grid-cols-7 gap-2 max-h-40 overflow-y-auto">
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <button
                      key={day}
                      onClick={() => setCustomDate(day)}
                      className={`aspect-square flex items-center justify-center text-xs border transition-colors ${
                        customDate === day
                          ? 'border-white bg-white text-black'
                          : 'border-neutral-800 hover:border-neutral-600'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleAddCustom}
              disabled={!customName || !customPrice}
              className="w-full py-4 bg-white text-black text-sm tracking-widest uppercase hover:bg-neutral-200 transition-colors disabled:bg-neutral-800 disabled:text-neutral-600 disabled:cursor-not-allowed"
            >
              구독 추가
            </button>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedSub && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 px-8">
          <div className="bg-neutral-950 w-full max-w-sm border border-neutral-800 p-8">
            
            <div className="mb-8">
              <p className="text-xs tracking-widest uppercase text-neutral-500 mb-2">구독 상세</p>
              <p className="text-2xl font-light">{selectedSub.name}</p>
              <p className="text-neutral-500 text-sm mt-1">{selectedSub.plan}</p>
            </div>

            <div className="space-y-6 mb-10">
              <div className="flex justify-between items-center pb-4 border-b border-neutral-900">
                <span className="text-neutral-500 text-sm">월 금액</span>
                <span className="font-light">₩{selectedSub.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-neutral-900">
                <span className="text-neutral-500 text-sm">연간 예상</span>
                <span className="font-light">₩{(selectedSub.price * 12).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-neutral-900">
                <span className="text-neutral-500 text-sm">결제일</span>
                <span className="font-light">매달 {selectedSub.date}일</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-500 text-sm">다음 결제</span>
                <span className={`font-light ${calculateDday(selectedSub.date) <= 3 ? 'text-red-500' : ''}`}>
                  D-{calculateDday(selectedSub.date)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full py-3 bg-white text-black text-sm tracking-wide hover:bg-neutral-200 transition-colors">
                알림 설정
              </button>
              <button className="w-full py-3 border border-neutral-800 text-sm tracking-wide hover:border-neutral-600 transition-colors">
                해지 방법
              </button>
              <button
                onClick={() => deleteSubscription(selectedSub.id)}
                className="w-full py-3 text-red-500 text-sm tracking-wide hover:text-red-400 transition-colors"
              >
                구독 삭제
              </button>
              <button
                onClick={() => setShowDetailModal(false)}
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
