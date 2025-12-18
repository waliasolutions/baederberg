
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import { RegionPage } from "./pages/RegionPage";
import NotFound from "./pages/NotFound";
import BadumbauPage from "./pages/BadumbauPage";
import KuechenumbauPage from "./pages/KuechenumbauPage";
import InnenausbauPage from "./pages/InnenausbauPage";
import { useEffect } from "react";

// CMS
import { ContentProvider } from "./cms/context/ContentProvider";
import { AdminLogin } from "./cms/pages/AdminLogin";
import { AdminDashboard } from "./cms/pages/AdminDashboard";
import { ContentList } from "./cms/pages/ContentList";
import { ContentSectionEditor } from "./cms/pages/ContentSectionEditor";
import { MediaLibrary } from "./cms/pages/MediaLibrary";
import { ThemeEditor } from "./cms/pages/ThemeEditor";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ContentProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/region/:regionId" element={<RegionPage />} />
            <Route path="/badumbau" element={<BadumbauPage />} />
            <Route path="/kuechenumbau" element={<KuechenumbauPage />} />
            <Route path="/innenausbau" element={<InnenausbauPage />} />
            
            {/* CMS Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/content" element={<ContentList />} />
            <Route path="/admin/content/:section" element={<ContentSectionEditor />} />
            <Route path="/admin/media" element={<MediaLibrary />} />
            <Route path="/admin/themes" element={<ThemeEditor />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ContentProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
