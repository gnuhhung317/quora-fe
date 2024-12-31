'use client';
import React, { useState } from "react";
import apiClient from "../../lib/apiClient";

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
    isUpvoted: boolean | null; // null: no vote, true: upvoted, false: downvoted
};

type CommentModalProps = {
    comments: Comment[];
    onClose: () => void;
};

const CommentModal: React.FC<CommentModalProps> = ({ comments, onClose }) => {
    const [commentList, setCommentList] = useState(comments);
    const [isDebounced, setIsDebounced] = useState(false); // Trạng thái debounce

    const handleInteraction = async (commentId: number, interactionType: 'upvote' | 'downvote') => {
        if (isDebounced) {
            return; // Nếu đang debounce, không làm gì cả
        }
        setIsDebounced(true); // Thiết lập debounce

        let updatedComments = commentList.map((comment) => {
            if (comment.id === commentId) {
                if (interactionType === 'upvote') {
                    if (comment.isUpvoted === true) {
                        // Remove upvote
                        comment.interaction.upvote -= 1;
                        comment.isUpvoted = null;
                    } else {
                        // Add upvote
                        comment.interaction.upvote += 1;
                        if (comment.isUpvoted === false) {
                            comment.interaction.downvote -= 1;
                        }
                        comment.isUpvoted = true;
                    }
                } else if (interactionType === 'downvote') {
                    if (comment.isUpvoted === false) {
                        // Remove downvote
                        comment.interaction.downvote -= 1;
                        comment.isUpvoted = null;
                    } else {
                        // Add downvote
                        comment.interaction.downvote += 1;
                        if (comment.isUpvoted === true) {
                            comment.interaction.upvote -= 1;
                        }
                        comment.isUpvoted = false;
                    }
                }
            }
            return comment;
        });

        setCommentList([...updatedComments]);

        try {
            const url = `/votes?type=comment`;
            await apiClient.post(url, {
                contentId: commentId,
                isUpvote: interactionType === 'upvote' ? true : false,
            });
        } catch (error) {
            console.error('Error interacting with comment:', error);
        } finally {
            setTimeout(() => {
                setIsDebounced(false); // Kết thúc debounce sau 0.5 giây
            }, 500);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg w-1/2 max-h-full overflow-y-auto">
                <button onClick={onClose} className="text-red-600 font-semibold mb-2">Close</button>
                {commentList.map(comment => (
                    <div key={comment.id} className="bg-gray-100 p-2 rounded-lg mb-2">
                        <div className="flex items-center space-x-2">
                            <img src={comment.author.avatarUrl} alt="User Avatar" className="h-8 w-8 rounded-full" />
                            <div>
                                <p className="font-semibold">{comment.author.fullName}</p>
                                <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                        <p className="mt-2">{comment.content}</p>
                        <div className="flex items-center space-x-4 mt-2 text-gray-500">
                            <span
                                className={`cursor-pointer ${comment.isUpvoted === true ? "text-green-500" : ""}`}
                                onClick={() => handleInteraction(comment.id, 'upvote')}
                            >
                                ▲ {comment.interaction.upvote}
                            </span>
                            <span
                                className={`cursor-pointer ${comment.isUpvoted === false ? "text-red-500" : ""}`}
                                onClick={() => handleInteraction(comment.id, 'downvote')}
                            >
                                ▼ {comment.interaction.downvote}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentModal;