import { useState } from 'react';
import { Page, Product } from '../App';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import Icon from '@/components/ui/icon';

interface Props {
  navigate: (page: Page, product?: Product) => void;
  addToCart: (product: Product) => void;
}

const HERO_IMG = 'https://cdn.poehali.dev/projects/d94a8c6b-10ab-422d-badd-0b7a5301cf25/files/5b7a1366-7892-4a66-9698-fe011c4a62b4.jpg';

const STATS = [
  { value: '50 000+', label: 'Запчастей в каталоге' },
  { value: '1 200+', label: 'Моделей мотоциклов' },
  { value: '12 лет', label: 'На рынке' },
  { value: '98%', label: 'Довольных клиентов' },
];

const CATEGORY_TILES = [
  { name: 'Двигатель', icon: 'Settings', count: 12840 },
  { name: 'Тормозная система', icon: 'Disc', count: 8320 },
  { name: 'Подвеска', icon: 'ArrowUpDown', count: 6110 },
  { name: 'Трансмиссия', icon: 'Link', count: 5440 },
  { name: 'Электрика', icon: 'Zap', count: 4200 },
  { name: 'Кузов', icon: 'Shield', count: 9830 },
];

export default function HomePage({ navigate, addToCart }: Props) {
  const [vinInput, setVinInput] = useState('');
  const [vinResult, setVinResult] = useState<null | { make: string; model: string; year: string; engine: string }>(null);

  const handleVinSearch = () => {
    if (vinInput.length < 5) return;
    // Simulate VIN decode
    setVinResult({ make: 'Honda', model: 'CBR600RR', year: '2009', engine: '599 cc, 4-цилиндровый, 120 л.с.' });
  };

  const featured = PRODUCTS.slice(0, 4);

  return (
    <main className="pt-16">
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 stripe-pattern" />

        {/* Decorative elements */}
        <div className="absolute right-0 top-0 w-1 h-full bg-orange-DEFAULT opacity-40" />
        <div className="absolute bottom-12 right-12 hidden lg:block">
          <div className="border border-orange-DEFAULT/30 p-4 spec-tag text-orange-DEFAULT/60">
            <div>IMG_0042.RAW</div>
            <div>f/2.8 · 1/500s · ISO 800</div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-24">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
            <div className="w-8 h-px bg-orange-DEFAULT" />
            <span className="spec-tag text-orange-DEFAULT">ПРОФЕССИОНАЛЬНЫЕ ЗАПЧАСТИ</span>
          </div>

          {/* Headline */}
          <h1 className="font-oswald font-bold text-6xl md:text-8xl text-white leading-[0.9] mb-4 animate-fade-in-up delay-100">
            МОЩЬ<br />
            <span className="text-orange-DEFAULT">В ДЕТАЛЯХ</span>
          </h1>
          <p className="font-sans text-steel-DEFAULT text-xl max-w-md mb-10 animate-fade-in-up delay-200">
            Оригинальные запчасти и аналоги для любого мотоцикла. Умный подбор по VIN за секунды.
          </p>

          {/* VIN Search */}
          <div className="max-w-xl animate-fade-in-up delay-300">
            <div className="spec-tag text-steel-DEFAULT mb-2 flex items-center gap-2">
              <Icon name="Search" size={12} />
              ПОИСК ЗАПЧАСТЕЙ ПО VIN-НОМЕРУ
            </div>
            <div className="flex">
              <input
                value={vinInput}
                onChange={e => setVinInput(e.target.value.toUpperCase())}
                onKeyDown={e => e.key === 'Enter' && handleVinSearch()}
                placeholder="JHMBB7659RS000001"
                maxLength={17}
                className="flex-1 bg-black/60 border border-border focus:border-orange-DEFAULT outline-none px-4 py-3 font-mono text-white text-sm placeholder-steel-DEFAULT backdrop-blur-sm transition-colors"
              />
              <button
                onClick={handleVinSearch}
                className="px-6 bg-orange-DEFAULT hover:bg-orange-400 transition-colors flex items-center gap-2"
              >
                <Icon name="Search" size={16} className="text-black" />
                <span className="spec-tag text-black hidden sm:block">ПОДОБРАТЬ</span>
              </button>
            </div>

            {/* VIN Result */}
            {vinResult && (
              <div className="mt-3 bg-card border border-orange-DEFAULT p-4 animate-fade-in">
                <div className="spec-tag text-orange-DEFAULT mb-2">VIN ДЕКОДИРОВАН</div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    ['Марка', vinResult.make],
                    ['Модель', vinResult.model],
                    ['Год', vinResult.year],
                    ['Двигатель', vinResult.engine],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <div className="spec-tag text-steel-DEFAULT">{k}</div>
                      <div className="font-mono text-sm text-white">{v}</div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => navigate('catalog')}
                  className="mt-3 w-full py-2 bg-orange-DEFAULT text-black spec-tag hover:bg-orange-400 transition-colors"
                >
                  ПОКАЗАТЬ СОВМЕСТИМЫЕ ЗАПЧАСТИ →
                </button>
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 mt-8 animate-fade-in-up delay-400">
            <button
              onClick={() => navigate('catalog')}
              className="px-8 py-3 bg-orange-DEFAULT text-black font-oswald text-lg tracking-wider hover:bg-orange-400 transition-all clip-corner"
            >
              КАТАЛОГ ЗАПЧАСТЕЙ
            </button>
            <button
              onClick={() => navigate('contacts')}
              className="px-8 py-3 border border-steel-DEFAULT text-white font-oswald text-lg tracking-wider hover:border-orange-DEFAULT hover:text-orange-DEFAULT transition-all"
            >
              СВЯЗАТЬСЯ
            </button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-card metal-texture">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
          {STATS.map((s) => (
            <div key={s.label} className="bg-card px-6 py-6 text-center">
              <div className="font-oswald text-3xl text-orange-DEFAULT mb-1">{s.value}</div>
              <div className="spec-tag text-steel-DEFAULT">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-1 h-8 bg-orange-DEFAULT" />
          <div>
            <h2 className="font-oswald text-3xl text-white tracking-wider">КАТЕГОРИИ ЗАПЧАСТЕЙ</h2>
            <p className="spec-tag text-steel-DEFAULT">по типам и системам мотоцикла</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border">
          {CATEGORY_TILES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => navigate('catalog')}
              className="bg-card hover:bg-steel-dark transition-colors p-6 text-center group border-0"
            >
              <div className="w-12 h-12 mx-auto mb-3 border border-border group-hover:border-orange-DEFAULT transition-colors flex items-center justify-center">
                <Icon name={cat.icon} size={20} className="text-steel-DEFAULT group-hover:text-orange-DEFAULT transition-colors" />
              </div>
              <div className="font-oswald text-sm text-white group-hover:text-orange-DEFAULT transition-colors mb-1">
                {cat.name}
              </div>
              <div className="spec-tag text-steel-DEFAULT">{cat.count.toLocaleString('ru-RU')} арт.</div>
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-1 h-8 bg-orange-DEFAULT" />
              <div>
                <h2 className="font-oswald text-3xl text-white tracking-wider">ХИТЫ ПРОДАЖ</h2>
                <p className="spec-tag text-steel-DEFAULT">популярные запчасти этого месяца</p>
              </div>
            </div>
            <button
              onClick={() => navigate('catalog')}
              className="hidden md:flex items-center gap-2 border border-border hover:border-orange-DEFAULT px-4 py-2 transition-colors"
            >
              <span className="spec-tag text-steel-DEFAULT group-hover:text-orange-DEFAULT">ВСЕ ТОВАРЫ</span>
              <Icon name="ArrowRight" size={14} className="text-steel-DEFAULT" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {featured.map(p => (
              <ProductCard key={p.id} product={p} navigate={navigate} addToCart={addToCart} />
            ))}
          </div>

          <div className="mt-6 text-center md:hidden">
            <button
              onClick={() => navigate('catalog')}
              className="px-8 py-3 border border-border text-white font-oswald tracking-wider hover:border-orange-DEFAULT transition-colors"
            >
              СМОТРЕТЬ ВСЕ ТОВАРЫ
            </button>
          </div>
        </div>
      </section>

      {/* SMART SELECTION BANNER */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="relative overflow-hidden border border-orange-DEFAULT/30 p-8 md:p-12">
          <div className="absolute inset-0 stripe-pattern" />
          <div className="absolute top-0 left-0 w-16 h-16 border-r border-b border-orange-DEFAULT/40" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-l border-t border-orange-DEFAULT/40" />

          <div className="relative flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="spec-tag text-orange-DEFAULT mb-3 flex items-center gap-2">
                <Icon name="Cpu" size={12} />
                УМНАЯ СИСТЕМА ПОДБОРА
              </div>
              <h2 className="font-oswald text-4xl text-white mb-4 leading-tight">
                ТОЧНОЕ СОВПАДЕНИЕ<br />
                <span className="text-orange-DEFAULT">ГАРАНТИРОВАНО</span>
              </h2>
              <p className="text-steel-DEFAULT font-sans mb-6">
                Наш алгоритм анализирует базу из 2 млн+ позиций и подбирает только те запчасти,
                которые гарантированно подойдут к вашему мотоциклу по VIN, году выпуска и рынку сбыта.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: 'CheckCircle', text: 'Проверка совместимости' },
                  { icon: 'Zap', text: 'Результат за 3 секунды' },
                  { icon: 'Shield', text: 'OEM и аналоги' },
                  { icon: 'RefreshCw', text: 'Возврат без вопросов' },
                ].map(f => (
                  <div key={f.text} className="flex items-center gap-2">
                    <Icon name={f.icon} size={16} className="text-orange-DEFAULT flex-shrink-0" />
                    <span className="spec-tag text-white">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-shrink-0">
              <button
                onClick={() => navigate('catalog')}
                className="group relative px-10 py-5 bg-orange-DEFAULT text-black font-oswald text-xl tracking-wider hover:bg-orange-400 transition-all clip-corner-lg"
              >
                ПОДОБРАТЬ ЗАПЧАСТИ
                <div className="mt-1 spec-tag text-black/70">по VIN или марке мотоцикла</div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-card py-10 mt-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-orange-DEFAULT clip-corner flex items-center justify-center">
              <Icon name="Wrench" size={12} className="text-black" />
            </div>
            <span className="font-oswald text-white tracking-wider">MOTOPARTS</span>
          </div>
          <div className="spec-tag text-steel-DEFAULT">© 2024 MOTOPARTS. Все права защищены.</div>
          <div className="flex items-center gap-4">
            {['О нас', 'Каталог', 'Контакты'].map(link => (
              <button key={link} className="spec-tag text-steel-DEFAULT hover:text-orange-DEFAULT transition-colors">
                {link.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}