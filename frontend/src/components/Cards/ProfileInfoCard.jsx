// ProfileInfoCard.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

const DEFAULT_AVATAR =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><rect width="96" height="96" rx="48" fill="%23e5e7eb"/><circle cx="48" cy="38" r="18" fill="%239ca3af"/><path d="M16 86c0-16 14-28 32-28s32 12 32 28" fill="%239ca3af"/></svg>';

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/');
  };

  return (
    <div className="flex items-center gap-3">
      <img
        src={user?.profileImageUrl || DEFAULT_AVATAR}
        onError={(e) => {
          if (e.currentTarget.src !== DEFAULT_AVATAR) e.currentTarget.src = DEFAULT_AVATAR;
        }}
        alt="Profile"
        className="w-12 h-12 rounded-full mr-3 object-cover bg-gray-300"
        loading="lazy"
        referrerPolicy="no-referrer"
      />
      <div>
        <span className="text-[15px] text-black font-bold leading-3">
          {user?.name || 'Guest User'}
        </span>
      </div>
      <button
        onClick={handleLogout}
        className="text-amber-600 text-sm font-semibold cursor-pointer hover:underline"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileInfoCard;
