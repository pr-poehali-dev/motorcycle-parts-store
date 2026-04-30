import { useState } from 'react';
import { Page, Product } from '../App';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import Icon from '@/components/ui/icon';

interface Props {
  product: Product;
  navigate: (page: Page, product?: Product) => void;
  addToCart: (product: Product) => void;
}

export default function ProductPage({ product, navigate, addToCart }: Props) {
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'compat' | 'desc'>('specs');

  const related = PRODUCTS.filter(p =>
    p.id !== product.id && p.category === product.category
  ).slice(0, 3);

  return (
    <main className="pt-16 min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2">
          <button onClick={() => navigate('home')} className="spec-tag text-steel-DEFAULT hover:text-orange-DEFAULT transition-colors">ГЛАВНАЯ</button>
          <Icon name="ChevronRight" size={12} className="text-steel-DEFAULT" />
          <button onClick={() => navigate('catalog')} className="spec-tag text-steel-DEFAULT hover:text-orange-DEFAULT transition-colors">КАТАЛОГ</button>
          <Icon name="ChevronRight" size={12} className="text-steel-DEFAULT" />
          <span className="spec-tag text-orange-DEFAULT">{product.partNumber}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square bg-steel-dark overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Corner decorators */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-orange-DEFAULT" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-orange-DEFAULT" />

            {/* Stock */}
            <div className="absolute top-4 right-4">
              {product.inStock ? (
                <div className="flex items-center gap-1.5 bg-black/70 px-3 py-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="spec-tag text-green-400">В НАЛИЧИИ</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 bg-black/70 px-3 py-1.5">
                  <div className="w-2 h-2 rounded-full bg-steel-DEFAULT" />
                  <span className="spec-tag text-steel-DEFAULT">ПОД ЗАКАЗ</span>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            {/* Brand + Category */}
            <div className="flex items-center gap-3 mb-3">
              <span className="spec-tag text-orange-DEFAULT border border-orange-DEFAULT/40 px-2 py-0.5">{product.brand}</span>
              <span className="spec-tag text-steel-DEFAULT">{product.category}</span>
            </div>

            <h1 className="font-oswald text-4xl text-white leading-tight mb-2">{product.name}</h1>

            {/* Part number */}
            <div className="font-mono text-steel-DEFAULT text-sm mb-4">
              Артикул: <span className="text-orange-DEFAULT">{product.partNumber}</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(s => (
                  <Icon
                    key={s}
                    name="Star"
                    size={16}
                    className={s <= Math.round(product.rating) ? 'text-orange-DEFAULT fill-orange-DEFAULT' : 'text-steel-DEFAULT'}
                  />
                ))}
              </div>
              <span className="font-mono text-sm text-steel-DEFAULT">{product.rating} / 5.0</span>
              <span className="spec-tag text-steel-DEFAULT">({product.reviews} отзывов)</span>
            </div>

            {/* Quick specs */}
            <div className="grid grid-cols-2 gap-px bg-border mb-6">
              {Object.entries(product.specs).slice(0, 4).map(([key, val]) => (
                <div key={key} className="bg-card px-4 py-3">
                  <div className="spec-tag text-steel-DEFAULT mb-0.5">{key}</div>
                  <div className="font-mono text-white text-sm">{val}</div>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-end gap-4 mb-6">
              <div className="font-oswald text-5xl text-white">
                {product.price.toLocaleString('ru-RU')} ₽
              </div>
              {product.oldPrice && (
                <div>
                  <div className="font-mono text-steel-DEFAULT line-through text-lg">
                    {product.oldPrice.toLocaleString('ru-RU')} ₽
                  </div>
                  <div className="spec-tag text-green-400">
                    Экономия: {(product.oldPrice - product.price).toLocaleString('ru-RU')} ₽
                  </div>
                </div>
              )}
            </div>

            {/* Quantity + Add */}
            <div className="flex gap-3 mb-4">
              <div className="flex items-center border border-border">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-12 flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Icon name="Minus" size={14} className="text-steel-DEFAULT" />
                </button>
                <div className="w-12 h-12 flex items-center justify-center font-mono text-white">{qty}</div>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-10 h-12 flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Icon name="Plus" size={14} className="text-steel-DEFAULT" />
                </button>
              </div>

              <button
                onClick={() => addToCart(product)}
                disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center gap-3 py-3 font-oswald text-lg tracking-wider transition-all clip-corner ${
                  product.inStock
                    ? 'bg-orange-DEFAULT hover:bg-orange-400 text-white'
                    : 'bg-muted text-steel-DEFAULT cursor-not-allowed'
                }`}
              >
                <Icon name="ShoppingCart" size={20} />
                {product.inStock ? 'В КОРЗИНУ' : 'НЕДОСТУПНО'}
              </button>
            </div>

            {/* Delivery info */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: 'Truck', text: 'Доставка от 1 дня' },
                { icon: 'RefreshCw', text: 'Возврат 14 дней' },
                { icon: 'Shield', text: 'Гарантия 1 год' },
                { icon: 'Package', text: 'Оригинал' },
              ].map(f => (
                <div key={f.text} className="flex items-center gap-2 text-steel-DEFAULT">
                  <Icon name={f.icon} size={14} className="text-orange-DEFAULT" />
                  <span className="spec-tag">{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="mb-12">
          <div className="flex border-b border-border mb-6">
            {[
              { id: 'specs', label: 'СПЕЦИФИКАЦИИ' },
              { id: 'compat', label: 'СОВМЕСТИМОСТЬ' },
              { id: 'desc', label: 'ОПИСАНИЕ' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-6 py-3 spec-tag border-b-2 transition-colors -mb-px ${
                  activeTab === tab.id
                    ? 'border-orange-DEFAULT text-orange-DEFAULT'
                    : 'border-transparent text-steel-DEFAULT hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="bg-card flex items-center">
                  <div className="w-1 h-full bg-orange-DEFAULT/20 flex-shrink-0" />
                  <div className="flex-1 flex items-center justify-between px-4 py-3">
                    <span className="spec-tag text-steel-DEFAULT">{key}</span>
                    <span className="font-mono text-white text-sm">{val}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'compat' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="CheckCircle" size={16} className="text-orange-DEFAULT" />
                <span className="spec-tag text-white">ПРОВЕРЕННАЯ СОВМЕСТИМОСТЬ</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {product.compatibility.map(c => (
                  <div key={c} className="flex items-center gap-3 bg-card border border-border px-4 py-3">
                    <Icon name="Bike" size={14} className="text-orange-DEFAULT flex-shrink-0" />
                    <span className="font-mono text-sm text-white">{c}</span>
                  </div>
                ))}
              </div>
              <p className="spec-tag text-steel-DEFAULT mt-4">
                * Список может быть неполным. Уточняйте по VIN или у менеджера.
              </p>
            </div>
          )}

          {activeTab === 'desc' && (
            <div className="max-w-2xl">
              <p className="text-foreground leading-relaxed">{product.description}</p>
            </div>
          )}
        </div>

        {/* RELATED */}
        {related.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-6 bg-orange-DEFAULT" />
              <h2 className="font-oswald text-2xl text-white tracking-wider">ПОХОЖИЕ ЗАПЧАСТИ</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border">
              {related.map(p => (
                <ProductCard key={p.id} product={p} navigate={navigate} addToCart={addToCart} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}