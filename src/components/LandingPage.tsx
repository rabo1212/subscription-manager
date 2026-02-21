import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const FREE_LIMIT = 3;
const PRO_PRICE = 3900;

const CheckIcon = ({ accent }: { accent?: boolean }) => (
  <svg className={`w-4 h-4 shrink-0 ${accent ? 'text-amber-500' : 'text-neutral-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default function LandingPage() {
  const navigate = useNavigate();
  const sectionsRef = useRef<HTMLDivElement>(null);
  const featureRef = useRef<HTMLElement>(null);

  const scrollToFeatures = () => {
    featureRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = sectionsRef.current?.querySelectorAll('.fade-in-scroll');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const goToApp = () => navigate('/app');
  const goToGuest = () => navigate('/app?guest=true');

  return (
    <div ref={sectionsRef} className="min-h-screen bg-neutral-950 text-white font-normal">

      {/* ── 헤더 ── */}
      <header className="flex items-center justify-between px-8 md:px-16 py-5">
        <p className="text-sm tracking-[0.3em] uppercase text-neutral-500">MITDOK</p>
        <nav className="flex items-center gap-8">
          <button onClick={scrollToFeatures} className="text-sm text-neutral-500 hover:text-white transition-colors hidden md:block">기능</button>
          <a href="#preview" className="text-sm text-neutral-500 hover:text-white transition-colors hidden md:block">인사이트</a>
          <a href="#pricing" className="text-sm text-neutral-500 hover:text-white transition-colors hidden md:block">요금제</a>
          <button
            onClick={goToApp}
            className="px-5 py-2 bg-white text-black text-sm font-semibold hover:bg-neutral-200 transition-colors"
          >
            시작하기
          </button>
        </nav>
      </header>

      {/* ── 히어로 ── */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center px-8 text-center">
        <p className="fade-in-scroll text-sm tracking-[0.3em] uppercase text-neutral-500 mb-6">MITDOK</p>
        <h1 className="fade-in-scroll text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-2">
          믿고 맡기는
        </h1>
        <h1 className="fade-in-scroll text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6 text-amber-500">
          구독 관리
        </h1>
        <p className="fade-in-scroll text-neutral-400 text-lg mb-10 max-w-md">
          흩어져 있던 구독, 이제 한 곳에서 똑똑하게.
        </p>
        <div className="fade-in-scroll flex gap-4 mb-4">
          <button
            onClick={goToApp}
            className="px-8 py-4 bg-white text-black text-sm font-semibold tracking-wide hover:bg-neutral-200 transition-colors"
          >
            무료로 시작하기
          </button>
          <button
            onClick={scrollToFeatures}
            className="px-8 py-4 border border-neutral-800 text-neutral-400 text-sm font-medium hover:border-neutral-600 hover:text-white transition-colors"
          >
            더 알아보기
          </button>
        </div>
        <button
          onClick={goToGuest}
          className="fade-in-scroll text-neutral-500 text-sm mb-16 hover:text-white transition-colors cursor-pointer underline underline-offset-4 decoration-neutral-700 hover:decoration-neutral-400"
        >
          가입 없이 바로 체험 →
        </button>
        <div className="animate-bounce text-neutral-700">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ── 문제 제기 ── */}
      <section className="py-24 px-8 border-t border-neutral-900">
        <div className="max-w-5xl mx-auto">
          <div className="fade-in-scroll mb-12">
            <p className="text-neutral-500 text-xs tracking-widest uppercase mb-4">Problem</p>
            <h2 className="text-2xl md:text-3xl font-semibold">
              혹시 이런 경험 있으신가요?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              '"이번 달 구독료가\n얼마지?"',
              '"안 쓰는 구독\n뭐가 있더라?"',
              '"무료체험 끝난 줄\n몰랐는데 결제됐어"',
              '"비슷한 거 두 개\n쓰고 있었네"',
            ].map((text, i) => (
              <div
                key={i}
                className="fade-in-scroll border border-neutral-800 p-6 h-[130px] flex items-end hover:border-neutral-700 transition-colors"
              >
                <p className="text-sm font-medium text-neutral-300 whitespace-pre-line leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 핵심 기능 ── */}
      <section ref={featureRef} className="py-24 px-8 border-t border-neutral-900">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="fade-in-scroll lg:w-[360px] shrink-0">
            <p className="text-neutral-500 text-xs tracking-widest uppercase mb-4">Solution</p>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              믿독이<br />해결해드려요
            </h2>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">
              Netflix, 유튜브, ChatGPT...<br />모든 구독을 한 곳에서 똑똑하게 관리하세요.
            </p>
          </div>
          <div className="flex-1 space-y-3">
            {[
              { icon: 'M4 6h16M4 12h16M4 18h16', title: '한눈에 모아보기', desc: '모든 구독을 한 곳에서 확인하세요' },
              { icon: 'M18 20V10M12 20V4M6 20v-6', title: '지출 분석', desc: '월간/연간 지출, 카테고리별 비율' },
              { icon: 'M18 8A6 6 0 006 8c0 7-3 9-6 9s-6-2-6-9M13.73 21a2 2 0 01-3.46 0', title: '결제일 알림', desc: 'D-day 알림으로 결제일 놓치지 않게' },
              { icon: 'M12 8v4l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title: '무료체험 알림', desc: '종료 전 알림으로 원치 않는 결제 방지' },
              { icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z', title: '인사이트 추천', desc: '중복 구독, 다운그레이드 추천, 절약 분석' },
            ].map((item, i) => (
              <div key={i} className="fade-in-scroll flex items-center gap-5 border border-neutral-800 p-5 hover:border-neutral-700 transition-colors">
                <svg className="w-5 h-5 shrink-0 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                </svg>
                <div>
                  <p className="font-medium mb-1">{item.title}</p>
                  <p className="text-neutral-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 인사이트 미리보기 ── */}
      <section id="preview" className="py-24 px-8 border-t border-neutral-900">
        <div className="max-w-5xl mx-auto">
          <div className="fade-in-scroll text-center mb-12">
            <p className="text-neutral-500 text-xs tracking-widest uppercase mb-4">Preview</p>
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">
              Pro 인사이트 미리보기
            </h2>
            <p className="text-neutral-500 text-sm">스마트한 구독 관리로 절약하세요</p>
          </div>
          <div className="fade-in-scroll grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-emerald-500/30 bg-emerald-500/5 p-6 text-center">
              <p className="text-neutral-500 text-xs tracking-widest uppercase mb-2">이번 달 절약 가능</p>
              <p className="text-3xl font-semibold text-emerald-400">47,500원</p>
              <p className="text-neutral-500 text-sm mt-1">연간 ₩570,000 절약 가능</p>
            </div>
            <div className="border border-amber-500/20 bg-amber-500/5 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-xs text-amber-400 tracking-wider uppercase">다운그레이드 추천</span>
              </div>
              <p className="text-sm font-medium mb-2">Netflix</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-500">프리미엄 → 스탠다드</span>
                <span className="text-amber-400">₩4,500 절약</span>
              </div>
            </div>
            <div className="border border-amber-500/30 bg-amber-500/5 p-5">
              <p className="text-sm text-amber-400 mb-3">⚠️ 음악 카테고리에 2개 구독</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-300">YouTube Music + Spotify</span>
                <span className="text-neutral-500">₩10,900 절약</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 플랜 비교 ── */}
      <section id="pricing" className="py-24 px-8 border-t border-neutral-900">
        <div className="max-w-2xl mx-auto">
          <div className="fade-in-scroll text-center mb-12">
            <p className="text-neutral-500 text-xs tracking-widest uppercase mb-4">Pricing</p>
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">
              심플한 요금제
            </h2>
            <p className="text-neutral-500 text-sm">커피 한 잔 값으로 똑똑하게 구독 관리</p>
          </div>
          <div className="fade-in-scroll grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Free */}
            <div className="border border-neutral-800 p-6 flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <p className="text-lg font-medium">Free</p>
                <p className="text-neutral-500">₩0</p>
              </div>
              <div className="space-y-3 mb-6 flex-1">
                {['구독 3개까지 등록', '기본 지출 분석', '광고 포함'].map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckIcon />
                    <span className="text-sm text-neutral-400">{f}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={goToApp}
                className="w-full py-3 border border-neutral-800 text-sm text-neutral-500 hover:border-neutral-600 hover:text-white transition-colors"
              >
                무료로 시작하기
              </button>
            </div>
            {/* Pro */}
            <div className="border border-amber-500/30 p-6 relative flex flex-col">
              <div className="absolute -top-2.5 left-4 bg-neutral-950 px-2">
                <span className="text-[10px] tracking-widest uppercase text-amber-500">추천</span>
              </div>
              <div className="flex items-center justify-between mb-5">
                <p className="text-lg font-medium">Pro</p>
                <p className="text-amber-500">₩{PRO_PRICE.toLocaleString()}/월</p>
              </div>
              <div className="space-y-3 mb-6 flex-1">
                {['무제한 구독 등록', '상세 지출 분석', '인사이트 리포트', '결제일 & 무료체험 알림', '광고 제거'].map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckIcon accent />
                    <span className="text-sm text-neutral-300">{f}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={goToApp}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Pro 시작하기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-8 border-t border-neutral-900">
        <div className="fade-in-scroll max-w-lg mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-neutral-400 mb-10">
            새는 구독료, 믿독이 잡아드릴게요.
          </p>
          <div className="flex flex-col items-center gap-5">
            <button
              onClick={goToApp}
              className="px-10 py-4 bg-white text-black text-sm font-semibold tracking-wide hover:bg-neutral-200 transition-colors"
            >
              무료로 시작하기
            </button>
            <button
              onClick={goToGuest}
              className="text-neutral-500 text-xs hover:text-white transition-colors cursor-pointer underline underline-offset-4 decoration-neutral-700 hover:decoration-neutral-400"
            >
              가입 없이 바로 체험 →
            </button>
          </div>
        </div>
      </section>

      {/* ── 푸터 ── */}
      <footer className="py-12 px-8 border-t border-neutral-900">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-neutral-500 mb-4">MITDOK</p>
          <p className="text-neutral-600 text-xs mb-3">
            문의: rnu301@gmail.com
          </p>
          <div className="flex items-center justify-center gap-3 text-neutral-700 text-xs mb-6">
            <a href="/terms" className="hover:text-neutral-400 transition-colors">이용약관</a>
            <span>|</span>
            <a href="/privacy" className="hover:text-neutral-400 transition-colors">개인정보처리방침</a>
            <span>|</span>
            <a href="/refund" className="hover:text-neutral-400 transition-colors">환불규정</a>
          </div>
          <p className="text-neutral-800 text-xs">&copy; 2025 MITDOK. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
