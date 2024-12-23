import React from "react";
import { TextBoldIcon } from "@/icons/community/ToolbarIcon";
import { ItalicIcon } from "@/icons/community/ToolbarIcon";
import { UnderlineIcon } from "@/icons/community/ToolbarIcon";
import { StrikethroughIcon } from "@/icons/community/ToolbarIcon";
import { FontSizeIcon } from "@/icons/community/ToolbarIcon";
import { TextColorIcon } from "@/icons/community/ToolbarIcon";
import { BackgroundColorIcon } from "@/icons/community/ToolbarIcon";
import { OutdentIcon } from "@/icons/community/ToolbarIcon";
import { IndentIcon } from "@/icons/community/ToolbarIcon";
import { InsertHorizontalLineIcon } from "@/icons/community/ToolbarIcon";
import { AlignmentIcon } from "@/icons/community/ToolbarIcon";
import { InsertTableIcon } from "@/icons/community/ToolbarIcon";
import { InsertLinkIcon } from "@/icons/community/ToolbarIcon";
import { InsertImageIcon } from "@/icons/community/ToolbarIcon";

export default function ToolbarButton() {
  return (
    <div className="flex items-center gap-[20px] w-[1186px] h-[49px] border-b border-[var(--border-color)]">
      <button>
        <TextBoldIcon />
        <span className="fr-sr-only">굵게</span>
      </button>
      <button>
        <ItalicIcon />
        <span className="fr-sr-only">기울임꼴</span>
      </button>
      <button>
        <UnderlineIcon />
        <span className="fr-sr-only">밑줄</span>
      </button>
      <button>
        <StrikethroughIcon />
        <span className="fr-sr-only">취소선</span>
      </button>
      <button>
        <FontSizeIcon />
        <span className="fr-sr-only">폰트크기</span>
      </button>
      <button>
        <TextColorIcon />
        <span className="fr-sr-only">텍스트색상</span>
      </button>
      <button>
        <BackgroundColorIcon />
        <span className="fr-sr-only">배경색</span>
      </button>
      <button>
        <OutdentIcon />
        <span className="fr-sr-only">내어쓰기</span>
      </button>
      <button>
        <IndentIcon />
        <span className="fr-sr-only">들여쓰기</span>
      </button>
      <button>
        <InsertHorizontalLineIcon />
        <span className="fr-sr-only">수평선을 삽입</span>
      </button>
      <button>
        <AlignmentIcon />
        <span className="fr-sr-only">정렬</span>
      </button>
      <button>
        <InsertTableIcon />
        <span className="fr-sr-only">표 삽입</span>
      </button>
      <button>
        <InsertLinkIcon />
        <span className="fr-sr-only">링크 삽입</span>
      </button>
      <button>
        <InsertImageIcon />
        <span className="fr-sr-only">이미지 삽입</span>
      </button>
      <button>
        <img
          className="w-[24px] h-[24px]"
          src="/community/ico-gift-20.svg"
          alt="gift"
        />
        <span className="fr-sr-only">추첨</span>
      </button>
      <button>
        <img
          className="w-[24px] h-[24px]"
          src="/community/ico-vote-black-18.svg"
          alt="vote"
        />
        <span className="fr-sr-only">설문</span>
      </button>
    </div>
  );
}
