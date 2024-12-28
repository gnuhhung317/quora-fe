// components/Post.tsx
'use client'; import apiClient from "@/lib/apiCLient";
import React, { useState } from "react";

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
  };
};

export default function Post({ post }: PostProps) {
  const MAX_LENGTH = 100;
  const [isExpanded, setIsExpanded] = useState(false);
  const [upvotes, setUpvotes] = useState(post.upvotes);
  const [downvotes, setDownvotes] = useState(post.downvotes);
  const [comments, setComments] = useState(post.comments);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  const handleInteraction = async (interactionType: 'upvote' | 'downvote') => {
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
    }
  };

  const handleComment = () => {
    // Logic để xử lý khi người dùng click vào comment
    // Ví dụ: Mở modal, chuyển đến trang khác, v.v.
    console.log("Comment clicked");
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
        <span onClick={() => handleInteraction("upvote")} className="cursor-pointer">
          ▲ {upvotes}
        </span>
        <span onClick={() => handleInteraction("downvote")} className="cursor-pointer">
          ▼ {downvotes}
        </span>
        <span onClick={handleComment} className="cursor-pointer">
          💬 {comments}
        </span>
        <span onClick={handleShare} className="cursor-pointer">
          🔗 Share
        </span>
      </div>
    </div>
  );
}