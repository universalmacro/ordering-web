import React from "react";
import "./App.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import PageHeader from "./components/PageHeder";

function App() {
  const navigate = useNavigate();

  const currentPath = useLocation().pathname;

  const notShowHeaderUrls: string[] = ["/", "/home"];

  React.useEffect(() => {
    if (currentPath === "/") {
      navigate("/home");
    }
  }, [navigate, currentPath]);

  return (
    <div className="App">
      {/* {notShowHeaderUrls.indexOf(currentPath) == -1 && <PageHeader />} */}
      <Outlet />
    </div>
  );
}

export default App;
