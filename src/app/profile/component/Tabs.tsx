const Tabs = () => {
    return (
        <div className="mt-4 border-b border-gray-300">
            <ul className="flex space-x-4">
                <li className="text-red-500 border-b-2 border-red-500 pb-2">Profile</li>
                <li className="text-gray-500">1 Answer</li>
                <li className="text-gray-500">1 Question</li>
                <li className="text-gray-500">6 Posts</li>
                <li className="text-gray-500">0 Followers</li>
                <li className="text-gray-500">Following</li>
                <li className="text-gray-500">Edits</li>
                <li className="text-gray-500">Activity</li>
            </ul>
        </div>
    );
};

export default Tabs;