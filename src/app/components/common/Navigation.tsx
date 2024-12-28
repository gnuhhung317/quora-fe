import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faClipboardList, faUsers, faBell } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => (
    <nav className="flex space-x-6 text-2xl">
        <a className="text-red-600" href="#">
            <FontAwesomeIcon icon={faHome} />
        </a>
        <a className="text-red-600" href="#">
            <FontAwesomeIcon icon={faClipboardList} />
        </a>
        <a className="text-red-600" href="#">
            <FontAwesomeIcon icon={faUsers} />
        </a>
        <a className="text-red-600" href="#">
            <FontAwesomeIcon icon={faBell} />
        </a>
    </nav>
);

export default Navigation;