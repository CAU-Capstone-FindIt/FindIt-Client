import React, { createContext, useContext, useEffect, useState } from "react";

// nav 클릭된 순서 저장(이미지 변경을 위해서)
const NavContext = createContext();

export const NavProvider = ({ children }) => {
  const storedActiveNav = localStorage.getItem("activeNav");
  const [activeNav, setActiveNav] = useState(
    storedActiveNav ? Number(storedActiveNav) : 0
  ); // 로컬 스토리지에서 값을 가져오거나 기본값 0

  // Save activeNav to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("activeNav", activeNav);
  }, [activeNav]);

  console.log(activeNav);

  return (
    <NavContext.Provider value={{ activeNav, setActiveNav }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNavContext = () => {
  return useContext(NavContext);
};
