'use client';
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faClipboardList,
  faUsers,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import AddQuestionModal from "./AddQuestionModal";

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-2 px-4">
        <div className="flex items-center space-x-4">
          <img src="/images/logo.png" alt="QueryHub Logo" className="h-8" />
          <nav className="flex space-x-4">
            <a className="text-red-600" href="#">
              <FontAwesomeIcon icon={faHome} />
            </a>
            <a className="text-gray-600" href="#">
              <FontAwesomeIcon icon={faClipboardList} />
            </a>
            <a className="text-gray-600" href="#">
              <FontAwesomeIcon icon={faUsers} />
            </a>
            <a className="text-gray-600" href="#">
              <FontAwesomeIcon icon={faBell} />
            </a>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <input
            className="border rounded-full px-4 py-1"
            placeholder="Search Quora"
            type="text"
          />
          <button
            className="bg-red-600 text-white px-4 py-1 rounded-full"
            onClick={openModal}
          >
            Add question
          </button>
          <img
            src="https://pic.re/image"
            alt="User Avatar"
            className="h-8 w-8 rounded-full"
          />
        </div>
      </div>
      {isModalOpen && <AddQuestionModal closeModal={closeModal} />}
    </header>
  );
};

export default Header;