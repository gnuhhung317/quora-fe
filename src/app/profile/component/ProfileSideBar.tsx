import { FC } from 'react';

const Credentials: FC = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-4">
            <h2 className="text-xl font-semibold mb-4">Credentials & Highlights</h2>
            <button className="text-blue-500 mb-2 flex items-center">
                <i className="fas fa-briefcase mr-2"></i> Add employment credential
            </button>
            <button className="text-blue-500 mb-2 flex items-center">
                <i className="fas fa-graduation-cap mr-2"></i> Add education credential
            </button>
            <button className="text-blue-500 mb-2 flex items-center">
                <i className="fas fa-map-marker-alt mr-2"></i> Add location credential
            </button>
            <div className="flex items-center text-gray-600 mb-2">
                <i className="fas fa-globe mr-2"></i> Knows Vietnamese
            </div>
            <div className="flex items-center text-gray-600 mb-2">
                <i className="fas fa-eye mr-2"></i> 277 content views
            </div>
            <div className="flex items-center text-gray-600">
                <i className="fas fa-calendar-alt mr-2"></i> Joined February 2024
            </div>
        </div>
    );
};

export default Credentials;
