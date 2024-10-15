import React from 'react';

const Header = () => {
  return (
    <div className="absolute top-0 left-0 w-full px-6 md:px-20 py-2 bg-gradient-to-b from-black to-transparent z-50">
      <img
        className="w-32 md:w-44"
        src="/Netflix_Logo_PMS.png"  
        alt="Netflix Logo"
      />
    </div>
  );
};

export default Header;
