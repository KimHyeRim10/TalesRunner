import { supabase } from "@/utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { boardId } = req.query;

    try {
      const { data: commentData, error: commentError } = await supabase
        .from("comments")
        .select("board_id")
        .eq("board_id", boardId);

      const { data: replyData, error: replyError } = await supabase
        .from("reply")
        .select("board_id")
        .eq("board_id", boardId);

      if (commentError || replyError) {
        throw new Error("Error fetching comment or reply count");
      }

      const totalComments =
        (commentData?.length || 0) + (replyData?.length || 0);

      const { error: updateError } = await supabase
        .from("board")
        .update({ comment_count: totalComments })
        .eq("id", boardId);

      if (updateError) {
        throw new Error("Error updating comment count in board table");
      }

      res.status(200).json({ totalComments });
    } catch (error: unknown) {
      const message =
        (error as Error).message ||
        "An unknown error occurred in the API handler.";
      console.error("Error in API handler:", message);
      res.status(500).json({ error: message });
    }
  }
}
