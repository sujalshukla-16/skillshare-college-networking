import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
      <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
