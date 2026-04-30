import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, Image, FileText, Users, Briefcase, Award,
  MessageSquare, Calendar, Settings, LogOut, Scale, Menu, X,
  Star, Globe, HelpCircle, Activity, UserCog, BookOpen, Phone,
  ChevronRight, Newspaper
} from 'lucide-react';

const sidebarSections = [
  {
    title: 'Overview',
    links: [
      { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    ],
  },
  {
    title: 'Homepage Content',
    links: [
      { to: '/admin/hero', label: 'Hero Section', icon: Globe },
      { to: '/admin/ceo', label: 'CEO Profile', icon: Users },
      { to: '/admin/about', label: 'About Section', icon: FileText },
    ],
  },
  {
    title: 'Firm Content',
    links: [
      { to: '/admin/team', label: 'Team Members', icon: Users },
      { to: '/admin/practice-areas', label: 'Practice Areas', icon: Briefcase },
      { to: '/admin/certifications', label: 'Certifications', icon: Award },
      { to: '/admin/testimonials', label: 'Testimonials', icon: Star },
      { to: '/admin/gallery', label: 'Gallery', icon: Image },
      { to: '/admin/blog', label: 'Blog / Insights', icon: Newspaper },
      { to: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
    ],
  },
  {
    title: 'Leads & Bookings',
    links: [
      { to: '/admin/bookings', label: 'Bookings', icon: Calendar },
      { to: '/admin/contacts', label: 'Contact Forms', icon: MessageSquare },
    ],
  },
  {
    title: 'Site Config',
    links: [
      { to: '/admin/contact-info', label: 'Contact Info', icon: Phone },
      { to: '/admin/settings', label: 'Site Settings', icon: Settings },
    ],
  },
  {
    title: 'System',
    links: [
      { to: '/admin/activity-log', label: 'Activity Log', icon: Activity },
      { to: '/admin/users', label: 'Admin Users', icon: UserCog },
    ],
  },
];

function SidebarLink({ to, label, icon: Icon, exact }) {
  const location = useLocation();
  const active = exact ? location.pathname === to : location.pathname.startsWith(to) && to !== '/admin';
  const isExactAdmin = exact && location.pathname === '/admin';

  return (
    <Link
      to={to}
      className={`admin-sidebar-link ${active || isExactAdmin ? 'active' : ''}`}
    >
      <Icon size={16} className="flex-shrink-0" />
      <span className="text-sm">{label}</span>
    </Link>
  );
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-charcoal-950 border-r border-charcoal-900">
      {/* Logo */}
      <div className="p-6 border-b border-charcoal-900">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 border border-gold-500 flex items-center justify-center">
            <Scale size={14} className="text-gold-500" />
          </div>
          <div>
            <div className="font-display text-white text-sm leading-none">Blackwood</div>
            <div className="text-gold-500 text-[8px] tracking-[0.3em] uppercase font-body">Admin CMS</div>
          </div>
        </Link>
      </div>

      {/* User info */}
      <div className="px-4 py-3 bg-charcoal-900/50 border-b border-charcoal-900 mx-2 mt-3 rounded">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gold-500/20 border border-gold-500/40 rounded-full flex items-center justify-center">
            <span className="text-gold-500 text-xs font-body font-bold">
              {admin?.full_name?.[0] || 'A'}
            </span>
          </div>
          <div>
            <p className="text-white text-xs font-body font-medium leading-none">{admin?.full_name || 'Admin'}</p>
            <p className="text-charcoal-500 text-[10px] font-body capitalize mt-0.5">{admin?.role}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {sidebarSections.map(section => (
          <div key={section.title} className="mb-3">
            <p className="text-charcoal-700 text-[9px] tracking-[0.2em] uppercase font-body px-4 py-2">
              {section.title}
            </p>
            {section.links.map(link => (
              <SidebarLink key={link.to} {...link} />
            ))}
          </div>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="p-4 border-t border-charcoal-900 space-y-1">
        <Link to="/" target="_blank" className="admin-sidebar-link">
          <Globe size={16} />
          <span className="text-sm">View Website</span>
        </Link>
        <button onClick={handleLogout} className="admin-sidebar-link w-full text-left hover:text-red-400">
          <LogOut size={16} />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-ink overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex w-60 flex-shrink-0 flex-col">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-60 flex-shrink-0 flex flex-col">
            <Sidebar />
          </div>
          <div className="flex-1 bg-black/60" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-14 bg-charcoal-950 border-b border-charcoal-900 flex items-center justify-between px-4 sm:px-6 flex-shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-charcoal-400 hover:text-white">
            <Menu size={20} />
          </button>
          <div className="hidden lg:flex items-center gap-2 text-charcoal-500 text-xs font-body">
            <Scale size={12} className="text-gold-500" />
            <span>Blackwood & Associates</span>
            <ChevronRight size={12} />
            <span className="text-charcoal-400">Admin CMS</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-charcoal-500 text-xs font-body hidden sm:block">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>
            <div className="w-2 h-2 bg-green-500 rounded-full" title="System online" />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-ink">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
