import NavBar from "@/components/nav/NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="mx-2 lg:mx-12 xl:mx-24 2xl:mx-48">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Layout;
