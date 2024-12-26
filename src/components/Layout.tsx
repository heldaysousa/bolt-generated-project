import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { Menu } from 'lucide-react';
import { MobileMenu } from './Layout/MobileMenu';
import {
  LayoutDashboard,
  Calendar,
  Users,
  DollarSign,
  Package,
  Settings,
  LogOut,
  Moon,
  Sun,
} from 'lucide-react';

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { signOut } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-[#000000]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-white shadow-md dark:bg-[#1C1C1C] flex-col">
        <div className="p-4 flex items-center">
          <img
            src="/logo-optimized.png"
            alt="CEO Express Logo"
            className="h-8 w-8 mr-2"
            width={32}
            height={32}
          />
          <h1 className="text-2xl font-bold text-[#4B0082] dark:text-[#C0C0C0]">
            CEO Express
          </h1>
        </div>

        <nav className="flex-1 mt-8">
          <Link
            to="/"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-[#4B0082] hover:text-white dark:text-[#C0C0C0] dark:hover:bg-[#4B0082]"
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          {/* Other menu items */}
        </nav>

        <div className="p-4">
          <button
            onClick={() => signOut()}
            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-[#4B0082] hover:text-white dark:text-[#C0C0C0] dark:hover:bg-[#4B0082]"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sair
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#1C1C1C] flex items-center justify-between px-4 z-10">
        <div className="flex items-center">
          <img
            src="/logo-optimized.png"
            alt="CEO Express Logo"
            className="h-8 w-8 mr-2"
            width={32}
            height={32}
          />
          <h1 className="text-xl font-bold text-[#C0C0C0]">CEO Express</h1>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="text-[#C0C0C0]"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto md:p-8 p-4 md:mt-0 mt-16">
        <Outlet />
      </main>
    </div>
  );
}
