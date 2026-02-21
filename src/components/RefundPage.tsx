import LegalPage from './LegalPage';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-white font-medium mb-3">{title}</h2>
      {children}
    </section>
  );
}

export default function RefundPage() {
  return (
    <LegalPage title="환불 규정">
      <Section title="제1조 (적용 범위)">
        <p>
          이 규정은 믿독(MITDOK) Pro 유료 구독 서비스의 환불에 적용됩니다.
          무료(Free) 플랜은 결제가 발생하지 않으므로 환불 대상이 아닙니다.
        </p>
      </Section>

      <Section title="제2조 (환불 기준)">
        <div className="mt-2 border border-neutral-800 divide-y divide-neutral-800">
          <div className="grid grid-cols-2 p-3">
            <span className="text-neutral-500">구분</span>
            <span className="text-neutral-500">환불 정책</span>
          </div>
          <div className="grid grid-cols-2 p-3">
            <span>구독 시작 7일 이내</span>
            <span className="text-emerald-400">전액 환불</span>
          </div>
          <div className="grid grid-cols-2 p-3">
            <span>구독 시작 7일 이후</span>
            <span className="text-neutral-400">환불 불가, 다음 결제일까지 이용 가능</span>
          </div>
        </div>
      </Section>

      <Section title="제3조 (구독 취소)">
        <p>이용자는 언제든지 Pro 구독을 해지할 수 있습니다.</p>
        <div className="mt-3 space-y-2 text-neutral-400">
          <p><span className="text-neutral-300">취소 방법:</span> 설정 → 플랜 관리 → Pro 해지하기</p>
          <p><span className="text-neutral-300">취소 시점:</span> 해지 즉시 적용, 다음 결제일부터 무료 플랜으로 전환</p>
          <p><span className="text-neutral-300">이용 기간:</span> 해지 후에도 현재 결제 주기가 끝날 때까지 Pro 기능 이용 가능</p>
        </div>
      </Section>

      <Section title="제4조 (환불 절차)">
        <p>환불은 다음 절차에 따라 진행됩니다.</p>
        <ol className="list-decimal list-inside mt-2 space-y-1.5 text-neutral-400">
          <li>rnu301@gmail.com으로 환불 요청 (계정 이메일 기재)</li>
          <li>회사에서 환불 자격 확인 (구독 시작일 기준 7일 이내 여부)</li>
          <li>확인 후 3영업일 이내 환불 처리</li>
          <li>결제 수단에 따라 환불 반영까지 3~7영업일 소요</li>
        </ol>
      </Section>

      <Section title="제5조 (환불 불가 사유)">
        <p>다음의 경우 환불이 불가합니다.</p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-neutral-400">
          <li>구독 시작 7일이 경과한 경우</li>
          <li>서비스를 정상적으로 이용한 이력이 있는 경우 (7일 이후)</li>
          <li>이용약관 위반으로 서비스 이용이 제한된 경우</li>
        </ul>
      </Section>

      <Section title="제6조 (서비스 중단 시 환불)">
        <p>
          회사의 사유로 서비스가 중단되는 경우, 잔여 이용 기간에 해당하는
          금액을 일할 계산하여 환불합니다.
        </p>
      </Section>

      <Section title="부칙">
        <p>이 환불 규정은 2026년 1월 10일부터 시행합니다.</p>
      </Section>
    </LegalPage>
  );
}
