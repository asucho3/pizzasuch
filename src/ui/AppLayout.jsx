import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function AppLayout() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default AppLayout;
