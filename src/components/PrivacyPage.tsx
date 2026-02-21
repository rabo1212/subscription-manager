import LegalPage from './LegalPage';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-white font-medium mb-3">{title}</h2>
      {children}
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <LegalPage title="개인정보처리방침">
      <Section title="제1조 (수집하는 개인정보)">
        <p>회사는 서비스 제공을 위해 다음의 개인정보를 수집합니다.</p>
        <div className="mt-3 border border-neutral-800 divide-y divide-neutral-800">
          <div className="grid grid-cols-2 p-3">
            <span className="text-neutral-500">수집 항목</span>
            <span>이메일 주소, 결제 정보</span>
          </div>
          <div className="grid grid-cols-2 p-3">
            <span className="text-neutral-500">수집 방법</span>
            <span>회원가입, 결제 시 직접 입력</span>
          </div>
        </div>
      </Section>

      <Section title="제2조 (개인정보의 이용 목적)">
        <p>수집한 개인정보는 다음의 목적으로 이용합니다.</p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-neutral-400">
          <li>서비스 제공 및 계정 관리</li>
          <li>유료 서비스(Pro) 결제 처리</li>
          <li>고객 문의 응대 및 공지사항 전달</li>
          <li>서비스 개선 및 통계 분석</li>
        </ul>
      </Section>

      <Section title="제3조 (개인정보의 보유 및 파기)">
        <p>
          회사는 이용자의 개인정보를 수집 목적이 달성된 후 지체 없이 파기합니다.
        </p>
        <div className="mt-3 border border-neutral-800 divide-y divide-neutral-800">
          <div className="grid grid-cols-2 p-3">
            <span className="text-neutral-500">회원 탈퇴 시</span>
            <span>즉시 삭제</span>
          </div>
          <div className="grid grid-cols-2 p-3">
            <span className="text-neutral-500">전자상거래법</span>
            <span>계약·결제 기록 5년 보관</span>
          </div>
          <div className="grid grid-cols-2 p-3">
            <span className="text-neutral-500">통신비밀보호법</span>
            <span>접속 로그 3개월 보관</span>
          </div>
        </div>
      </Section>

      <Section title="제4조 (제3자 제공)">
        <p>
          회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다.
          다만, 다음의 경우 예외로 합니다.
        </p>
        <div className="mt-3 border border-neutral-800 divide-y divide-neutral-800">
          <div className="grid grid-cols-3 p-3">
            <span className="text-neutral-500">제공 대상</span>
            <span className="text-neutral-500">제공 항목</span>
            <span className="text-neutral-500">목적</span>
          </div>
          <div className="grid grid-cols-3 p-3">
            <span>토스페이먼츠</span>
            <span>결제 정보</span>
            <span>결제 처리</span>
          </div>
        </div>
        <p className="mt-2 text-neutral-500">
          법령에 의한 요청이 있는 경우 관련 법률에 따라 제공할 수 있습니다.
        </p>
      </Section>

      <Section title="제5조 (개인정보 처리 위탁)">
        <p>회사는 서비스 운영을 위해 다음과 같이 개인정보 처리를 위탁합니다.</p>
        <div className="mt-3 border border-neutral-800 divide-y divide-neutral-800">
          <div className="grid grid-cols-2 p-3">
            <span className="text-neutral-500">수탁업체</span>
            <span className="text-neutral-500">위탁 업무</span>
          </div>
          <div className="grid grid-cols-2 p-3">
            <span>Supabase</span>
            <span>데이터 저장 및 인증</span>
          </div>
          <div className="grid grid-cols-2 p-3">
            <span>Vercel</span>
            <span>서비스 호스팅</span>
          </div>
          <div className="grid grid-cols-2 p-3">
            <span>토스페이먼츠</span>
            <span>결제 처리</span>
          </div>
        </div>
      </Section>

      <Section title="제6조 (정보주체의 권리)">
        <p>이용자는 언제든지 다음의 권리를 행사할 수 있습니다.</p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-neutral-400">
          <li>개인정보 열람 요청</li>
          <li>개인정보 정정·삭제 요청</li>
          <li>개인정보 처리정지 요청</li>
          <li>회원 탈퇴 (계정 삭제)</li>
        </ul>
        <p className="mt-2 text-neutral-500">
          권리 행사는 rnu301@gmail.com으로 요청할 수 있으며,
          회사는 지체 없이 조치하겠습니다.
        </p>
      </Section>

      <Section title="제7조 (개인정보 보호책임자)">
        <div className="mt-2 space-y-1 text-neutral-400">
          <p>성명: 홍보라</p>
          <p>이메일: rnu301@gmail.com</p>
        </div>
      </Section>

      <Section title="부칙">
        <p>이 개인정보처리방침은 2026년 1월 10일부터 시행합니다.</p>
      </Section>
    </LegalPage>
  );
}
