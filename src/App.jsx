import React, { useState, useEffect } from 'react';

// ✅ 2026년 검증된 실제 월 구독 서비스만 포함
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
  '쿠팡플레이': {
    category: 'OTT',
    plans: [
      { name: '로켓와우 포함', price: 0 },
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
  'Google Gemini': {
    category: 'AI',
    plans: [
      { name: 'Advanced', price: 29000 },
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
  'Apple Fitness+': {
    category: 'Fitness',
    plans: [
      { name: '월간', price: 12900 },
    ]
  },

  // 📖 웹툰
  '카카오웹툰': {
    category: 'Webtoon',
    plans: [
      { name: '월정액', price: 9900 },
    ]
  },
  '네이버웹툰': {
    category: 'Webtoon',
    plans: [
      { name: '쿠키 정기구독', price: 4900 },
    ]
  },

  // 🛵 배달
  '요기패스': {
    category: 'Delivery',
    plans: [
      { name: '월간', price: 4900 },
    ]
  },

  // 💳 금융
  '토스프라임': {
    category: 'Finance',
    plans: [
      { name: '월간', price: 5900 },
    ]
  },

  // 📱 통신
  'SKT 우주패스': {
    category: 'Telecom',
    plans: [
      { name: 'All', price: 9900 },
      { name: 'mini', price: 4900 },
    ]
  },
  'KT 슈퍼패스': {
    category: 'Telecom',
    plans: [
      { name: '월간', price: 9900 },
    ]
  },
};

const popularServices = Object.keys(serviceData);

const initialSubscriptions = [
  { id: 1, name: 'Netflix', plan: '프리미엄', price: 17000, date: 10, notificationEnabled: true, isTrial: false, trialEndDate: null },
  { id: 2, name: 'YouTube Premium', plan: '개인', price: 14900, date: 15, notificationEnabled: true, isTrial: false, trialEndDate: null },
  { id: 3, name: 'Spotify', plan: '개인', price: 10900, date: 22, notificationEnabled: true, isTrial: false, trialEndDate: null },
];

// 해지 가이드 DB
const cancellationGuides = {
  'Netflix': {
    url: 'https://www.netflix.com/cancelplan',
    steps: ['넷플릭스 웹사이트 또는 앱 접속', '프로필 아이콘 → 계정 클릭', '멤버십 및 결제 → 멤버십 해지', '해지 확인 버튼 클릭'],
    note: '결제 주기 끝까지 이용 가능',
  },
  'YouTube Premium': {
    url: 'https://www.youtube.com/paid_memberships',
    steps: ['YouTube 앱/웹 → 프로필 아이콘', '유료 멤버십 클릭', 'YouTube Premium → 비활성화', '해지 사유 선택 후 확인'],
    note: '결제일까지 혜택 유지',
  },
  'Spotify': {
    url: 'https://www.spotify.com/account/subscription/',
    steps: ['Spotify 웹사이트 → 계정 페이지', '구독 관리 클릭', 'Spotify Free로 변경 선택', '확인 클릭'],
    note: '앱에서는 해지 불가, 반드시 웹에서',
  },
  'Disney+': {
    url: 'https://www.disneyplus.com/account',
    steps: ['Disney+ 웹사이트 → 계정', '구독 정보 클릭', '구독 해지 선택', '확인'],
    note: '결제 주기 끝까지 이용 가능',
  },
  'TVING': {
    url: 'https://www.tving.com/my',
    steps: ['TVING 웹/앱 → 마이페이지', '이용권 관리 클릭', '이용권 해지 선택', '해지 사유 선택 후 확인'],
    note: '잔여 기간 동안 이용 가능',
  },
  'Wavve': {
    url: 'https://www.wavve.com/my/subscription',
    steps: ['Wavve 웹/앱 → 마이페이지', '이용권 관리', '자동결제 해지', '확인'],
    note: '이용 기간 만료 후 해지 적용',
  },
  'Watcha': {
    url: 'https://watcha.com/settings/membership',
    steps: ['왓챠 웹사이트 → 설정', '멤버십 관리', '구독 해지 클릭', '확인'],
    note: '결제일까지 이용 가능',
  },
  'Apple TV+': {
    url: 'https://support.apple.com/ko-kr/HT202039',
    steps: ['설정 앱 → Apple ID → 구독', 'Apple TV+ 선택', '구독 취소 클릭', '확인'],
    note: 'Apple 기기에서 설정 앱 통해 해지',
  },
  'Amazon Prime Video': {
    url: 'https://www.amazon.co.jp/gp/primecentral',
    steps: ['Amazon 웹사이트 → 계정', '프라임 멤버십 관리', '멤버십 종료 클릭', '확인'],
    note: '잔여 기간 동안 이용 가능',
  },
  'Laftel': {
    url: 'https://laftel.net/settings/membership',
    steps: ['라프텔 웹사이트 → 설정', '멤버십 관리', '구독 해지', '확인'],
    note: null,
  },
  'Apple Music': {
    url: 'https://support.apple.com/ko-kr/HT202039',
    steps: ['설정 앱 → Apple ID → 구독', 'Apple Music 선택', '구독 취소 클릭', '확인'],
    note: 'Apple 기기에서 설정 앱 통해 해지',
  },
  'Melon': {
    url: 'https://www.melon.com/mymusic/ticket/mymusicticket_list.htm',
    steps: ['멜론 웹사이트 → 마이뮤직', '이용권 관리', '자동결제 해지', '확인'],
    note: '이용 기간 만료 후 해지 적용',
  },
  'Genie': {
    url: 'https://www.genie.co.kr/myMusic/buyList',
    steps: ['지니 웹사이트 → 마이뮤직', '이용권 관리', '자동결제 해지', '확인'],
    note: null,
  },
  'FLO': {
    url: 'https://www.music-flo.com/my/ticket',
    steps: ['FLO 앱 → 마이페이지', '이용권 관리', '해지하기 클릭', '확인'],
    note: null,
  },
  'Coupang 로켓와우': {
    url: 'https://www.coupang.com/np/coupangMembership',
    steps: ['쿠팡 앱/웹 → 마이쿠팡', '로켓와우 멤버십', '멤버십 해지', '해지 확인'],
    note: '남은 기간 동안 혜택 유지',
  },
  'Naver Plus 멤버십': {
    url: 'https://nid.naver.com/membership/my',
    steps: ['네이버 → 네이버플러스 멤버십', '멤버십 관리', '해지하기 클릭', '확인'],
    note: '결제일까지 혜택 유지',
  },
  '배민클럽': {
    url: 'https://www.baemin.com',
    steps: ['배민 앱 → My배민', '배민클럽 관리', '구독 해지', '확인'],
    note: '앱에서만 해지 가능',
  },
  'ChatGPT Plus': {
    url: 'https://chat.openai.com/#settings',
    steps: ['ChatGPT → 설정(Settings)', 'Subscription → Manage my subscription', 'Cancel plan 클릭', '확인'],
    note: '결제 주기 끝까지 이용 가능',
  },
  'Claude Pro': {
    url: 'https://claude.ai/settings',
    steps: ['Claude → 설정(Settings)', 'Subscription 메뉴', 'Cancel subscription 클릭', '확인'],
    note: '결제일까지 Pro 기능 유지',
  },
  'Perplexity Pro': {
    url: 'https://www.perplexity.ai/settings/subscription',
    steps: ['Perplexity → Settings', 'Subscription', 'Cancel subscription', '확인'],
    note: null,
  },
  'Midjourney': {
    url: 'https://www.midjourney.com/account',
    steps: ['Midjourney 웹사이트 → Account', 'Manage Subscription', 'Cancel Plan', '확인'],
    note: '남은 GPU 시간은 유지됨',
  },
  'Notion': {
    url: 'https://www.notion.so/my-account',
    steps: ['Notion → Settings & Members', 'Plans → Billing', 'Downgrade to Free', '확인'],
    note: '데이터는 유지되나 기능 제한',
  },
  'Microsoft 365': {
    url: 'https://account.microsoft.com/services',
    steps: ['Microsoft 계정 → 서비스 & 구독', 'Microsoft 365 → 관리', '정기 결제 해제', '확인'],
    note: '구독 기간 만료 후 읽기 전용',
  },
  'Google One': {
    url: 'https://one.google.com/settings',
    steps: ['Google One → 설정', '구독 관리', '구독 취소', '확인'],
    note: '용량 초과 시 업로드 불가',
  },
  'Adobe CC': {
    url: 'https://account.adobe.com/plans',
    steps: ['Adobe 계정 → 플랜 관리', '플랜 취소 클릭', '해지 사유 선택', '확인 (위약금 주의!)'],
    note: '연간 약정 시 위약금 발생 가능',
  },
  'Figma': {
    url: 'https://www.figma.com/settings',
    steps: ['Figma → Settings', 'Account → Billing', 'Cancel subscription', '확인'],
    note: '팀 플랜은 관리자만 해지 가능',
  },
  'Canva': {
    url: 'https://www.canva.com/settings/billing',
    steps: ['Canva → 설정', '결제 및 플랜', '구독 취소', '확인'],
    note: '무료 플랜으로 전환됨',
  },
  'GitHub': {
    url: 'https://github.com/settings/billing/plans',
    steps: ['GitHub → Settings → Billing', 'Plans → Downgrade', 'Free 플랜 선택', '확인'],
    note: '비공개 저장소 기능 제한',
  },
  '1Password': {
    url: 'https://my.1password.com/settings/billing',
    steps: ['1Password → 설정', '결제 관리', '구독 해지', '확인'],
    note: '데이터는 유지되나 읽기 전용',
  },
  'iCloud+': {
    url: 'https://support.apple.com/ko-kr/HT207594',
    steps: ['설정 → Apple ID → iCloud', '저장 공간 관리', '플랜 변경 → 다운그레이드', '확인'],
    note: '용량 초과 시 백업 중단',
  },
  'Millie 밀리의서재': {
    url: 'https://www.millie.co.kr/v3/myPage',
    steps: ['밀리의서재 앱 → 마이페이지', '구독 관리', '구독 해지', '확인'],
    note: '잔여 기간 동안 이용 가능',
  },
  'Ridibooks Select': {
    url: 'https://ridibooks.com/account/subscription',
    steps: ['리디북스 → 마이리디', '구독 관리', 'Select 해지', '확인'],
    note: '대여 도서 반납됨',
  },
  'Xbox Game Pass': {
    url: 'https://account.microsoft.com/services',
    steps: ['Microsoft 계정 → 서비스 & 구독', 'Xbox Game Pass 선택', '정기 결제 해제', '확인'],
    note: '잔여 기간 동안 게임 이용 가능',
  },
  'PlayStation Plus': {
    url: 'https://store.playstation.com/ko-kr/latest',
    steps: ['PS 콘솔 → 설정 → 계정 관리', '계정 정보 → PlayStation 구독', '자동 갱신 해제', '확인'],
    note: '기간 만료 후 온라인 플레이 불가',
  },
  'Class101+': {
    url: 'https://class101.net/account/subscription',
    steps: ['클래스101 → 마이페이지', '구독 관리', '구독 해지', '확인'],
    note: '구독 해지 후 강의 접근 불가',
  },
  'Duolingo': {
    url: 'https://www.duolingo.com/settings/subscription',
    steps: ['Duolingo → 설정', '구독 관리', 'Super 해지', '확인'],
    note: '무료 버전으로 전환 (광고 포함)',
  },
};

// D-day 계산 함수 (매월 N일 기반)
const calculateDday = (date) => {
  const today = new Date();
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

// 무료 체험 D-day 계산 (특정 날짜 기반)
const calculateTrialDday = (trialEndDate) => {
  if (!trialEndDate) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endDate = new Date(trialEndDate);
  endDate.setHours(0, 0, 0, 0);
  const diffTime = endDate - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
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
  'Webtoon': '웹툰',
  'Delivery': '배달',
  'Finance': '금융',
  'Telecom': '통신',
};

// localStorage 유틸
const STORAGE_KEY = 'mitdok-subs';

const loadSubscriptions = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map(sub => ({
        notificationEnabled: true,
        isTrial: false,
        trialEndDate: null,
        ...sub,
      }));
    }
  } catch (e) {
    console.error('localStorage 로드 실패:', e);
  }
  return null;
};

const saveSubscriptions = (subs) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subs));
  } catch (e) {
    console.error('localStorage 저장 실패:', e);
  }
};

export default function App() {
  // 구독 데이터 (localStorage 우선)
  const [subscriptions, setSubscriptions] = useState(() => {
    return loadSubscriptions() || initialSubscriptions;
  });

  // 모달 상태
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [showCancelGuide, setShowCancelGuide] = useState(false);
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

  // 편집 모드
  const [isEditing, setIsEditing] = useState(false);
  const [editPrice, setEditPrice] = useState('');
  const [editPlan, setEditPlan] = useState('');
  const [editDate, setEditDate] = useState(1);

  // 무료 체험
  const [isTrial, setIsTrial] = useState(false);
  const [trialEndDate, setTrialEndDate] = useState('');

  // 알림
  const [notificationPermission, setNotificationPermission] = useState(
    typeof Notification !== 'undefined' ? Notification.permission : 'denied'
  );

  // localStorage 자동 저장
  useEffect(() => {
    saveSubscriptions(subscriptions);
  }, [subscriptions]);

  // 알림 체크 & 발송
  useEffect(() => {
    if (notificationPermission !== 'granted') return;

    const checkAndNotify = () => {
      const notifiedKey = 'mitdok-notified';
      const today = new Date().toISOString().split('T')[0];
      let notified = {};
      try {
        notified = JSON.parse(localStorage.getItem(notifiedKey) || '{}');
      } catch (e) { /* ignore */ }

      // 7일 이상 된 기록 정리
      const cleanDate = new Date();
      cleanDate.setDate(cleanDate.getDate() - 7);
      const cleanStr = cleanDate.toISOString().split('T')[0];
      Object.keys(notified).forEach(key => {
        if (key.slice(0, 10) < cleanStr) delete notified[key];
      });

      subscriptions.forEach(sub => {
        if (!sub.notificationEnabled) return;

        if (!sub.isTrial) {
          const dday = calculateDday(sub.date);
          [7, 3, 1, 0].forEach(d => {
            if (dday === d) {
              const nKey = `${today}-${sub.id}-d${d}`;
              if (!notified[nKey]) {
                const msgs = {
                  7: `${sub.name} 다음주 결제 예정 (₩${sub.price.toLocaleString()})`,
                  3: `${sub.name} 3일 뒤 결제! 해지하려면 지금!`,
                  1: `${sub.name} 내일 결제됩니다 — ₩${sub.price.toLocaleString()}`,
                  0: `${sub.name} 오늘 결제일입니다`,
                };
                new Notification('믿독 구독 알림', { body: msgs[d], tag: nKey });
                notified[nKey] = true;
              }
            }
          });
        }

        if (sub.isTrial && sub.trialEndDate) {
          const trialDday = calculateTrialDday(sub.trialEndDate);
          [3, 1, 0].forEach(d => {
            if (trialDday === d) {
              const nKey = `${today}-${sub.id}-trial-d${d}`;
              if (!notified[nKey]) {
                const msg = d === 0
                  ? `${sub.name} 무료 체험이 오늘 끝납니다! 해지하지 않으면 과금!`
                  : `${sub.name} 무료 체험 ${d}일 남음! 해지 여부 확인하세요`;
                new Notification('믿독 체험 만료 알림', { body: msg, tag: nKey });
                notified[nKey] = true;
              }
            }
          });
        }
      });

      try { localStorage.setItem(notifiedKey, JSON.stringify(notified)); } catch (e) { /* ignore */ }
    };

    checkAndNotify();
    const interval = setInterval(checkAndNotify, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [subscriptions, notificationPermission]);

  // 계산
  const totalPrice = subscriptions.filter(s => !s.isTrial).reduce((sum, sub) => sum + sub.price, 0);
  const trialCount = subscriptions.filter(s => s.isTrial).length;
  const categories = ['all', ...new Set(Object.values(serviceData).map(s => s.category))];

  // 정렬 및 분리
  const sortedSubscriptions = [...subscriptions].sort(
    (a, b) => calculateDday(a.date) - calculateDday(b.date)
  );
  const trialSubscriptions = sortedSubscriptions.filter(sub => sub.isTrial);
  const regularSubscriptions = sortedSubscriptions.filter(sub => !sub.isTrial);

  // 검색 및 카테고리 필터링
  const filteredServices = popularServices.filter(service => {
    const matchesSearch = service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || serviceData[service].category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // 알림 권한 요청
  const requestNotificationPermission = async () => {
    if (typeof Notification === 'undefined') return;
    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);
  };

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
      price: isTrial ? 0 : selectedPlan.price,
      date: selectedDate,
      notificationEnabled: true,
      isTrial: isTrial,
      trialEndDate: isTrial ? trialEndDate : null,
      originalPrice: selectedPlan.price,
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
      notificationEnabled: true,
      isTrial: false,
      trialEndDate: null,
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
    setIsTrial(false);
    setTrialEndDate('');
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
    setIsEditing(false);
  };

  // 편집 기능
  const startEditing = () => {
    setEditPrice(String(selectedSub.price));
    setEditPlan(selectedSub.plan);
    setEditDate(selectedSub.date);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (!editPrice || parseInt(editPrice) <= 0) return;
    const updated = subscriptions.map(sub =>
      sub.id === selectedSub.id
        ? { ...sub, price: parseInt(editPrice), plan: editPlan, date: editDate }
        : sub
    );
    setSubscriptions(updated);
    setSelectedSub({ ...selectedSub, price: parseInt(editPrice), plan: editPlan, date: editDate });
    setIsEditing(false);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  // 알림 토글
  const toggleNotification = (id) => {
    const updated = subscriptions.map(sub =>
      sub.id === id ? { ...sub, notificationEnabled: !sub.notificationEnabled } : sub
    );
    setSubscriptions(updated);
    if (selectedSub && selectedSub.id === id) {
      setSelectedSub({ ...selectedSub, notificationEnabled: !selectedSub.notificationEnabled });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-light">

      {/* Header */}
      <header className="px-8 py-6 border-b border-neutral-800">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <h1 className="text-sm tracking-[0.3em] uppercase">믿독</h1>
          <span className="text-xs text-neutral-500">{Object.keys(serviceData).length}개 서비스</span>
        </div>
      </header>

      {/* Main */}
      <main className="px-8 py-10 max-w-md mx-auto">

        {/* 알림 권한 배너 */}
        {notificationPermission === 'default' && (
          <button
            onClick={requestNotificationPermission}
            className="w-full mb-8 py-3 px-4 border border-neutral-800 text-left hover:border-neutral-600 transition-colors"
          >
            <p className="text-sm text-neutral-300">결제일 알림을 받아보세요</p>
            <p className="text-xs text-neutral-600 mt-1">D-7, D-3, D-1, D-day에 알려드립니다</p>
          </button>
        )}

        {/* Total Card */}
        <div className="mb-12">
          <p className="text-neutral-500 text-xs tracking-widest uppercase mb-3">Monthly Total</p>
          <p className="text-5xl font-extralight tracking-tight mb-2">
            ₩{totalPrice.toLocaleString()}
          </p>
          <p className="text-neutral-500 text-sm">
            {subscriptions.length}개 구독{trialCount > 0 && ` (체험 ${trialCount}개)`} · 연 ₩{(totalPrice * 12).toLocaleString()}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-neutral-800 mb-10"></div>

        {/* Free Trial Section */}
        {trialSubscriptions.length > 0 && (
          <div className="mb-10">
            <p className="text-emerald-500 text-xs tracking-widest uppercase mb-6">무료 체험 중</p>
            <div className="space-y-1">
              {trialSubscriptions.map((sub) => {
                const trialDday = calculateTrialDday(sub.trialEndDate);
                const isUrgent = trialDday !== null && trialDday <= 3;
                const isExpired = trialDday !== null && trialDday <= 0;
                return (
                  <div
                    key={sub.id}
                    onClick={() => { setSelectedSub(sub); setShowDetailModal(true); setIsEditing(false); }}
                    className="group flex items-center justify-between py-4 border-b border-neutral-900 cursor-pointer hover:border-neutral-700 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${
                        isExpired ? 'bg-red-500 animate-pulse' : isUrgent ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}></div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-normal tracking-wide">{sub.name}</p>
                          <span className="text-[10px] px-1.5 py-0.5 border border-emerald-500/30 text-emerald-500">체험</span>
                        </div>
                        <p className="text-neutral-600 text-sm">{sub.plan} · 종료 {sub.trialEndDate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-light text-neutral-500 line-through text-sm">
                        ₩{(sub.originalPrice || sub.price).toLocaleString()}
                      </p>
                      <p className={`text-sm ${isUrgent ? 'text-red-500 font-normal' : 'text-emerald-500'}`}>
                        {isExpired ? '만료!' : trialDday === 0 ? '오늘 만료' : `D-${trialDday}`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="h-px bg-neutral-800 my-10"></div>
          </div>
        )}

        {/* Upcoming Section */}
        <div className="mb-10">
          <p className="text-neutral-500 text-xs tracking-widest uppercase mb-6">결제 예정</p>

          {regularSubscriptions.length === 0 ? (
            <p className="text-neutral-600 text-sm py-8 text-center">등록된 구독이 없습니다</p>
          ) : (
            <div className="space-y-1">
              {regularSubscriptions.map((sub) => {
                const dday = calculateDday(sub.date);
                return (
                  <div
                    key={sub.id}
                    onClick={() => { setSelectedSub(sub); setShowDetailModal(true); setIsEditing(false); }}
                    className="group flex items-center justify-between py-4 border-b border-neutral-900 cursor-pointer hover:border-neutral-700 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${dday <= 3 ? 'bg-red-500' : dday <= 7 ? 'bg-amber-500' : 'bg-neutral-600'}`}></div>
                      <div>
                        <div className="flex items-center gap-1">
                          <p className="font-normal tracking-wide">{sub.name}</p>
                          {sub.notificationEnabled && notificationPermission === 'granted' && (
                            <span className="text-neutral-600 text-xs ml-1">🔔</span>
                          )}
                        </div>
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
                <div className="mb-4">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="서비스 검색..."
                    className="w-full bg-transparent border border-neutral-800 px-4 py-3 text-white placeholder-neutral-600 focus:border-neutral-600 focus:outline-none transition-colors text-sm"
                  />
                </div>

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
                  onClick={() => { resetAddModal(); setShowCustomModal(true); }}
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

            {/* Step 3: 결제일 선택 */}
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

                {/* 무료 체험 토글 */}
                <div className="mb-6">
                  <button
                    onClick={() => setIsTrial(!isTrial)}
                    className={`w-full flex items-center justify-between p-4 border transition-colors ${
                      isTrial ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-neutral-800 hover:border-neutral-600'
                    }`}
                  >
                    <span className="text-sm">무료 체험 중</span>
                    <div className={`w-10 h-5 rounded-full relative transition-colors ${
                      isTrial ? 'bg-emerald-500' : 'bg-neutral-700'
                    }`}>
                      <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
                        isTrial ? 'translate-x-5' : 'translate-x-0.5'
                      }`}></div>
                    </div>
                  </button>

                  {isTrial && (
                    <div className="mt-3 p-4 border border-neutral-800">
                      <label className="text-neutral-500 text-xs tracking-widest uppercase block mb-2">체험 종료일</label>
                      <input
                        type="date"
                        value={trialEndDate}
                        onChange={(e) => setTrialEndDate(e.target.value)}
                        className="w-full bg-transparent border border-neutral-800 px-4 py-3 text-white focus:border-neutral-600 focus:outline-none transition-colors text-sm"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  )}
                </div>

                <button
                  onClick={handleAddSubscription}
                  disabled={isTrial && !trialEndDate}
                  className="w-full py-4 bg-white text-black text-sm tracking-widest uppercase hover:bg-neutral-200 transition-colors disabled:bg-neutral-800 disabled:text-neutral-600 disabled:cursor-not-allowed"
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
              <div className="flex items-center gap-2">
                <p className="text-2xl font-light">{selectedSub.name}</p>
                {selectedSub.isTrial && (
                  <span className="text-[10px] px-1.5 py-0.5 border border-emerald-500/30 text-emerald-500">체험</span>
                )}
              </div>
              <p className="text-neutral-500 text-sm mt-1">{selectedSub.plan}</p>
            </div>

            {isEditing ? (
              /* 편집 모드 */
              <div className="space-y-6 mb-10">
                <div>
                  <label className="text-neutral-500 text-xs tracking-widest uppercase block mb-2">요금제명</label>
                  <input
                    type="text"
                    value={editPlan}
                    onChange={(e) => setEditPlan(e.target.value)}
                    className="w-full bg-transparent border border-neutral-800 px-4 py-3 text-white focus:border-neutral-600 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-neutral-500 text-xs tracking-widest uppercase block mb-2">월 금액 (원)</label>
                  <input
                    type="number"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    className="w-full bg-transparent border border-neutral-800 px-4 py-3 text-white focus:border-neutral-600 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-neutral-500 text-xs tracking-widest uppercase block mb-4">결제일</label>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <button
                        key={day}
                        onClick={() => setEditDate(day)}
                        className={`aspect-square flex items-center justify-center text-xs border transition-colors ${
                          editDate === day
                            ? 'border-white bg-white text-black'
                            : 'border-neutral-800 hover:border-neutral-600'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3 pt-4">
                  <button
                    onClick={handleSaveEdit}
                    className="w-full py-3 bg-white text-black text-sm tracking-wide hover:bg-neutral-200 transition-colors"
                  >
                    저장
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="w-full py-3 text-neutral-600 text-sm hover:text-neutral-400 transition-colors"
                  >
                    취소
                  </button>
                </div>
              </div>
            ) : (
              /* 보기 모드 */
              <>
                <div className="space-y-6 mb-10">
                  {selectedSub.isTrial && (
                    <div className="flex justify-between items-center pb-4 border-b border-neutral-900">
                      <span className="text-neutral-500 text-sm">체험 상태</span>
                      <span className="text-emerald-500 font-light">
                        {calculateTrialDday(selectedSub.trialEndDate) <= 0
                          ? '만료됨'
                          : `D-${calculateTrialDday(selectedSub.trialEndDate)} 남음`}
                      </span>
                    </div>
                  )}
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
                  <button
                    onClick={startEditing}
                    className="w-full py-3 bg-white text-black text-sm tracking-wide hover:bg-neutral-200 transition-colors"
                  >
                    편집
                  </button>
                  {notificationPermission === 'granted' ? (
                    <button
                      onClick={() => toggleNotification(selectedSub.id)}
                      className={`w-full py-3 text-sm tracking-wide transition-colors ${
                        selectedSub.notificationEnabled
                          ? 'border border-white text-white hover:bg-white hover:text-black'
                          : 'border border-neutral-800 text-neutral-500 hover:border-neutral-600'
                      }`}
                    >
                      알림 {selectedSub.notificationEnabled ? 'ON' : 'OFF'}
                    </button>
                  ) : (
                    <button
                      onClick={requestNotificationPermission}
                      className="w-full py-3 border border-neutral-800 text-sm tracking-wide hover:border-neutral-600 transition-colors"
                    >
                      알림 허용하기
                    </button>
                  )}
                  <button
                    onClick={() => setShowCancelGuide(true)}
                    className="w-full py-3 border border-neutral-800 text-sm tracking-wide hover:border-neutral-600 transition-colors"
                  >
                    해지 방법
                  </button>
                  <button
                    onClick={() => deleteSubscription(selectedSub.id)}
                    className="w-full py-3 text-red-500 text-sm tracking-wide hover:text-red-400 transition-colors"
                  >
                    구독 삭제
                  </button>
                  <button
                    onClick={() => { setShowDetailModal(false); setIsEditing(false); }}
                    className="w-full py-3 text-neutral-600 text-sm hover:text-neutral-400 transition-colors"
                  >
                    닫기
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Cancel Guide Modal */}
      {showCancelGuide && selectedSub && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60] px-8">
          <div className="bg-neutral-950 w-full max-w-sm border border-neutral-800 p-8 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs tracking-widest uppercase text-neutral-500">해지 가이드</p>
              <button
                onClick={() => setShowCancelGuide(false)}
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-xl font-light mb-6">{selectedSub.name}</p>

            {cancellationGuides[selectedSub.name] ? (
              <>
                <div className="mb-6">
                  <p className="text-neutral-500 text-xs tracking-widest uppercase mb-4">해지 순서</p>
                  <div className="space-y-3">
                    {cancellationGuides[selectedSub.name].steps.map((step, i) => (
                      <div key={i} className="flex gap-3">
                        <span className="text-neutral-600 text-sm flex-shrink-0">{i + 1}.</span>
                        <span className="text-sm text-neutral-300">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {cancellationGuides[selectedSub.name].note && (
                  <p className="text-xs text-amber-500/80 mb-6 px-3 py-2 border border-amber-500/20 bg-amber-500/5">
                    {cancellationGuides[selectedSub.name].note}
                  </p>
                )}

                <a
                  href={cancellationGuides[selectedSub.name].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 bg-white text-black text-sm tracking-wide text-center hover:bg-neutral-200 transition-colors"
                >
                  해지 페이지로 이동
                </a>
              </>
            ) : (
              <div className="py-8 text-center">
                <p className="text-neutral-500 text-sm mb-2">해지 가이드가 아직 없습니다</p>
                <p className="text-neutral-600 text-xs">해당 서비스 앱 또는 웹사이트의<br/>구독/멤버십 설정에서 해지할 수 있습니다</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
