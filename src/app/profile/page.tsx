import ProfileHeader from './component/ProfileHeader';
import ProfileDetails from './component/ProfileDetails';
import ProfileSidebar from './component/ProfileSideBar';
import Header from '../components/layout/Header';

const ProfilePage = () => {
    return (
        <>
            <Header />
            <div className="max-w-5xl mx-auto p-4">
                <div className="flex flex-col md:flex-row">
                    {/* Left Column */}
                    <div className="w-full md:w-2/3 bg-white p-4 rounded-lg shadow-md">
                        <ProfileHeader />
                        <ProfileDetails />
                    </div>
                    {/* Right Column */}
                    <ProfileSidebar />
                </div>
            </div>
        </>
    );
};

export default ProfilePage;