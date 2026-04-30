import { CartItem, Page } from '../App';
import Icon from '@/components/ui/icon';

interface Props {
  open: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  navigate: (page: Page) => void;
}

export default function CartSidebar({ open, onClose, cartItems, removeFromCart, updateQuantity, navigate }: Props) {
  const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="font-oswald text-xl text-white tracking-wider">КОРЗИНА</h2>
            <span className="spec-tag text-steel-DEFAULT">{cartItems.length} позиций</span>
          </div>
          <button onClick={onClose} className="p-2 hover:text-orange-DEFAULT transition-colors">
            <Icon name="X" size={20} className="text-steel-DEFAULT" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
              <Icon name="ShoppingCart" size={48} className="text-steel-mid" />
              <div>
                <p className="font-oswald text-white text-lg">КОРЗИНА ПУСТА</p>
                <p className="spec-tag text-steel-DEFAULT mt-1">Добавьте запчасти из каталога</p>
              </div>
              <button
                onClick={() => { navigate('catalog'); onClose(); }}
                className="px-6 py-3 bg-orange-DEFAULT text-black font-oswald tracking-wider hover:bg-orange-400 transition-colors"
              >
                ПЕРЕЙТИ В КАТАЛОГ
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex gap-3 bg-background p-3 border border-border">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="spec-tag text-orange-DEFAULT">{item.partNumber}</div>
                  <div className="font-oswald text-white text-sm leading-tight truncate">{item.name}</div>
                  <div className="spec-tag text-steel-DEFAULT">{item.brand}</div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 bg-muted flex items-center justify-center hover:bg-orange-DEFAULT hover:text-black transition-colors"
                      >
                        <Icon name="Minus" size={10} />
                      </button>
                      <span className="font-mono text-sm text-white w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 bg-muted flex items-center justify-center hover:bg-orange-DEFAULT hover:text-black transition-colors"
                      >
                        <Icon name="Plus" size={10} />
                      </button>
                    </div>
                    <span className="font-mono text-sm text-white">
                      {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-1 h-fit hover:text-red-500 transition-colors"
                >
                  <Icon name="Trash2" size={14} className="text-steel-DEFAULT" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-border space-y-4">
            <div className="flex justify-between items-center">
              <span className="spec-tag text-steel-DEFAULT">ИТОГО</span>
              <span className="font-oswald text-2xl text-white">{total.toLocaleString('ru-RU')} ₽</span>
            </div>
            <button
              onClick={() => { navigate('cart'); onClose(); }}
              className="w-full py-3 bg-orange-DEFAULT text-black font-oswald text-lg tracking-wider hover:bg-orange-400 transition-colors"
            >
              ОФОРМИТЬ ЗАКАЗ
            </button>
          </div>
        )}
      </div>
    </>
  );
}
