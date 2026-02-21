import LegalPage from './LegalPage';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-white font-medium mb-3">{title}</h2>
      {children}
    </section>
  );
}

export default function TermsPage() {
  return (
    <LegalPage title="이용약관">
      <Section title="제1조 (목적)">
        <p>
          이 약관은 스튜디오르누(이하 "회사")가 제공하는 믿독(MITDOK) 서비스(이하 "서비스")의
          이용 조건 및 절차, 회사와 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
        </p>
      </Section>

      <Section title="제2조 (서비스 내용)">
        <p>회사는 다음의 서비스를 제공합니다.</p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-neutral-400">
          <li>구독 서비스 등록 및 관리</li>
          <li>구독 지출 분석</li>
          <li>결제일 알림 및 무료체험 만료 알림</li>
          <li>구독 인사이트 및 절약 추천</li>
        </ul>
      </Section>

      <Section title="제3조 (요금제)">
        <p>서비스는 다음의 요금제로 운영됩니다.</p>
        <div className="mt-2 space-y-2 text-neutral-400">
          <p><span className="text-neutral-300">Free</span> — 무료, 구독 3개 등록, 기본 분석, 광고 포함</p>
          <p><span className="text-neutral-300">Pro</span> — 월 ₩3,900 (정기결제), 무제한 등록, 전체 인사이트, 광고 제거</p>
        </div>
      </Section>

      <Section title="제4조 (이용 자격)">
        <p>
          서비스는 만 14세 이상인 자가 이용할 수 있습니다.
          만 14세 미만의 이용자는 법정대리인의 동의를 받아야 합니다.
        </p>
      </Section>

      <Section title="제5조 (계정 및 인증)">
        <p>
          이용자는 이메일 인증을 통해 계정을 생성합니다.
          이용자는 자신의 계정 정보를 안전하게 관리할 책임이 있으며,
          제3자에게 계정을 양도하거나 공유할 수 없습니다.
        </p>
      </Section>

      <Section title="제6조 (서비스 변경 및 중단)">
        <p>
          회사는 운영상·기술상 필요한 경우 서비스의 전부 또는 일부를 변경하거나
          중단할 수 있습니다. 이 경우 회사는 사전에 공지하며,
          불가피한 사유가 있는 경우 사후에 공지할 수 있습니다.
        </p>
      </Section>

      <Section title="제7조 (이용자의 의무)">
        <p>이용자는 다음 행위를 해서는 안 됩니다.</p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-neutral-400">
          <li>타인의 정보를 도용하여 서비스를 이용하는 행위</li>
          <li>서비스의 정상적인 운영을 방해하는 행위</li>
          <li>서비스를 부정한 목적으로 이용하는 행위</li>
          <li>서비스를 이용하여 법령에 위반되는 행위를 하는 것</li>
          <li>회사의 지식재산권을 침해하는 행위</li>
        </ul>
      </Section>

      <Section title="제8조 (회사의 책임 제한)">
        <p>
          회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중단 등
          불가항력적인 사유로 서비스를 제공할 수 없는 경우 책임이 면제됩니다.
          회사는 이용자가 서비스를 통해 얻은 정보의 정확성, 신뢰성에 대해 보증하지 않습니다.
        </p>
      </Section>

      <Section title="제9조 (분쟁 해결)">
        <p>
          서비스 이용과 관련하여 분쟁이 발생한 경우 회사와 이용자는
          상호 협의하여 해결하며, 협의가 이루어지지 않을 경우
          관할 법원은 회사 소재지의 법원으로 합니다.
        </p>
      </Section>

      <Section title="부칙">
        <p>이 약관은 2026년 1월 10일부터 시행합니다.</p>
      </Section>
    </LegalPage>
  );
}
