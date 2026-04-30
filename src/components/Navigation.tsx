import { useState } from 'react';
import { Page } from '../App';
import Icon from '@/components/ui/icon';

interface Props {
  currentPage: Page;
  navigate: (page: Page) => void;
  cartCount: number;
  onCartOpen: () => void;
}

const navLinks: { id: Page; label: string }[] = [
  { id: 'home', label: 'Главная' },
  { id: 'catalog', label: 'Каталог' },
  { id: 'about', label: 'О нас' },
  { id: 'contacts', label: 'Контакты' },
];

export default function Navigation({ currentPage, navigate, cartCount, onCartOpen }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-3 group"
        >
          <div className="w-8 h-8 bg-orange-DEFAULT flex items-center justify-center clip-corner">
            <Icon name="Wrench" size={16} className="text-white" />
          </div>
          <div>
            <div className="font-oswald font-bold text-xl text-white leading-none tracking-wider">
              MOTO<span className="text-orange-DEFAULT">PARTS</span>
            </div>
            <div className="spec-tag text-steel-DEFAULT">запчасти для мотоциклов</div>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => navigate(link.id)}
              className={`font-oswald text-sm tracking-widest uppercase transition-colors ${
                currentPage === link.id
                  ? 'text-orange-DEFAULT'
                  : 'text-steel-DEFAULT hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('catalog')}
            className="hidden md:flex items-center gap-2 px-4 py-2 border border-border hover:border-orange-DEFAULT transition-colors"
          >
            <Icon name="Search" size={14} className="text-steel-DEFAULT" />
            <span className="spec-tag text-steel-DEFAULT">ПОИСК ПО VIN</span>
          </button>

          <button
            onClick={onCartOpen}
            className="relative flex items-center gap-2 px-4 py-2 bg-orange-DEFAULT hover:bg-orange-400 transition-colors"
          >
            <Icon name="ShoppingCart" size={16} className="text-zinc-900" />
            {cartCount > 0 && (
              <span className="font-mono text-xs font-bold text-zinc-900">{cartCount}</span>
            )}
          </button>

          {/* Mobile menu */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-steel-DEFAULT hover:text-white"
          >
            <Icon name={mobileOpen ? 'X' : 'Menu'} size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => { navigate(link.id); setMobileOpen(false); }}
              className={`w-full text-left px-6 py-4 font-oswald tracking-widest uppercase border-b border-border transition-colors ${
                currentPage === link.id ? 'text-orange-DEFAULT' : 'text-steel-DEFAULT hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}