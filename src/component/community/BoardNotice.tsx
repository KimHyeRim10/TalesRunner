export default function BoardNotice() {
  return (
    <>
      <table className="table-fixed w-full border-collapse">
        <colgroup>
          <col className="w-[896px]" />
          <col className="w-[200px]" />
          <col className="w-[120px]" />
        </colgroup>
        <tbody>
          <tr className="h-[72px] bg-[#F9FAFB] border-b border-[var(--border-color)]">
            <td>
              <div className="flex items-center h-[72px]">
                <span className="ml-4 mr-3 w-[40px] h-[25px] text-[10px] border border-[#ABEFC6] bg-[#ECFDF3] text-green-700 px-2 rounded-full font-bold">
                  공지
                </span>
                <span className="text-[16px] text-[#344054] truncate hover:underline">
                  이관/이전 시 유의사항 안내
                </span>
              </div>
            </td>
            <td>
              <div className="flex items-center pl-[6px] gap-2 h-[72px]">
                <img
                  className="w-[20px] h-[20px]"
                  src="/community/lv_998 (2).png"
                  alt="pierrot"
                />
                <span className="text-[16px] text-[#475467]">GM삐에로</span>
              </div>
            </td>
            <td className="text-[16px] text-[#98A2B3] text-center">
              2024.09.12
            </td>
          </tr>
          <tr className="h-[72px] bg-[#F9FAFB] border-b border-[var(--border-color)]">
            <td>
              <div className="flex items-center h-[72px]">
                <span className="ml-4 mr-3 w-[40px] h-[25px] text-[10px] border border-[#ABEFC6] bg-[#ECFDF3] text-green-700 px-2 rounded-full font-bold">
                  공지
                </span>
                <span className="text-[16px] text-[#344054] truncate hover:underline">
                  이관/이전 관련 주요 문의사항 안내
                </span>
              </div>
            </td>
            <td>
              <div className="flex items-center pl-[6px] gap-2 h-[72px]">
                <img
                  className="w-[20px] h-[20px]"
                  src="/community/lv_998 (2).png"
                  alt="pierrot"
                />
                <span className="text-[16px] text-[#475467]">GM삐에로</span>
              </div>
            </td>
            <td className="text-[16px] text-[#98A2B3] text-center">
              2024.09.12
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
