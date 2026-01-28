import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import RegionPage from "./pages/RegionPage";
import NotFound from "./pages/NotFound";
import BadumbauPage from "./pages/BadumbauPage";

import InnenausbauPage from "./pages/InnenausbauPage";
import ProjektePage from "./pages/ProjektePage";
import KarrierePage from "./pages/KarrierePage";
import AgbPage from "./pages/AgbPage";
import UeberUnsPage from "./pages/UeberUnsPage";
import ImpressumPage from "./pages/ImpressumPage";
import DatenschutzPage from "./pages/DatenschutzPage";
import { useEffect } from "react";

// CMS
import { ContentProvider } from "./cms/context/ContentProvider";
import { AdminLogin } from "./cms/pages/AdminLogin";
import { AdminDashboard } from "./cms/pages/AdminDashboard";
import { MediaLibrary } from "./cms/pages/MediaLibrary";
import { UserManagement } from "./cms/pages/UserManagement";
import ContentEditor from "./cms/pages/ContentEditor";
import SettingsEditor from "./cms/pages/SettingsEditor";
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <HelmetProvider>
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
              
              <Route path="/innenausbau" element={<InnenausbauPage />} />
              <Route path="/projekte" element={<ProjektePage />} />
              <Route path="/karriere" element={<KarrierePage />} />
              <Route path="/agb" element={<AgbPage />} />
              <Route path="/ueber-uns" element={<UeberUnsPage />} />
              <Route path="/impressum" element={<ImpressumPage />} />
              <Route path="/datenschutz" element={<DatenschutzPage />} />
              
              {/* CMS Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/content" element={<ContentEditor />} />
              <Route path="/admin/content/:pageType" element={<ContentEditor />} />
              <Route path="/admin/content/:pageType/:regionSlug" element={<ContentEditor />} />
              <Route path="/admin/media" element={<MediaLibrary />} />
              <Route path="/admin/settings" element={<SettingsEditor />} />
              <Route path="/admin/users" element={<UserManagement />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ContentProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
