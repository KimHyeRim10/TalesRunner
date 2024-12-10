import { format, formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale"; // 한국어 로케일 사용

/**
 * 작성 시간을 상대 시간으로 변환하는 함수
 * @param createdAt ISO 8601 형식의 작성 시간
 * @returns 상대 시간 문자열 또는 날짜 문자열
 */

export const formatCreatedAt = (createdAt: string): string => {
  const createdDate = new Date(createdAt);

  // 현재 시간과 작성 시간 차이를 계산
  const now = new Date();
  const differenceInMilliseconds = now.getTime() - createdDate.getTime();

  if (differenceInMilliseconds < 60 * 1000) {
    // 1분 이내는 "방금 전"으로 표시
    return "방금 전";
  } else if (differenceInMilliseconds < 24 * 60 * 60 * 1000) {
    // 하루 이내는 "몇 시간 전", "몇 분 전"으로 표시
    const relativeTime = formatDistanceToNow(createdDate, {
      addSuffix: true,
      locale: ko,
    });
    return relativeTime.replace(/^약 /, ""); // "약 " 제거
  } else {
    // 하루를 초과하면 "YYYY-MM-DD" 포맷으로 표시
    return format(createdDate, "yyyy-MM-dd", { locale: ko });
  }
};
