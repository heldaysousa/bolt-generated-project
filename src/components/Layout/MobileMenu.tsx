import React from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useThemeStore } from '../../store/themeStore';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-[#1C1C1C] transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#C0C0C0]"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="mt-8 space-y-4">
            <Link
              to="/"
              className="block px-4 py-2 text-[#C0C0C0] hover:bg-[#4B0082] rounded"
              onClick={onClose}
            >
              Dashboard
            </Link>
            <Link
              to="/agenda"
              className="block px-4 py-2 text-[#C0C0C0] hover:bg-[#4B0082] rounded"
              onClick={onClose}
            >
              Agenda
            </Link>
            <Link
              to="/financeiro"
              className="block px-4 py-2 text-[#C0C0C0] hover:bg-[#4B0082] rounded"
              onClick={onClose}
            >
              Financeiro
            </Link>
            <Link
              to="/servicos"
              className="block px-4 py-2 text-[#C0C0C0] hover:bg-[#4B0082] rounded"
              onClick={onClose}
            >
              Serviços
            </Link>
            <button
              onClick={toggleTheme}
              className="w-full px-4 py-2 text-[#C0C0C0] hover:bg-[#4B0082] rounded text-left"
            >
              {theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
