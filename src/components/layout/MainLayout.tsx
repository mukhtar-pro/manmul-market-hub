
import { ReactNode } from "react";
import Header from "./Header";
import Topbar from "./Topbar";
import Footer from "./Footer";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Topbar />
      <main className="flex-1 py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
