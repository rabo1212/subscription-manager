import type { CancellationInfo } from './serviceData';

export const cancellationGuides: Record<string, CancellationInfo> = {
  // ─── OTT ───────────────────────────────────────────────
  'Netflix': {
    steps: [
      'Netflix 웹사이트(netflix.com)에 로그인합니다.',
      '오른쪽 상단 프로필 아이콘을 클릭한 뒤 "계정"을 선택합니다.',
      '"멤버십 및 결제" 섹션에서 "멤버십 해지"를 클릭합니다.',
      '"해지 완료" 버튼을 눌러 해지를 확정합니다.',
    ],
    url: 'https://www.netflix.com/account',
    note: '결제 주기 종료까지 이용 가능',
  },
  'YouTube Premium': {
    steps: [
      'YouTube 앱 또는 웹(youtube.com)에서 로그인합니다.',
      '프로필 아이콘 > "구매 항목 및 멤버십"을 선택합니다.',
      'YouTube Premium 멤버십에서 "관리"를 누릅니다.',
      '"멤버십 비활성화"를 선택한 뒤 "해지"를 확정합니다.',
    ],
    url: 'https://www.youtube.com/paid_memberships',
    note: '결제 주기 종료까지 이용 가능',
  },
  'Disney+': {
    steps: [
      'Disney+ 앱 또는 웹(disneyplus.com)에 로그인합니다.',
      '프로필 아이콘 > "계정"을 선택합니다.',
      '"구독" 섹션에서 현재 이용 중인 플랜을 선택합니다.',
      '"구독 해지"를 클릭하고 확인합니다.',
    ],
    url: 'https://www.disneyplus.com/account',
    note: '결제 주기 종료까지 이용 가능',
  },
  'TVING': {
    steps: [
      'TVING 앱 또는 웹(tving.com)에 로그인합니다.',
      '오른쪽 상단 프로필 > "이용권 관리"를 선택합니다.',
      '"자동결제 해지" 버튼을 누릅니다.',
      '해지 사유를 선택한 뒤 "해지하기"를 확정합니다.',
    ],
    url: 'https://www.tving.com/my/membership',
    note: '잔여기간 이용 가능',
  },
  'Wavve': {
    steps: [
      'Wavve 앱 또는 웹(wavve.com)에 로그인합니다.',
      '하단 또는 우측 상단 "MY" 메뉴를 선택합니다.',
      '"이용권 관리" > "이용권 해지"를 누릅니다.',
      '해지 확인 팝업에서 "해지하기"를 선택합니다.',
    ],
    url: 'https://www.wavve.com/my/ticket_manage',
    note: '잔여기간 이용 가능',
  },
  'Watcha': {
    steps: [
      'Watcha 앱 또는 웹(watcha.com)에 로그인합니다.',
      '프로필 > "설정"을 선택합니다.',
      '"구독 관리" 메뉴에서 "구독 해지"를 누릅니다.',
      '해지 사유를 선택하고 "해지 완료"를 확정합니다.',
    ],
    url: 'https://watcha.com/settings/account',
    note: '결제 주기 종료까지 이용 가능',
  },
  'Apple TV+': {
    steps: [
      'iPhone/iPad의 "설정" 앱을 열고 상단 Apple ID를 탭합니다.',
      '"구독"을 선택합니다.',
      '"Apple TV+"를 탭합니다.',
      '"구독 취소"를 눌러 해지를 확정합니다.',
    ],
    url: 'https://support.apple.com/ko-kr/HT202039',
    note: '결제 주기 종료까지 이용 가능',
  },
  'Amazon Prime Video': {
    steps: [
      'Amazon 웹사이트(amazon.com)에 로그인합니다.',
      '"계정 및 목록" > "Prime 멤버십"을 선택합니다.',
      '"멤버십 관리" 탭에서 "멤버십 종료"를 클릭합니다.',
      '안내 페이지에서 "계속해서 취소"를 선택하고 확정합니다.',
    ],
    url: 'https://www.amazon.com/mc/pipelines',
    note: '결제 주기 종료까지 이용 가능',
  },
  'Laftel': {
    steps: [
      'Laftel 앱 또는 웹(laftel.net)에 로그인합니다.',
      '우측 상단 프로필 > "멤버십 관리"를 선택합니다.',
      '"구독 해지" 버튼을 누릅니다.',
      '해지 사유를 선택한 뒤 "해지 확인"을 누릅니다.',
    ],
    url: 'https://laftel.net/membership',
    note: '결제 주기 종료까지 이용 가능',
  },

  // ─── Music ─────────────────────────────────────────────
  'Spotify': {
    steps: [
      'Spotify 웹(accounts.spotify.com)에 로그인합니다.',
      '"계정 개요" 페이지에서 "플랜" 섹션을 찾습니다.',
      '"플랜 변경" 또는 "Spotify Free"로 변경을 선택합니다.',
      '"프리미엄 취소" 확인을 눌러 해지를 완료합니다.',
    ],
    url: 'https://www.spotify.com/account/overview/',
    note: '결제 주기 종료까지 프리미엄 이용 가능, 이후 무료 플랜 전환',
  },
  'Apple Music': {
    steps: [
      'iPhone/iPad의 "설정" 앱에서 상단 Apple ID를 탭합니다.',
      '"구독"을 선택합니다.',
      '"Apple Music"을 탭합니다.',
      '"구독 취소"를 눌러 해지를 확정합니다.',
    ],
    url: 'https://support.apple.com/ko-kr/HT202039',
    note: '결제 주기 종료까지 이용 가능',
  },
  'Melon': {
    steps: [
      'Melon 앱 또는 웹(melon.com)에 로그인합니다.',
      '"MY" > "이용권 관리"를 선택합니다.',
      '"자동결제 해지" 버튼을 누릅니다.',
      '해지 사유를 선택하고 "해지하기"를 확정합니다.',
    ],
    url: 'https://www.melon.com/my/ticket/onTicket.htm',
    note: '잔여기간 이용 가능',
  },
  'Genie': {
    steps: [
      'Genie 앱 또는 웹(genie.co.kr)에 로그인합니다.',
      '"MY" > "이용권/결제관리"를 선택합니다.',
      '"이용권 해지" 버튼을 누릅니다.',
      '해지 확인 팝업에서 "해지"를 선택합니다.',
    ],
    url: 'https://www.genie.co.kr/buy/mypurchase',
    note: '잔여기간 이용 가능',
  },
  'FLO': {
    steps: [
      'FLO 앱 또는 웹(flo.kr)에 로그인합니다.',
      '"마이" > "이용권 관리"를 선택합니다.',
      '"이용권 해지" 버튼을 누릅니다.',
      '해지 사유를 선택하고 "해지 완료"를 확정합니다.',
    ],
    url: 'https://www.flo.kr/my/ticket',
    note: '잔여기간 이용 가능',
  },
  'VIBE': {
    steps: [
      'VIBE 앱 또는 웹(vibe.naver.com)에 로그인합니다.',
      '좌측 메뉴 또는 "MY" > "이용권 관리"를 선택합니다.',
      '"자동결제 해지" 버튼을 누릅니다.',
      '해지 확인을 누르면 해지가 완료됩니다.',
    ],
    url: 'https://vibe.naver.com/my/ticket',
    note: '잔여기간 이용 가능',
  },
  'Bugs': {
    steps: [
      'Bugs 앱 또는 웹(bugs.co.kr)에 로그인합니다.',
      '"마이벅스" > "이용권 관리"를 선택합니다.',
      '"자동결제 해지" 버튼을 누릅니다.',
      '해지 사유를 선택하고 "해지하기"를 확정합니다.',
    ],
    url: 'https://www.bugs.co.kr/my/ticket',
    note: '잔여기간 이용 가능',
  },

  // ─── Shopping ──────────────────────────────────────────
  'Coupang 로켓와우': {
    steps: [
      '쿠팡 앱 또는 웹(coupang.com)에 로그인합니다.',
      '"마이쿠팡" > "로켓와우 관리"를 선택합니다.',
      '"와우 멤버십 해지" 버튼을 누릅니다.',
      '해지 사유를 선택한 뒤 "해지하기"를 확정합니다.',
    ],
    url: 'https://www.coupang.com/np/coupangPlay/membership',
    note: '결제 주기 종료까지 이용 가능',
  },
  'Naver Plus 멤버십': {
    steps: [
      '네이버 앱 또는 웹(naver.com)에 로그인합니다.',
      '"네이버 플러스 멤버십" 페이지로 이동합니다.',
      '"멤버십 해지" 버튼을 누릅니다.',
      '해지 사유를 선택하고 "해지 완료"를 확정합니다.',
    ],
    url: 'https://nid.naver.com/membership/my',
    note: '결제 주기 종료까지 이용 가능, 적립 포인트는 유지',
  },
  'SSG 유니버스클럽': {
    steps: [
      'SSG 앱 또는 웹(ssg.com)에 로그인합니다.',
      '"마이 SSG" > "유니버스클럽 관리"를 선택합니다.',
      '"해지" 버튼을 누릅니다.',
      '해지 확인 팝업에서 "해지하기"를 선택합니다.',
    ],
    url: 'https://m.ssg.com/myssg/main.ssg',
    note: '연간 구독의 경우 잔여기간 이용 가능',
  },
  '11번가 우주패스': {
    steps: [
      '11번가 앱 또는 웹(11st.co.kr)에 로그인합니다.',
      '"마이11번가" > "우주패스 관리"를 선택합니다.',
      '"구독 해지" 버튼을 누릅니다.',
      '해지 사유를 선택한 뒤 "해지 완료"를 확정합니다.',
    ],
    url: 'https://www.11st.co.kr/mypage',
    note: '결제 주기 종료까지 이용 가능',
  },
  'Kurly 컬리패스': {
    steps: [
      '마켓컬리 앱 또는 웹(kurly.com)에 로그인합니다.',
      '"마이컬리" > "컬리패스 관리"를 선택합니다.',
      '"패스 해지" 버튼을 누릅니다.',
      '해지 확인을 눌러 해지를 완료합니다.',
    ],
    url: 'https://www.kurly.com/mypage',
    note: '결제 주기 종료까지 이용 가능',
  },
  '배민클럽': {
    steps: [
      '배달의민족 앱을 열고 로그인합니다.',
      '"My배민" > "배민클럽 관리"를 선택합니다.',
      '"구독 해지" 버튼을 누릅니다.',
      '해지 사유를 선택하고 "해지하기"를 확정합니다.',
    ],
    url: 'https://baemin.com',
    note: '결제 주기 종료까지 이용 가능',
  },

  // ─── AI ────────────────────────────────────────────────
  'ChatGPT': {
    steps: [
      'ChatGPT 웹(chat.openai.com)에 로그인합니다.',
      '좌측 하단 사용자 이름 또는 프로필 아이콘을 클릭합니다.',
      '"설정" > "구독" 메뉴를 선택합니다.',
      '"플랜 관리" > "구독 취소"를 클릭하고 확정합니다.',
    ],
    url: 'https://chat.openai.com/#settings/subscription',
    note: '결제 주기 종료까지 이용 가능',
  },
  'Gemini': {
    steps: [
      'Google One 웹(one.google.com)에 로그인합니다.',
      '"설정" > "멤버십 해지"를 선택합니다.',
      '또는 play.google.com > "구독" 메뉴에서 Gemini 구독을 찾습니다.',
      '"구독 취소"를 눌러 해지를 확정합니다.',
    ],
    url: 'https://one.google.com/about/plans',
    note: '결제 주기 종료까지 이용 가능',
  },
  'Claude': {
    steps: [
      'Claude 웹(claude.ai)에 로그인합니다.',
      '좌측 하단 사용자 이름을 클릭합니다.',
      '"Settings" > "Billing"을 선택합니다.',
      '"Cancel plan" 또는 "구독 취소" 버튼을 눌러 해지를 확정합니다.',
    ],
    url: 'https://claude.ai/settings/billing',
    note: '결제 주기 종료까지 이용 가능',
  },
  'Perplexity': {
    steps: [
      'Perplexity 웹(perplexity.ai)에 로그인합니다.',
      '좌측 하단 사용자 아이콘을 클릭합니다.',
      '"Settings" > "Subscription"을 선택합니다.',
      '"Cancel subscription"을 눌러 해지를 확정합니다.',
    ],
    url: 'https://www.perplexity.ai/settings/subscription',
    note: '결제 주기 종료까지 이용 가능',
  },
  'Midjourney': {
    steps: [
      'Midjourney 웹(midjourney.com)에 로그인합니다.',
      '좌측 메뉴에서 "Manage Sub" 또는 계정 설정을 선택합니다.',
      '"Cancel Plan"을 클릭합니다.',
      '해지 확인 팝업에서 "Confirm Cancellation"을 누릅니다.',
    ],
    url: 'https://www.midjourney.com/account',
    note: '결제 주기 종료까지 잔여 크레딧 사용 가능',
  },
  'Runway': {
    steps: [
      'Runway 웹(runwayml.com)에 로그인합니다.',
      '우측 상단 프로필 > "Settings"를 선택합니다.',
      '"Plans & Billing" 탭에서 "Cancel Plan"을 클릭합니다.',
      '해지 사유를 선택하고 "Confirm"을 눌러 확정합니다.',
    ],
    url: 'https://app.runwayml.com/settings/plans',
    note: '결제 주기 종료까지 잔여 크레딧 사용 가능',
  },
  'Higgsfield': {
    steps: [
      'Higgsfield 웹(higgsfield.ai)에 로그인합니다.',
      '프로필 또는 계정 설정으로 이동합니다.',
      '"Subscription" 또는 "Billing" 메뉴에서 "Cancel"을 선택합니다.',
      '해지 확인을 눌러 해지를 완료합니다.',
    ],
    url: 'https://higgsfield.ai/account',
    note: '결제 주기 종료까지 이용 가능',
  },
  'Kling AI': {
    steps: [
      'Kling AI 웹(klingai.com)에 로그인합니다.',
      '우측 상단 프로필 > 계정 설정을 선택합니다.',
      '"Subscription" 메뉴에서 "Cancel subscription"을 클릭합니다.',
      '해지 확인을 눌러 해지를 완료합니다.',
    ],
    url: 'https://klingai.com/account',
    note: '결제 주기 종료까지 잔여 크레딧 사용 가능',
  },
  'Suno AI': {
    steps: [
      'Suno AI 웹(suno.com)에 로그인합니다.',
      '좌측 메뉴 또는 프로필에서 "Settings"를 선택합니다.',
      '"Subscription" 또는 "Billing" 탭에서 "Cancel Plan"을 클릭합니다.',
      '해지 확인을 눌러 해지를 완료합니다.',
    ],
    url: 'https://suno.com/account',
    note: '결제 주기 종료까지 잔여 크레딧 사용 가능',
  },

  // ─── Productivity ──────────────────────────────────────
  'Notion': {
    steps: [
      'Notion 웹(notion.so)에 로그인합니다.',
      '좌측 사이드바 "Settings & Members"를 클릭합니다.',
      '"Plans" 또는 "Billing" 탭을 선택합니다.',
      '"Downgrade to Free" 또는 "Cancel plan"을 눌러 해지를 확정합니다.',
    ],
    url: 'https://www.notion.so/settings/billing',
    note: '결제 주기 종료까지 이용 가능, 이후 무료 플랜으로 전환',
  },
  'Microsoft 365': {
    steps: [
      'Microsoft 계정(account.microsoft.com)에 로그인합니다.',
      '"서비스 및 구독"을 클릭합니다.',
      'Microsoft 365 구독에서 "관리"를 선택합니다.',
      '"구독 취소" 또는 "정기 청구 끄기"를 선택하고 확정합니다.',
    ],
    url: 'https://account.microsoft.com/services',
    note: '결제 주기 종료까지 이용 가능',
  },
  'Google One': {
    steps: [
      'Google One 웹(one.google.com)에 로그인합니다.',
      '"설정" 메뉴를 선택합니다.',
      '"멤버십 해지"를 클릭합니다.',
      '해지 확인 페이지에서 "해지"를 선택합니다.',
    ],
    url: 'https://one.google.com/settings',
    note: '결제 주기 종료까지 이용 가능, 이후 무료 15GB로 전환',
  },
  'Dropbox': {
    steps: [
      'Dropbox 웹(dropbox.com)에 로그인합니다.',
      '우측 상단 프로필 아이콘 > "설정"을 선택합니다.',
      '"요금제" 탭에서 "요금제 다운그레이드"를 클릭합니다.',
      '"Basic(무료)"로 변경을 선택하고 해지를 확정합니다.',
    ],
    url: 'https://www.dropbox.com/account/plan',
    note: '결제 주기 종료까지 이용 가능, 이후 무료 플랜으로 전환',
  },
  '1Password': {
    steps: [
      '1Password 웹(my.1password.com)에 로그인합니다.',
      '우측 상단 이름 > "내 프로필"을 선택합니다.',
      '"청구" 탭에서 "구독 관리"를 클릭합니다.',
      '"구독 취소"를 눌러 해지를 확정합니다.',
    ],
    url: 'https://my.1password.com/settings/billing',
    note: '결제 주기 종료까지 이용 가능, 이후 읽기 전용 모드',
  },
  'Slack': {
    steps: [
      'Slack 웹에서 워크스페이스에 로그인합니다.',
      '좌측 상단 워크스페이스명 > "설정 및 관리" > "워크스페이스 설정"을 선택합니다.',
      '"결제" 탭에서 현재 플랜을 확인합니다.',
      '"플랜 변경" > "무료 플랜으로 다운그레이드"를 선택하고 확정합니다.',
    ],
    url: 'https://slack.com/account/settings',
    note: '결제 주기 종료까지 이용 가능, 이후 무료 플랜으로 전환',
  },
  'Zoom': {
    steps: [
      'Zoom 웹(zoom.us)에 로그인합니다.',
      '"관리자" > "계정 관리" > "청구"를 선택합니다.',
      '"현재 플랜" 탭에서 "플랜 취소"를 클릭합니다.',
      '해지 사유를 선택하고 "취소 확인"을 누릅니다.',
    ],
    url: 'https://zoom.us/account/billing',
    note: '결제 주기 종료까지 이용 가능, 이후 무료 플랜으로 전환',
  },

  // ─── Design ────────────────────────────────────────────
  'Adobe CC': {
    steps: [
      'Adobe 계정 페이지(account.adobe.com)에 로그인합니다.',
      '"플랜" 탭을 선택합니다.',
      '해지하려는 플랜에서 "플랜 관리"를 클릭합니다.',
      '"플랜 취소"를 선택하고 안내에 따라 해지를 확정합니다.',
    ],
    url: 'https://account.adobe.com/plans',
    note: '연간 약정 중 해지 시 위약금 발생 가능, 14일 이내 전액 환불 가능',
  },
  'Figma': {
    steps: [
      'Figma 웹(figma.com)에 로그인합니다.',
      '좌측 상단 팀명 > "Settings"를 선택합니다.',
      '"Plan" 또는 "Billing" 탭에서 "Downgrade to Starter"를 클릭합니다.',
      '해지 확인을 눌러 무료 플랜으로 변경합니다.',
    ],
    url: 'https://www.figma.com/settings',
    note: '결제 주기 종료까지 이용 가능, 이후 무료 플랜으로 전환',
  },
  'Canva': {
    steps: [
      'Canva 웹(canva.com)에 로그인합니다.',
      '우측 상단 프로필 > "계정 설정"을 선택합니다.',
      '"구독" 탭에서 "구독 취소"를 클릭합니다.',
      '해지 사유를 선택하고 "취소 확인"을 누릅니다.',
    ],
    url: 'https://www.canva.com/settings/billing',
    note: '결제 주기 종료까지 이용 가능, 이후 무료 플랜으로 전환',
  },

  // ─── Dev ───────────────────────────────────────────────
  'GitHub': {
    steps: [
      'GitHub 웹(github.com)에 로그인합니다.',
      '우측 상단 프로필 > "Settings"를 선택합니다.',
      '"Billing and plans" > "Plans and usage"를 클릭합니다.',
      '"Cancel plan" 또는 "Downgrade to Free"를 눌러 해지를 확정합니다.',
    ],
    url: 'https://github.com/settings/billing/plans',
    note: '결제 주기 종료까지 이용 가능, 이후 무료 플랜으로 전환',
  },
  'Vercel': {
    steps: [
      'Vercel 웹(vercel.com)에 로그인합니다.',
      '좌측 하단 팀 이름 > "Settings"를 선택합니다.',
      '"Billing" 탭에서 현재 플랜을 확인합니다.',
      '"Downgrade to Hobby" 또는 "Cancel subscription"을 눌러 해지를 확정합니다.',
    ],
    url: 'https://vercel.com/account/billing',
    note: '결제 주기 종료까지 이용 가능, 이후 무료 플랜으로 전환',
  },
  'JetBrains': {
    steps: [
      'JetBrains 계정(account.jetbrains.com)에 로그인합니다.',
      '"Subscriptions" 탭을 선택합니다.',
      '해지하려는 구독에서 "Cancel subscription"을 클릭합니다.',
      '해지 확인 페이지에서 "Confirm cancellation"을 누릅니다.',
    ],
    url: 'https://account.jetbrains.com/licenses',
    note: '결제 주기 종료까지 이용 가능, 1년 이상 구독 시 폴백 라이선스 제공',
  },

  // ─── Content ───────────────────────────────────────────
  'Millie 밀리의서재': {
    steps: [
      '밀리의 서재 앱 또는 웹(millie.co.kr)에 로그인합니다.',
      '"마이" > "구독 관리"를 선택합니다.',
      '"구독 해지" 버튼을 누릅니다.',
      '해지 사유를 선택하고 "해지하기"를 확정합니다.',
    ],
    url: 'https://www.millie.co.kr/mypage/subscription',
    note: '결제 주기 종료까지 이용 가능',
  },
  'Ridibooks Select': {
    steps: [
      '리디 웹(ridibooks.com) 또는 앱에 로그인합니다.',
      '"마이리디" > "리디셀렉트 관리"를 선택합니다.',
      '"구독 해지" 버튼을 누릅니다.',
      '해지 확인을 눌러 해지를 완료합니다.',
    ],
    url: 'https://ridibooks.com/account/membership',
    note: '결제 주기 종료까지 이용 가능, 다운로드한 책은 해지 후 이용 불가',
  },
  'Class101+': {
    steps: [
      'Class101 웹(class101.net) 또는 앱에 로그인합니다.',
      '우측 상단 프로필 > "내 구독"을 선택합니다.',
      '"구독 해지" 버튼을 누릅니다.',
      '해지 사유를 선택하고 "해지 완료"를 확정합니다.',
    ],
    url: 'https://class101.net/settings/subscription',
    note: '결제 주기 종료까지 이용 가능',
  },
  'Duolingo': {
    steps: [
      'Duolingo 앱 또는 웹(duolingo.com)에 로그인합니다.',
      '프로필 > "설정" > "구독"을 선택합니다.',
      '"Super Duolingo 관리"에서 "구독 취소"를 누릅니다.',
      '앱 결제인 경우 App Store/Google Play 구독에서 해지합니다.',
    ],
    url: 'https://www.duolingo.com/settings/subscription',
    note: '결제 주기 종료까지 이용 가능, 이후 무료 플랜으로 전환',
  },

  // ─── Gaming ────────────────────────────────────────────
  'Xbox Game Pass': {
    steps: [
      'Microsoft 계정(account.microsoft.com)에 로그인합니다.',
      '"서비스 및 구독"을 클릭합니다.',
      'Xbox Game Pass 구독에서 "관리"를 선택합니다.',
      '"구독 취소" 또는 "정기 청구 끄기"를 눌러 해지를 확정합니다.',
    ],
    url: 'https://account.microsoft.com/services/xboxgamepass',
    note: '결제 주기 종료까지 이용 가능',
  },
  'PlayStation Plus': {
    steps: [
      'PlayStation 웹(store.playstation.com) 또는 PS 콘솔에서 로그인합니다.',
      '"설정" > "계정 관리" > "구독"을 선택합니다.',
      '"PlayStation Plus" 옆 "자동 갱신 끄기"를 선택합니다.',
      '확인을 눌러 자동 갱신 해지를 완료합니다.',
    ],
    url: 'https://store.playstation.com/ko-kr/category/my-subscriptions',
    note: '잔여기간 이용 가능, 환불은 구매 후 14일 이내 가능',
  },
  'Nintendo Online': {
    steps: [
      'Nintendo 계정(accounts.nintendo.com)에 로그인합니다.',
      '"쇼핑 및 구독 정보"를 선택합니다.',
      '"Nintendo Switch Online" > "자동 갱신 설정 변경"을 누릅니다.',
      '"자동 갱신 해제"를 선택하고 확정합니다.',
    ],
    url: 'https://accounts.nintendo.com/shop/subscription',
    note: '잔여기간 이용 가능',
  },

  // ─── Cloud ─────────────────────────────────────────────
  'iCloud+': {
    steps: [
      'iPhone/iPad의 "설정" 앱에서 상단 Apple ID를 탭합니다.',
      '"iCloud" > "계정 저장 공간 관리" 또는 "저장 공간 플랜 변경"을 선택합니다.',
      '"다운그레이드 옵션"을 탭합니다.',
      '"무료 5GB 플랜"을 선택하고 확정합니다.',
    ],
    url: 'https://support.apple.com/ko-kr/HT207594',
    note: '결제 주기 종료까지 이용 가능, 이후 5GB 초과 데이터 접근 제한',
  },
  'Naver MYBOX': {
    steps: [
      '네이버 MYBOX 웹(mybox.naver.com)에 로그인합니다.',
      '"설정" 또는 "요금제 관리"를 선택합니다.',
      '"요금제 해지" 또는 "기본 용량으로 변경"을 클릭합니다.',
      '해지 확인을 눌러 해지를 완료합니다.',
    ],
    url: 'https://mybox.naver.com/#/settings/plan',
    note: '결제 주기 종료까지 이용 가능, 이후 기본 무료 용량으로 전환',
  },

  // ─── Fitness ───────────────────────────────────────────
  'Nike Training Club': {
    steps: [
      'Nike 앱 또는 웹(nike.com)에 로그인합니다.',
      '"프로필" > "설정" > "구독 관리"를 선택합니다.',
      '앱 결제인 경우 App Store/Google Play 구독에서 해지합니다.',
      '"구독 취소"를 눌러 해지를 확정합니다.',
    ],
    url: 'https://www.nike.com/member/settings',
    note: '결제 주기 종료까지 이용 가능',
  },
  'Calm': {
    steps: [
      'Calm 앱 또는 웹(calm.com)에 로그인합니다.',
      '프로필 > "Settings" > "Manage Subscription"을 선택합니다.',
      '"Cancel Subscription"을 클릭합니다.',
      '앱 결제인 경우 App Store/Google Play 구독에서 해지합니다.',
    ],
    url: 'https://www.calm.com/account',
    note: '결제 주기 종료까지 이용 가능',
  },
  'Headspace': {
    steps: [
      'Headspace 앱 또는 웹(headspace.com)에 로그인합니다.',
      '프로필 > "Settings" > "Manage subscription"을 선택합니다.',
      '"Cancel subscription"을 클릭합니다.',
      '앱 결제인 경우 App Store/Google Play 구독에서 해지합니다.',
    ],
    url: 'https://www.headspace.com/settings/subscription',
    note: '결제 주기 종료까지 이용 가능',
  },
};
