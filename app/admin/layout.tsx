'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Car,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Listings', href: '/admin/listings', icon: Car },
  { name: 'Enquiries', href: '/admin/enquiries', icon: Mail },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const userEmail = 'admin@dxstaremporium.com';

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-brand-surface">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-brand-border h-16 flex items-center justify-between px-4 shadow-sm">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-brand-dark p-2"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-1">
          <span className="font-display text-xl font-bold text-brand-gold">DX</span>
          <span className="font-display text-xl font-bold text-brand-dark">STAR</span>
        </div>
        <div className="w-10" />
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 bottom-0 z-50 w-64 bg-white border-r border-brand-border transition-transform duration-300 shadow-lg',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-brand-border">
            <div className="flex items-center justify-between">
              <Link href="/admin" className="flex items-center gap-1">
                <span className="font-display text-2xl font-bold text-brand-gold">DX</span>
                <div className="w-1 h-6 bg-brand-gold/30" />
                <span className="font-display text-2xl font-bold text-brand-dark">STAR</span>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-brand-mid-grey hover:text-brand-dark"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-brand-mid-grey text-xs mt-2 font-medium">Admin Portal</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/admin' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                    isActive
                      ? 'bg-brand-gold text-white'
                      : 'text-brand-mid-grey hover:text-brand-dark hover:bg-brand-surface'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                </Link>
              );
            })}
          </nav>

          {/* User & Logout */}
          <div className="p-4 border-t border-brand-border">
            <div className="px-4 py-2 mb-2">
              <p className="text-sm text-brand-dark font-medium truncate">{userEmail}</p>
              <p className="text-xs text-brand-mid-grey">Administrator (Demo)</p>
            </div>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start text-brand-mid-grey hover:text-red-500 hover:bg-red-50"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
