import { useState, useMemo } from 'react';
import { Page, Product } from '../App';
import { PRODUCTS, CATEGORIES, BRANDS } from '../data/products';
import ProductCard from '../components/ProductCard';
import Icon from '@/components/ui/icon';

interface Props {
  navigate: (page: Page, product?: Product) => void;
  addToCart: (product: Product) => void;
}

export default function CatalogPage({ navigate, addToCart }: Props) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'rating' | 'name'>('rating');
  const [vinInput, setVinInput] = useState('');
  const [priceMax, setPriceMax] = useState(100000);
  const [inStockOnly, setInStockOnly] = useState(false);

  const filtered = useMemo(() => {
    let result = [...PRODUCTS];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.partNumber.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.compatibility.some(c => c.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (selectedBrand !== 'all') {
      result = result.filter(p => p.brand === selectedBrand);
    }

    if (inStockOnly) {
      result = result.filter(p => p.inStock);
    }

    result = result.filter(p => p.price <= priceMax);

    switch (sortBy) {
      case 'price_asc': result.sort((a, b) => a.price - b.price); break;
      case 'price_desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'name': result.sort((a, b) => a.name.localeCompare(b.name)); break;
    }

    return result;
  }, [search, selectedCategory, selectedBrand, sortBy, priceMax, inStockOnly]);

  return (
    <main className="pt-16 min-h-screen">
      {/* Header bar */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1 h-6 bg-orange-DEFAULT" />
            <h1 className="font-oswald text-2xl text-white tracking-wider">КАТАЛОГ ЗАПЧАСТЕЙ</h1>
          </div>
          <p className="spec-tag text-steel-DEFAULT ml-4">
            Найдено: <span className="text-orange-DEFAULT">{filtered.length}</span> позиций
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* SIDEBAR */}
        <aside className="hidden lg:block w-64 flex-shrink-0 space-y-6">
          {/* VIN Search */}
          <div className="border border-orange-DEFAULT/40 p-4 bg-card">
            <div className="spec-tag text-orange-DEFAULT mb-3 flex items-center gap-2">
              <Icon name="Search" size={12} />
              ПОИСК ПО VIN
            </div>
            <input
              value={vinInput}
              onChange={e => setVinInput(e.target.value.toUpperCase())}
              placeholder="JHMBB7659RS000001"
              maxLength={17}
              className="w-full bg-background border border-border focus:border-orange-DEFAULT outline-none px-3 py-2 font-mono text-white text-xs placeholder-steel-DEFAULT transition-colors mb-2"
            />
            <button className="w-full py-2 bg-orange-DEFAULT text-white spec-tag hover:bg-orange-400 transition-colors">
              НАЙТИ СОВМЕСТИМЫЕ
            </button>
          </div>

          {/* Categories */}
          <div>
            <div className="spec-tag text-steel-DEFAULT mb-3">КАТЕГОРИЯ</div>
            <div className="space-y-1">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-3 py-2 flex items-center gap-2 transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-orange-DEFAULT text-white'
                      : 'hover:bg-muted text-steel-DEFAULT hover:text-white'
                  }`}
                >
                  <Icon name={cat.icon} size={14} />
                  <span className="spec-tag">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div>
            <div className="spec-tag text-steel-DEFAULT mb-3">ПРОИЗВОДИТЕЛЬ</div>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedBrand('all')}
                className={`w-full text-left px-3 py-1.5 spec-tag transition-colors ${
                  selectedBrand === 'all' ? 'text-orange-DEFAULT' : 'text-steel-DEFAULT hover:text-white'
                }`}
              >
                Все бренды
              </button>
              {BRANDS.map(brand => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`w-full text-left px-3 py-1.5 spec-tag transition-colors ${
                    selectedBrand === brand ? 'text-orange-DEFAULT' : 'text-steel-DEFAULT hover:text-white'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <div className="spec-tag text-steel-DEFAULT mb-3">ЦЕНА ДО</div>
            <input
              type="range"
              min={500}
              max={100000}
              step={500}
              value={priceMax}
              onChange={e => setPriceMax(Number(e.target.value))}
              className="w-full accent-orange-DEFAULT"
            />
            <div className="font-mono text-sm text-white mt-1">{priceMax.toLocaleString('ru-RU')} ₽</div>
          </div>

          {/* In Stock */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => setInStockOnly(!inStockOnly)}
                className={`w-10 h-5 relative transition-colors ${inStockOnly ? 'bg-orange-DEFAULT' : 'bg-muted'}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 bg-white transition-transform ${inStockOnly ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
              <span className="spec-tag text-steel-DEFAULT">Только в наличии</span>
            </label>
          </div>
        </aside>

        {/* MAIN */}
        <div className="flex-1 min-w-0">
          {/* Search + Sort */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex-1 relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-steel-DEFAULT" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Артикул, название, марка мотоцикла..."
                className="w-full bg-card border border-border focus:border-orange-DEFAULT outline-none pl-9 pr-4 py-3 text-white placeholder-steel-DEFAULT text-sm transition-colors"
              />
            </div>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="bg-card border border-border text-white spec-tag px-4 py-3 outline-none focus:border-orange-DEFAULT cursor-pointer"
            >
              <option value="rating">ПО РЕЙТИНГУ</option>
              <option value="price_asc">ЦЕНА ↑</option>
              <option value="price_desc">ЦЕНА ↓</option>
              <option value="name">ПО НАЗВАНИЮ</option>
            </select>
          </div>

          {/* Mobile filters */}
          <div className="lg:hidden flex gap-2 mb-4 overflow-x-auto pb-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 px-3 py-1.5 spec-tag transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-orange-DEFAULT text-white'
                    : 'border border-border text-steel-DEFAULT'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <Icon name="Search" size={48} className="text-steel-mid mx-auto mb-4" />
              <p className="font-oswald text-white text-xl">НИЧЕГО НЕ НАЙДЕНО</p>
              <p className="spec-tag text-steel-DEFAULT mt-2">Попробуйте изменить параметры поиска</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-px bg-border">
              {filtered.map(p => (
                <ProductCard key={p.id} product={p} navigate={navigate} addToCart={addToCart} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}