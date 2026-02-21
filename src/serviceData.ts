export interface ServicePlan {
  name: string;
  price: number;
}

export interface ServiceInfo {
  category: string;
  plans: ServicePlan[];
}

export const serviceData: Record<string, ServiceInfo> = {
  'Netflix': { category: 'OTT', plans: [{ name: '광고형 스탠다드', price: 7000 }, { name: '스탠다드', price: 13500 }, { name: '프리미엄', price: 17000 }] },
  'YouTube Premium': { category: 'OTT', plans: [{ name: '개인', price: 14900 }, { name: '라이트 (영상만)', price: 8500 }] },
  'Disney+': { category: 'OTT', plans: [{ name: '스탠다드', price: 9900 }, { name: '프리미엄', price: 13900 }] },
  'TVING': { category: 'OTT', plans: [{ name: '광고형 스탠다드', price: 5500 }, { name: '베이직', price: 9500 }, { name: '스탠다드', price: 13500 }, { name: '프리미엄', price: 17000 }] },
  'Wavve': { category: 'OTT', plans: [{ name: '베이직', price: 7900 }, { name: '스탠다드', price: 10900 }, { name: '프리미엄', price: 13900 }] },
  'Watcha': { category: 'OTT', plans: [{ name: '베이직', price: 7900 }, { name: '프리미엄', price: 12900 }] },
  'Apple TV+': { category: 'OTT', plans: [{ name: '월간', price: 9900 }] },
  'Amazon Prime Video': { category: 'OTT', plans: [{ name: '월간', price: 5900 }] },
  'Laftel': { category: 'OTT', plans: [{ name: '프리미엄', price: 9900 }] },
  'Spotify': { category: 'Music', plans: [{ name: '개인', price: 10900 }, { name: '듀오', price: 14900 }, { name: '패밀리', price: 16900 }, { name: '학생', price: 5900 }] },
  'Apple Music': { category: 'Music', plans: [{ name: '개인', price: 10900 }, { name: '가족', price: 16900 }, { name: '학생', price: 5900 }] },
  'Melon': { category: 'Music', plans: [{ name: '스트리밍', price: 7900 }, { name: '스트리밍+다운로드', price: 10900 }] },
  'Genie': { category: 'Music', plans: [{ name: '스트리밍', price: 7900 }, { name: '스트리밍+다운로드', price: 10900 }] },
  'FLO': { category: 'Music', plans: [{ name: '무제한', price: 10900 }] },
  'VIBE': { category: 'Music', plans: [{ name: '스트리밍', price: 7900 }, { name: '무제한', price: 10900 }] },
  'Bugs': { category: 'Music', plans: [{ name: '스트리밍', price: 7900 }, { name: '무제한', price: 10900 }] },
  'Coupang 로켓와우': { category: 'Shopping', plans: [{ name: '월간', price: 7890 }] },
  'Naver Plus 멤버십': { category: 'Shopping', plans: [{ name: '월간', price: 4900 }] },
  'SSG 유니버스클럽': { category: 'Shopping', plans: [{ name: '연간', price: 30000 }, { name: '연간 (할인)', price: 4900 }] },
  '11번가 우주패스': { category: 'Shopping', plans: [{ name: '월간', price: 4900 }] },
  'Kurly 컬리패스': { category: 'Shopping', plans: [{ name: '월간', price: 4900 }] },
  '배민클럽': { category: 'Delivery', plans: [{ name: '월간', price: 3990 }, { name: '월간 (프로모션)', price: 1990 }] },
  '쿠팡이츠 와우': { category: 'Delivery', plans: [{ name: '로켓와우 포함', price: 0 }] },
  '요기패스': { category: 'Delivery', plans: [{ name: '월간', price: 4900 }] },
  '요기패스X': { category: 'Delivery', plans: [{ name: '월간', price: 2900 }] },
  '땡겨요 패스': { category: 'Delivery', plans: [{ name: '월간', price: 1900 }] },
  'ChatGPT': { category: 'AI', plans: [{ name: 'Plus', price: 29000 }, { name: 'Pro', price: 290000 }] },
  'Gemini': { category: 'AI', plans: [{ name: 'AI Pro', price: 27000 }, { name: 'AI Ultra', price: 340000 }] },
  'Claude': { category: 'AI', plans: [{ name: 'Pro', price: 27000 }, { name: 'Max 5x', price: 135000 }, { name: 'Max 20x', price: 270000 }] },
  'Perplexity': { category: 'AI', plans: [{ name: 'Pro', price: 27000 }, { name: 'Max', price: 270000 }] },
  'Midjourney': { category: 'AI', plans: [{ name: 'Basic', price: 14000 }, { name: 'Standard', price: 40000 }, { name: 'Pro', price: 80000 }, { name: 'Mega', price: 160000 }] },
  'Runway': { category: 'AI', plans: [{ name: 'Standard', price: 20000 }, { name: 'Pro', price: 47000 }, { name: 'Unlimited', price: 128000 }] },
  'Higgsfield': { category: 'AI', plans: [{ name: 'Basic', price: 12000 }, { name: 'Pro', price: 39000 }, { name: 'Ultimate', price: 66000 }] },
  'Kling AI': { category: 'AI', plans: [{ name: 'Standard', price: 9500 }, { name: 'Pro', price: 35000 }, { name: 'Premier', price: 124000 }] },
  'Suno AI': { category: 'AI', plans: [{ name: 'Pro', price: 12000 }, { name: 'Premier', price: 30000 }] },
  'Notion': { category: 'Productivity', plans: [{ name: 'Plus', price: 12000 }, { name: 'Business', price: 22000 }] },
  'Microsoft 365': { category: 'Productivity', plans: [{ name: 'Personal', price: 8900 }, { name: 'Family', price: 12900 }] },
  'Google One': { category: 'Productivity', plans: [{ name: '100GB', price: 2400 }, { name: '200GB', price: 3700 }, { name: '2TB', price: 11900 }] },
  'Dropbox': { category: 'Productivity', plans: [{ name: 'Plus', price: 14000 }, { name: 'Professional', price: 26000 }] },
  '1Password': { category: 'Productivity', plans: [{ name: '개인', price: 4000 }, { name: '가족', price: 6500 }] },
  'Slack': { category: 'Productivity', plans: [{ name: 'Pro', price: 10000 }] },
  'Zoom': { category: 'Productivity', plans: [{ name: 'Pro', price: 20000 }] },
  'Adobe CC': { category: 'Design', plans: [{ name: '포토그래피', price: 13200 }, { name: '단일 앱', price: 30800 }, { name: '전체 앱', price: 77000 }] },
  'Figma': { category: 'Design', plans: [{ name: 'Professional', price: 18000 }, { name: 'Organization', price: 60000 }] },
  'Canva': { category: 'Design', plans: [{ name: 'Pro', price: 15000 }, { name: 'Teams', price: 13000 }] },
  'GitHub': { category: 'Dev', plans: [{ name: 'Pro', price: 5500 }, { name: 'Team', price: 5500 }] },
  'Vercel': { category: 'Dev', plans: [{ name: 'Pro', price: 27000 }] },
  'JetBrains': { category: 'Dev', plans: [{ name: 'All Products', price: 35000 }] },
  'Millie 밀리의서재': { category: 'Content', plans: [{ name: '월간', price: 9900 }] },
  'Ridibooks Select': { category: 'Content', plans: [{ name: '월간', price: 9900 }] },
  'Class101+': { category: 'Content', plans: [{ name: 'Plus', price: 19900 }] },
  'Duolingo': { category: 'Content', plans: [{ name: 'Super', price: 15000 }, { name: '가족', price: 20000 }] },
  'Xbox Game Pass': { category: 'Gaming', plans: [{ name: 'Core', price: 8900 }, { name: 'Standard', price: 14900 }, { name: 'Ultimate', price: 18900 }] },
  'PlayStation Plus': { category: 'Gaming', plans: [{ name: 'Essential', price: 8900 }, { name: 'Extra', price: 14900 }, { name: 'Premium', price: 17900 }] },
  'Nintendo Online': { category: 'Gaming', plans: [{ name: '개인', price: 4900 }, { name: '가족', price: 8900 }] },
  'iCloud+': { category: 'Cloud', plans: [{ name: '50GB', price: 1100 }, { name: '200GB', price: 3300 }, { name: '2TB', price: 11000 }] },
  'Naver MYBOX': { category: 'Cloud', plans: [{ name: '80GB', price: 1650 }, { name: '200GB', price: 3300 }] },
  'Nike Training Club': { category: 'Fitness', plans: [{ name: 'Premium', price: 9900 }] },
  'Calm': { category: 'Fitness', plans: [{ name: '월간', price: 15000 }] },
  'Headspace': { category: 'Fitness', plans: [{ name: '월간', price: 12900 }] },
};

export const categoryNames: Record<string, string> = {
  'OTT': '영상', 'Music': '음악', 'Shopping': '쇼핑', 'AI': 'AI',
  'Productivity': '업무', 'Design': '디자인', 'Dev': '개발',
  'Content': '콘텐츠', 'Gaming': '게임', 'Cloud': '클라우드', 'Fitness': '건강',
  'Delivery': '배달',
};

export interface CancellationInfo {
  steps: string[];
  url?: string;
  note?: string;
}

export function calculateTrialDaysLeft(trialEndDate: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date(trialEndDate);
  end.setHours(0, 0, 0, 0);
  return Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function calculateDday(billingDay: number): number {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  let paymentDate = new Date(currentYear, currentMonth, billingDay);
  if (paymentDate <= today) {
    paymentDate = new Date(currentYear, currentMonth + 1, billingDay);
  }
  return Math.ceil((paymentDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}
