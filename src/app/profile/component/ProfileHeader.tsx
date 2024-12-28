const ProfileHeader = () => {
    return (
        <div className="flex items-center">
            <img
                src="https://pic.re/image"
                alt="Profile picture"
                className="w-24 h-24 rounded-full"
                width="100"
                height="100"
            />
            <div className="ml-4">
                <h1 className="text-2xl font-bold">Hùng Bùi</h1>
                <p className="text-gray-500">Add profile credential</p>
                <p className="text-gray-500">0 followers · 2 following</p>
            </div>
        </div>
    );
};

export default ProfileHeader;