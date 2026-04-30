import { Product } from '../App';
import { Page } from '../App';
import Icon from '@/components/ui/icon';

interface Props {
  product: Product;
  navigate: (page: Page, product?: Product) => void;
  addToCart: (product: Product) => void;
}

export default function ProductCard({ product, navigate, addToCart }: Props) {
  return (
    <div className="group bg-card border border-border hover:border-orange-DEFAULT transition-all duration-300 flex flex-col">
      {/* Image */}
      <div
        className="relative overflow-hidden cursor-pointer aspect-[4/3] bg-steel-dark"
        onClick={() => navigate('product', product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        {/* Part number */}
        <div className="absolute bottom-3 left-3">
          <span className="spec-tag text-orange-DEFAULT bg-black/60 px-2 py-1">
            {product.partNumber}
          </span>
        </div>

        {/* Stock badge */}
        <div className="absolute top-3 right-3">
          {product.inStock ? (
            <span className="spec-tag text-black bg-orange-DEFAULT px-2 py-1">В НАЛИЧИИ</span>
          ) : (
            <span className="spec-tag text-white bg-steel-light px-2 py-1">ПОД ЗАКАЗ</span>
          )}
        </div>

        {/* Old price */}
        {product.oldPrice && (
          <div className="absolute top-3 left-3 bg-red-600 px-2 py-0.5">
            <span className="spec-tag text-white">
              -{Math.round((1 - product.price / product.oldPrice) * 100)}%
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="spec-tag text-steel-DEFAULT mb-1">{product.brand} / {product.category}</div>

        <h3
          className="font-oswald text-white text-lg leading-tight cursor-pointer hover:text-orange-DEFAULT transition-colors mb-3"
          onClick={() => navigate('product', product)}
        >
          {product.name}
        </h3>

        {/* Mini specs */}
        <div className="grid grid-cols-2 gap-1 mb-4">
          {Object.entries(product.specs).slice(0, 2).map(([key, val]) => (
            <div key={key} className="bg-muted px-2 py-1">
              <div className="spec-tag text-steel-DEFAULT">{key}</div>
              <div className="font-mono text-xs text-white">{val}</div>
            </div>
          ))}
        </div>

        {/* Compatibility preview */}
        <div className="mb-4 flex items-center gap-1.5">
          <Icon name="Link2" size={12} className="text-steel-DEFAULT flex-shrink-0" />
          <span className="spec-tag text-steel-DEFAULT truncate">
            {product.compatibility[0]}{product.compatibility.length > 1 ? ` +${product.compatibility.length - 1}` : ''}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(s => (
              <Icon
                key={s}
                name="Star"
                size={12}
                className={s <= Math.round(product.rating) ? 'text-orange-DEFAULT fill-orange-DEFAULT' : 'text-steel-DEFAULT'}
              />
            ))}
          </div>
          <span className="font-mono text-xs text-steel-DEFAULT">{product.rating} ({product.reviews})</span>
        </div>

        {/* Price & CTA */}
        <div className="mt-auto flex items-center justify-between">
          <div>
            <div className="font-oswald text-2xl text-white">
              {product.price.toLocaleString('ru-RU')} ₽
            </div>
            {product.oldPrice && (
              <div className="font-mono text-xs text-steel-DEFAULT line-through">
                {product.oldPrice.toLocaleString('ru-RU')} ₽
              </div>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className={`flex items-center gap-2 px-4 py-2 clip-corner transition-all ${
              product.inStock
                ? 'bg-orange-DEFAULT hover:bg-orange-400 text-black'
                : 'bg-muted text-steel-DEFAULT cursor-not-allowed'
            }`}
          >
            <Icon name="ShoppingCart" size={14} />
            <span className="spec-tag">{product.inStock ? 'В КОРЗИНУ' : 'ЗАКАЗАТЬ'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
