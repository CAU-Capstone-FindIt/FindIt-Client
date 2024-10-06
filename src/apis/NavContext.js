import React, { createContext, useContext, useState } from "react";

// nav 클릭된 순서 저장(이미지 변경을 위해서)
const NavContext = createContext();

export const NavProvider = ({ children }) => {
  const [activeNav, setActiveNav] = useState(0); // 0: Home, 1: Find, 2: Lost, 3: Search, 4: User

  return (
    <NavContext.Provider value={{ activeNav, setActiveNav }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNavContext = () => {
  return useContext(NavContext);
};
