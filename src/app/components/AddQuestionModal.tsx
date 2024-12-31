'use client';
import { useState, useEffect, FormEvent } from "react";
import apiClient from "../../lib/apiClient";

interface Topic {
    id: number;
    name: string;
    questionCount: number;
    followerCount: number;
}

interface AddQuestionModalProps {
    closeModal: () => void;
}

const AddQuestionModal: React.FC<AddQuestionModalProps> = ({ closeModal }) => {
    const [title, setTitle] = useState("");
    const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]);
    const [topics, setTopics] = useState<Topic[]>([]);

    useEffect(() => {
        // Fetch topics from API
        apiClient.get("/topics")
            .then((response) => setTopics(response.data))
            .catch((error) => console.error("Error fetching topics:", error));
    }, []);

    const handleSelectTopic = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTopicId = Number(e.target.value);
        const selectedTopic = topics.find(topic => topic.id === selectedTopicId);
        if (selectedTopic && !selectedTopics.includes(selectedTopic)) {
            setSelectedTopics([...selectedTopics, selectedTopic]);
        }
    };

    const handleRemoveTopic = (topicId: number) => {
        setSelectedTopics(selectedTopics.filter(topic => topic.id !== topicId));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const topicIds = selectedTopics.map(topic => topic.id);
        const response = await apiClient.post("/questions", {
            title, topicIds
        });

        if (response.status === 200) {
            // Handle successful response
            console.log("Question added successfully");
            closeModal();
        } else {
            // Handle error response
            console.error("Failed to add question");
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl mb-4">Add a New Question</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="title">
                            Title
                        </label>
                        <input
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="topics">
                            Topics
                        </label>
                        <select
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            id="topics"
                            onChange={handleSelectTopic}
                        >
                            <option value="" disabled>Select a topic</option>
                            {topics.map((topic) => (
                                <option key={topic.id} value={topic.id}>{topic.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Selected Topics</label>
                        <ul className="mt-1 space-y-2">
                            {selectedTopics.map(topic => (
                                <li key={topic.id} className="flex items-center justify-between p-2 bg-gray-200 rounded-md">
                                    <span>{topic.name}</span>
                                    <button
                                        type="button"
                                        className="text-red-600"
                                        onClick={() => handleRemoveTopic(topic.id)}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded-md"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-red-600 text-white px-4 py-2 rounded-md"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddQuestionModal;