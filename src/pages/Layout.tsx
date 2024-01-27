import Footer from "@/components/general/Footer";
import NavBar from "@/components/general/NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="mx-2 lg:mx-12 xl:mx-24 2xl:mx-48 flex flex-col h-screen justify-between">
      <NavBar />
      <main className="mb-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
