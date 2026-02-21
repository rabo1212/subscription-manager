import { useNavigate } from 'react-router-dom';

export default function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="px-8 py-5 border-b border-neutral-800">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-neutral-500 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <p className="text-sm tracking-[0.3em] uppercase text-neutral-500">MITDOK</p>
        </div>
      </header>

      <main className="px-8 py-12 max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold mb-2">{title}</h1>
        <p className="text-neutral-600 text-xs mb-10">시행일: 2026년 1월 10일</p>

        <div className="space-y-10 text-sm leading-relaxed text-neutral-300">
          {children}
        </div>

        {/* 회사 정보 */}
        <div className="mt-16 pt-8 border-t border-neutral-800">
          <p className="text-neutral-500 text-xs tracking-widest uppercase mb-4">회사 정보</p>
          <div className="space-y-1.5 text-xs text-neutral-500">
            <p>상호: 스튜디오르누</p>
            <p>대표: 홍보라</p>
            <p>사업자등록번호: 532-29-01282</p>
            <p>통신판매업번호: 제2025-서울중랑-1510호</p>
            <p>주소: 서울시 중랑구 용마산로 139다길 13, 202호</p>
            <p>이메일: rnu301@gmail.com</p>
          </div>
        </div>
      </main>

      <footer className="py-8 px-8 border-t border-neutral-900">
        <div className="max-w-2xl mx-auto flex items-center justify-center gap-3 text-neutral-700 text-xs">
          <a href="/terms" className="hover:text-neutral-400 transition-colors">이용약관</a>
          <span>|</span>
          <a href="/privacy" className="hover:text-neutral-400 transition-colors">개인정보처리방침</a>
          <span>|</span>
          <a href="/refund" className="hover:text-neutral-400 transition-colors">환불규정</a>
        </div>
        <p className="text-neutral-800 text-xs text-center mt-3">&copy; 2025 MITDOK. All rights reserved.</p>
      </footer>
    </div>
  );
}
