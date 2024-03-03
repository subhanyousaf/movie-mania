import Footer from "@/components/general/Footer";
import NavBar from "@/components/general/NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="mx-auto max-w-[98rem] px-4 flex flex-col h-screen justify-between">
      <NavBar />
      <main className="mb-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
