
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Pages
import Index from "@/pages/Index";
import ProductsPage from "@/pages/products/Products";
import ProductDetail from "@/pages/products/ProductDetail";
import ShopsPage from "@/pages/shops/Shops";
import ShopDetail from "@/pages/shops/ShopDetail";
import HealthcarePage from "@/pages/healthcare/Healthcare";
import MedicineDetail from "@/pages/healthcare/MedicineDetail";
import CartPage from "@/pages/cart/Cart";
import HistoryPage from "@/pages/history/History";
import OrderDetails from "@/pages/history/OrderDetails";
import ProfilePage from "@/pages/profile/Profile";
import SettingsPage from "@/pages/settings/Settings";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CartProvider>
          <BrowserRouter>
            <TooltipProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/shops" element={<ShopsPage />} />
                <Route path="/shops/:id" element={<ShopDetail />} />
                <Route path="/healthcare" element={<HealthcarePage />} />
                <Route path="/healthcare/:id" element={<MedicineDetail />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/order-details/:id" element={<OrderDetails />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </BrowserRouter>
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
