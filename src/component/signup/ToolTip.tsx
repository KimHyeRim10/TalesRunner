import Image from "next/image";

export default function ToolTip() {
  return (
    <div className="tooltip flex-center">
      <Image width={16} height={16} src="/signup/ico-help-16.svg" alt="?" />
      <div className="tooltip-text text-left">
        <p>안전한 비밀번호 설정방법</p>
        <p>
          공백을 제외한 영문자, 숫자, 특수문자를 모두 조합하여 8자 이상 16자
          이하로 입력해주세요.
        </p>
        <p>{"사용 가능한 특수문자: !\"#$%&'()*+,-./:;?@[]^`{|}<>~="}</p>
        <p>
          전화번호, 이메일주소, 이름, 생일 또는 연속된 숫자와 문자 등 타인이
          쉽게 알아낼 수 있는 비밀번호 사용은 위험합니다.
        </p>
        <p>다른 사이트에서 사용하지 않은 비밀번호를 입력해 주세요.</p>
        <p>비밀번호는 3~6개월에 한 번씩 주기적으로 변경하는 것이 좋습니다.</p>
      </div>
      <Image
        width={16}
        height={10}
        className="tooltip-arrow"
        src="/signup/tooltip-shape-b.svg"
        alt="tooltiparrow"
      />
    </div>
  );
}
