'use client';
import apiClient from "../../lib/apiClient";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import CommentModal from "./CommentModal";

type PostProps = {
  post: {
    id: number;
    author: string;
    avatar: string;
    description: string;
    question: string;
    content: string;
    upvotes: number;
    downvotes: number;
    comments: number;
    isUpvoted: boolean | null;
  };
};

type Comment = {
  id: number;
  createdAt: string;
  updatedAt: string;
  content: string;
  author: {
    id: number;
    fullName: string;
    avatarUrl: string;
    followed: boolean;
  };
  answerId: number;
  interaction: {
    upvote: number;
    downvote: number;
  };
};

export default function Post({ post }: PostProps) {
  const MAX_LENGTH = 100;
  const [isExpanded, setIsExpanded] = useState(false);
  const [upvotes, setUpvotes] = useState(post.upvotes);
  const [downvotes, setDownvotes] = useState(post.downvotes);
  const [comments, setComments] = useState(post.comments);
  const [hasUpvoted, setHasUpvoted] = useState(post.isUpvoted === true);
  const [hasDownvoted, setHasDownvoted] = useState(post.isUpvoted === false);
  const [showComments, setShowComments] = useState(false);
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [isDebounced, setIsDebounced] = useState(false); // Trạng thái debounce
  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  const handleInteraction = async (interactionType: 'upvote' | 'downvote') => {
    if (isDebounced) {
      return; // Nếu đang debounce, không làm gì cả
    }

    setIsDebounced(true);
    let isUpvote: boolean | null = null;

    // Determine the new state based on the current state
    if (interactionType === 'upvote') {
      if (hasUpvoted) {
        // Already upvoted, so we need to remove the upvote
        setUpvotes(upvotes - 1);
        setHasUpvoted(false);
        isUpvote = null;
      } else {
        // Add upvote
        setUpvotes(upvotes + 1);
        if (hasDownvoted) {
          setDownvotes(downvotes - 1);
          setHasDownvoted(false);
        }
        setHasUpvoted(true);
        isUpvote = true;
      }
    } else if (interactionType === 'downvote') {
      if (hasDownvoted) {
        // Already downvoted, so we need to remove the downvote
        setDownvotes(downvotes - 1);
        setHasDownvoted(false);
        isUpvote = null;
      } else {
        // Add downvote
        setDownvotes(downvotes + 1);
        if (hasUpvoted) {
          setUpvotes(upvotes - 1);
          setHasUpvoted(false);
        }
        setHasDownvoted(true);
        isUpvote = false;
      }
    }

    try {
      // Xây dựng URL với tham số type
      const url = `/votes?type=answer`;

      // Gửi yêu cầu API
      await apiClient.post(url, {
        contentId: post.id,
        isUpvote,
      });
    } catch (error) {
      console.error('Error interacting with post:', error);
    } finally {
      setTimeout(() => {
        setIsDebounced(false); // Kết thúc debounce sau 0.5 giây
      }, 500);
    }
  };

  const handleComment = async () => {
    try {
      const response = await apiClient.get(`/comments?answerId=${post.id}`);
      setCommentList(response.data);
      setShowComments(true);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCloseComments = () => {
    setShowComments(false);
  };

  const handleShare = () => {
    // Logic để xử lý khi người dùng click vào share
    // Ví dụ: Mở modal chia sẻ, copy link, v.v.
    console.log("Share clicked");
  };

  // Split the content by lines
  const lines = post.content.split("\n");

  // Get the number of lines to show initially (based on MAX_LENGTH)
  const visibleLines = isExpanded ? lines : lines.slice(0, 2); // Show 2 lines initially

  // Ensure that the second line is truncated if it exceeds MAX_LENGTH
  const truncatedLine =
    visibleLines[1] && visibleLines[1].length > MAX_LENGTH
      ? visibleLines[1].slice(0, MAX_LENGTH) + "..."
      : visibleLines[1];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center space-x-4">
        <img
          src={post.avatar}
          alt="User Avatar"
          className="h-10 w-10 rounded-full"
        />
        <div>
          <p className="font-semibold">
            {post.author} <span className="text-blue-500">· Follow</span>
          </p>
          <p className="text-sm text-gray-500">{post.description}</p>
        </div>
      </div>
      <p className="mt-2 font-semibold">{post.question}</p>
      <div style={{ lineHeight: "1.5" }}>
        {visibleLines.map((line, index) => (
          <div className="mt-2 text-gray-700" key={index}>
            {index === 1 && !isExpanded && truncatedLine}
            {index !== 1 || isExpanded ? line : null}
          </div>
        ))}
        {post.content.split("\n").length > 2 && (
          <button
            onClick={toggleContent}
            className="text-blue-500 font-semibold mt-1 cursor-pointer"
          >
            {isExpanded ? "See Less" : "See More"}
          </button>
        )}
      </div>
      <div className="flex items-center space-x-4 mt-2 text-gray-500">
        <span
          onClick={() => handleInteraction("upvote")}
          className={`cursor-pointer ${hasUpvoted ? "text-green-500" : ""}`}
        >
          ▲ {upvotes}
        </span>
        <span
          onClick={() => handleInteraction("downvote")}
          className={`cursor-pointer ${hasDownvoted ? "text-red-500" : ""}`}
        >
          ▼ {downvotes}
        </span>
        <span onClick={handleComment} className="cursor-pointer">
          💬 {comments}
        </span>
        <span onClick={handleShare} className="cursor-pointer">
          🔗 Share
        </span>
      </div>
      {showComments && (
        <CommentModal comments={commentList} onClose={handleCloseComments} />
      )}
    </div>
  );
}