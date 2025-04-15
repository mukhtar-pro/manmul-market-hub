
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Topbar from "./Topbar";
import Footer from "./Footer";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  // Check if we're in a valid router context
  try {
    useLocation(); // This will throw if we're not in a router context
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
  } catch (e) {
    // Fallback when not in a router context (like initial render)
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 py-6">
          {children}
        </main>
        <Footer />
      </div>
    );
  }
};

export default MainLayout;
