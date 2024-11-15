import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// nav 클릭된 순서 저장(이미지 변경을 위해서)
const NavContext = createContext();

export const NavProvider = ({ children }) => {
  const location = useLocation();
  const [activeNav, setActiveNav] = useState(0); // 로컬 스토리지에서 값을 가져오거나 기본값 0

  useEffect(() => {
    const pathname = location;

    setActiveNav(
      ["/", "/find", "/lost", "/search", "/userpage"].findIndex(
        (str) => str === location.pathname
      )
    );
  }, [location]);

  return (
    <NavContext.Provider value={{ activeNav, setActiveNav }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNavContext = () => {
  return useContext(NavContext);
};
