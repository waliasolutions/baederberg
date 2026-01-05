import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FileText, 
  Image, 
  Globe, 
  History, 
  LogOut,
  Menu,
  X,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { path: '/admin/content', label: 'Inhalt', icon: FileText },
  { path: '/admin/media', label: 'Medien', icon: Image },
  { path: '/admin/seo', label: 'SEO & Unternehmen', icon: Globe },
  { path: '/admin/users', label: 'Benutzer', icon: Users, adminOnly: true },
  { path: '/admin/revisions', label: 'Verlauf', icon: History },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, signOut, isAdmin, isEditor } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  if (!user || (!isAdmin && !isEditor)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Zugriff verweigert</h1>
          <p className="text-slate-600 mb-4">Sie haben keine Berechtigung für diesen Bereich.</p>
          <Button onClick={() => navigate('/admin/login')}>Zum Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 flex items-center px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
        <span className="ml-4 font-semibold text-slate-900">CMS Admin</span>
      </header>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-200 z-40 transition-transform duration-200",
          "lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <Link to="/" className="font-bold text-xl text-slate-900">
            Bäderberg CMS
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map(item => {
            // Skip admin-only items for non-admins
            if ('adminOnly' in item && item.adminOnly && !isAdmin) {
              return null;
            }
            
            const isActive = item.exact 
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-slate-600 hover:bg-slate-100"
                )}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm">
              <p className="font-medium text-slate-900 truncate">{user.email}</p>
              <p className="text-slate-500 text-xs">{isAdmin ? 'Admin' : 'Editor'}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            className="w-full"
          >
            <LogOut size={16} className="mr-2" />
            Abmelden
          </Button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
