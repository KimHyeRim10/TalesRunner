"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

type CommentList = Record<
  | "id"
  | "board_id"
  | "user_nickname"
  | "content"
  | "profile"
  | "user_level"
  | "nickname_color"
  | "created_at",
  string
>;

type ReplyList = Record<
  | "id"
  | "board_id"
  | "comment_id"
  | "user_nickname"
  | "content"
  | "profile"
  | "user_level"
  | "nickname_color"
  | "created_at",
  string
>;

interface CommentContextType {
  /* 댓글 */
  commentList: CommentList[];
  getCommentList: (boardId: string) => Promise<void>;
  handleDeleteComment: (boardId: string, commentId: string) => Promise<void>;
  fetchCommentList: (boardId: string) => Promise<void>;
  fetchDeleteComment: (boardId: string, commentId: string) => Promise<void>;
  commentCount: number | 0;
  getCommentCount: (boardId: string) => Promise<void>;
  /* 대댓글 */
  replyList: ReplyList[];
  getReplyList: (boardId: string, commentId: string) => Promise<void>;
  handleDeleteReply: (
    boardId: string,
    commentId: string,
    replyId: string
  ) => Promise<void>;
  fetchReplyList: (boardId: string, commentId: string) => Promise<void>;
  fetchDeleteReply: (
    boardId: string,
    commentId: string,
    replyId: string
  ) => Promise<void>;
}

const CommentContext = createContext<CommentContextType | undefined>(undefined);

export const CommentProvider = ({ children }: { children: ReactNode }) => {
  const [commentList, setCommentList] = useState<CommentList[]>([]);
  const [replyList, setReplyList] = useState<ReplyList[]>([]);
  const [commentCount, setCommentCount] = useState<number>(0);

  /* 댓글 리스트 가져오는 api */
  const getCommentList = async (boardId: string) => {
    try {
      const response = await axios.get("/api/board/comments/getCommentList", {
        params: { boardId },
      });
      if (response.data.commentList) {
        setCommentList(response.data.commentList);
      }
    } catch (error) {
      console.log("댓글리스트 가져오기 실패:", error);
    }
  };

  /* 댓글 삭제 핸들러 */
  const handleDeleteComment = async (boardId: string, commentId: string) => {
    try {
      const response = await axios.delete("/api/board/comments/deleteComment", {
        params: { boardId, commentId },
      });
      if (response.data.success) {
        alert("댓글이 삭제되었습니다.");
      }
    } catch (error) {
      console.log("댓글 삭제 실패:", error);
    }
  };

  /* 대댓글리스트 가져오는 api */
  const getReplyList = async (boardId: string, commentId: string) => {
    try {
      const response = await axios.get("/api/board/comments/getReplyList", {
        params: { boardId, commentId },
      });

      if (response.data.replyList) {
        setReplyList(response.data.replyList);
      }
    } catch (error) {
      console.log("리스트를 가져오기 실패!", error);
    }
  };

  /* 대댓글 삭제 핸들러 */
  const handleDeleteReply = async (
    boardId: string,
    commentId: string,
    replyId: string
  ) => {
    try {
      const response = await axios.delete("/api/board/comments/deleteReply", {
        params: { boardId: boardId, commentId: commentId, replyId: replyId },
      });

      if (response.data.success) {
        alert("댓글이 삭제되었습니다");
      }
    } catch (error) {
      console.log("댓글이 삭제되었습니다");
    }
  };

  /* 총 댓글 개수 가져오는 api */
  const getCommentCount = async (boardId: string) => {
    try {
      const response = await axios.get("/api/board/comments/commentCount", {
        params: { boardId },
      });

      const totalCounts = response.data.totalComments;
      if (totalCounts !== undefined) {
        setCommentCount(totalCounts);
      }
    } catch (error) {
      console.log("댓글 수 업데이트 실패:", error);
    }
  };

  // 새로고침 없이 댓글리스트 갱신 함수
  const fetchCommentList = async (boardId: string) => {
    try {
      await getCommentList(boardId); // 댓글 리스트 업데이트
      await getCommentCount(boardId); // 댓글 수 동기화
    } catch (error) {
      console.log("댓글 리스트 동기화 실패:", error);
    }
  };

  // 새로고침 없이 댓글 삭제 후 댓글리스트를 갱신하는 함수
  const fetchDeleteComment = async (boardId: string, commentId: string) => {
    try {
      // 댓글 삭제 요청
      await handleDeleteComment(boardId, commentId);
      // 댓글 리스트와 댓글 수 상태 동기화
      await getCommentList(boardId);
      await getCommentCount(boardId); // 댓글 수 동기화
    } catch (error) {
      console.log("업데이트 실패", error);
    }
  };

  // 새로고침 없이 대댓글리스트 갱신 함수
  const fetchReplyList = async (boardId: string, commentId: string) => {
    try {
      await getReplyList(boardId, commentId);
      await getCommentCount(boardId);
    } catch (error) {
      console.log("댓글 리스트 업데이트 실패:", error);
    }
  };

  // 새로고침 없이 대댓글 삭제 후 댓글리스트를 갱신하는 함수
  const fetchDeleteReply = async (
    boardId: string,
    commentId: string,
    replyId: string
  ) => {
    try {
      await handleDeleteReply(boardId, commentId, replyId);
      await getReplyList(boardId, commentId);
      await getCommentCount(boardId);
    } catch (error) {
      console.log("댓글 리스트 업데이트 실패:", error);
    }
  };

  return (
    <CommentContext.Provider
      value={{
        commentList,
        getCommentList,
        handleDeleteComment,
        fetchCommentList,
        fetchDeleteComment,
        commentCount,
        getCommentCount,
        replyList,
        getReplyList,
        handleDeleteReply,
        fetchReplyList,
        fetchDeleteReply,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export const useComment = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error("useComment must be used within a CommentProvider");
  }
  return context;
};
