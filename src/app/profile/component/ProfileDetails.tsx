// components/ProfileDetails.tsx
import React from "react";
import Description from './Description';
import Tabs from './Tabs';
import Post from '../../components/Post';

// Dummy data for posts
const posts = [
    {
        id: 0,
        author: "Hùng Bùi",
        avatar: "https://pic.re/image",
        description: "Knows Vietnamese",
        question: "What did you learn too late in life?",
        content: "that’s learn how to code",
        upvotes: 10,
        downvotes: 2,
        comments: 5,
    },
    {
        id: 1,
        author: "Hùng Bùi",
        avatar: "https://pic.re/image",
        description: "Knows Vietnamese",
        question: "",
        content: "hahaha anh love em em love anh...",
        upvotes: 8,
        downvotes: 2,
        comments: 2,
    }
];

const ProfileDetails = () => {
    return (
        <div>
            <Description />
            <Tabs />
            <div className="mt-4">
                <h2 className="text-xl font-bold">Profile</h2>
                <div className="mt-4">
                    {posts.map((post, index) => (
                        <Post key={index} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileDetails;