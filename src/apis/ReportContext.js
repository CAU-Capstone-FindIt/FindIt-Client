// ReportContext.jsx
import React, { createContext, useContext, useState } from "react";

const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const [reportInfo, setReportInfo] = useState({ mode: "", position: null });

  return (
    <ReportContext.Provider value={{ reportInfo, setReportInfo }}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReportContext = () => useContext(ReportContext);
