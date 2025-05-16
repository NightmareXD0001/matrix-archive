import { useLocation } from "react-router-dom";
import { ReactNode } from "react";

const RouteWrapper = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  const getScrollbarTheme = () => {
    if (location.pathname.startsWith("/ecomm")) return "scroll-blue";
    if (location.pathname.startsWith("/psynapse")) return "scroll-purple";
    return "scroll-green";
  };

  return <div className={getScrollbarTheme()}>{children}</div>;
};

export default RouteWrapper;
