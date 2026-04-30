import { useState } from 'react';
import { CartItem, Page } from '../App';
import Icon from '@/components/ui/icon';

interface Props {
  cartItems: CartItem[];
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  navigate: (page: Page) => void;
}

type OrderStep = 'cart' | 'delivery' | 'confirm';

export default function CartPage({ cartItems, removeFromCart, updateQuantity, navigate }: Props) {
  const [step, setStep] = useState<OrderStep>('cart');
  const [form, setForm] = useState({
    name: '', phone: '', email: '', city: '', address: '', comment: '',
  });
  const [deliveryMethod, setDeliveryMethod] = useState<'courier' | 'pickup' | 'transport'>('courier');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryCost = deliveryMethod === 'pickup' ? 0 : deliveryMethod === 'courier' ? 490 : 350;
  const total = subtotal + deliveryCost;

  if (orderPlaced) {
    return (
      <main className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-20 h-20 mx-auto mb-6 border-2 border-orange-DEFAULT flex items-center justify-center animate-pulse-orange">
            <Icon name="CheckCircle" size={36} className="text-orange-DEFAULT" />
          </div>
          <h1 className="font-oswald text-4xl text-white mb-3">ЗАКАЗ ПРИНЯТ</h1>
          <p className="spec-tag text-orange-DEFAULT mb-2">НОМЕР ЗАКАЗА: #MP-{Math.floor(Math.random() * 90000) + 10000}</p>
          <p className="text-steel-DEFAULT font-sans mb-8">
            Менеджер свяжется с вами в течение 30 минут для подтверждения наличия и деталей доставки.
          </p>
          <button
            onClick={() => navigate('catalog')}
            className="px-8 py-3 bg-orange-DEFAULT text-black font-oswald tracking-wider hover:bg-orange-400 transition-colors clip-corner"
          >
            ПРОДОЛЖИТЬ ПОКУПКИ
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-16 min-h-screen">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 bg-orange-DEFAULT" />
            <h1 className="font-oswald text-2xl text-white tracking-wider">ОФОРМЛЕНИЕ ЗАКАЗА</h1>
          </div>

          {/* Steps */}
          <div className="flex items-center gap-3">
            {(['cart', 'delivery', 'confirm'] as OrderStep[]).map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <div className={`flex items-center gap-2 ${step === s ? 'text-orange-DEFAULT' : 'text-steel-DEFAULT'}`}>
                  <div className={`w-6 h-6 flex items-center justify-center text-xs font-mono border ${
                    step === s ? 'border-orange-DEFAULT bg-orange-DEFAULT text-black' : 'border-border'
                  }`}>
                    {i + 1}
                  </div>
                  <span className="spec-tag hidden sm:block">
                    {s === 'cart' ? 'КОРЗИНА' : s === 'delivery' ? 'ДОСТАВКА' : 'ПОДТВЕРЖДЕНИЕ'}
                  </span>
                </div>
                {i < 2 && <div className="w-8 h-px bg-border" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left */}
          <div className="lg:col-span-2 space-y-4">
            {step === 'cart' && (
              <>
                {cartItems.length === 0 ? (
                  <div className="text-center py-20">
                    <Icon name="ShoppingCart" size={48} className="text-steel-mid mx-auto mb-4" />
                    <p className="font-oswald text-white text-xl mb-2">КОРЗИНА ПУСТА</p>
                    <button
                      onClick={() => navigate('catalog')}
                      className="mt-4 px-8 py-3 bg-orange-DEFAULT text-black font-oswald tracking-wider hover:bg-orange-400 transition-colors"
                    >
                      В КАТАЛОГ
                    </button>
                  </div>
                ) : (
                  cartItems.map(item => (
                    <div key={item.id} className="bg-card border border-border p-4 flex gap-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="spec-tag text-orange-DEFAULT">{item.partNumber}</div>
                        <div className="font-oswald text-white">{item.name}</div>
                        <div className="spec-tag text-steel-DEFAULT">{item.brand}</div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-border">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-muted"
                            >
                              <Icon name="Minus" size={12} />
                            </button>
                            <span className="w-8 text-center font-mono text-sm text-white">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-muted"
                            >
                              <Icon name="Plus" size={12} />
                            </button>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-mono text-white">
                              {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                            </span>
                            <button onClick={() => removeFromCart(item.id)}>
                              <Icon name="Trash2" size={16} className="text-steel-DEFAULT hover:text-red-500 transition-colors" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </>
            )}

            {step === 'delivery' && (
              <div className="space-y-4">
                {/* Contact */}
                <div className="bg-card border border-border p-6">
                  <div className="spec-tag text-orange-DEFAULT mb-4">КОНТАКТНЫЕ ДАННЫЕ</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { key: 'name', label: 'Имя и фамилия', placeholder: 'Иван Иванов' },
                      { key: 'phone', label: 'Телефон', placeholder: '+7 (999) 000-00-00' },
                      { key: 'email', label: 'Email', placeholder: 'ivan@mail.ru' },
                      { key: 'city', label: 'Город', placeholder: 'Москва' },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="spec-tag text-steel-DEFAULT block mb-1">{f.label}</label>
                        <input
                          value={form[f.key as keyof typeof form]}
                          onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                          placeholder={f.placeholder}
                          className="w-full bg-background border border-border focus:border-orange-DEFAULT outline-none px-3 py-2 text-white text-sm placeholder-steel-DEFAULT transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery method */}
                <div className="bg-card border border-border p-6">
                  <div className="spec-tag text-orange-DEFAULT mb-4">СПОСОБ ДОСТАВКИ</div>
                  <div className="space-y-2">
                    {[
                      { id: 'courier', label: 'Курьером', desc: 'Доставка 1-3 дня', price: '490 ₽' },
                      { id: 'pickup', label: 'Самовывоз', desc: 'Москва, ул. Промышленная 12', price: 'Бесплатно' },
                      { id: 'transport', label: 'Транспортная компания', desc: 'СДЭК, Boxberry, ПЭК', price: 'от 350 ₽' },
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => setDeliveryMethod(opt.id as typeof deliveryMethod)}
                        className={`w-full text-left flex items-center gap-4 p-4 border transition-colors ${
                          deliveryMethod === opt.id
                            ? 'border-orange-DEFAULT bg-orange-DEFAULT/5'
                            : 'border-border hover:border-steel-DEFAULT'
                        }`}
                      >
                        <div className={`w-4 h-4 border-2 rounded-full flex items-center justify-center flex-shrink-0 ${
                          deliveryMethod === opt.id ? 'border-orange-DEFAULT' : 'border-steel-DEFAULT'
                        }`}>
                          {deliveryMethod === opt.id && (
                            <div className="w-2 h-2 rounded-full bg-orange-DEFAULT" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-oswald text-white">{opt.label}</div>
                          <div className="spec-tag text-steel-DEFAULT">{opt.desc}</div>
                        </div>
                        <div className="spec-tag text-orange-DEFAULT">{opt.price}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 'confirm' && (
              <div className="bg-card border border-border p-6">
                <div className="spec-tag text-orange-DEFAULT mb-4">ПРОВЕРЬТЕ ЗАКАЗ</div>
                <div className="space-y-3 mb-6">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-border">
                      <div>
                        <div className="font-oswald text-white text-sm">{item.name}</div>
                        <div className="spec-tag text-steel-DEFAULT">{item.partNumber} × {item.quantity}</div>
                      </div>
                      <div className="font-mono text-white">{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="spec-tag text-steel-DEFAULT">ДОСТАВКА</span>
                    <span className="font-mono text-white">{deliveryCost === 0 ? 'Бесплатно' : `${deliveryCost} ₽`}</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2">
                    <span className="spec-tag text-white">ИТОГО</span>
                    <span className="font-oswald text-orange-DEFAULT text-xl">{total.toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div>
            <div className="bg-card border border-border p-6 sticky top-20">
              <div className="spec-tag text-steel-DEFAULT mb-4">ИТОГО</div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="spec-tag text-steel-DEFAULT">Товаров: {cartItems.reduce((s, i) => s + i.quantity, 0)}</span>
                  <span className="font-mono text-white text-sm">{subtotal.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span className="spec-tag text-steel-DEFAULT">Доставка</span>
                  <span className="font-mono text-white text-sm">{deliveryCost === 0 ? 'Бесплатно' : `${deliveryCost} ₽`}</span>
                </div>
              </div>
              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="spec-tag text-steel-DEFAULT">К ОПЛАТЕ</span>
                  <span className="font-oswald text-2xl text-white">{total.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>

              {step === 'cart' && cartItems.length > 0 && (
                <button
                  onClick={() => setStep('delivery')}
                  className="w-full py-3 bg-orange-DEFAULT text-black font-oswald tracking-wider hover:bg-orange-400 transition-colors clip-corner"
                >
                  К ОФОРМЛЕНИЮ →
                </button>
              )}

              {step === 'delivery' && (
                <button
                  onClick={() => setStep('confirm')}
                  className="w-full py-3 bg-orange-DEFAULT text-black font-oswald tracking-wider hover:bg-orange-400 transition-colors clip-corner"
                >
                  ПРОВЕРИТЬ ЗАКАЗ →
                </button>
              )}

              {step === 'confirm' && (
                <button
                  onClick={() => setOrderPlaced(true)}
                  className="w-full py-3 bg-orange-DEFAULT text-black font-oswald tracking-wider hover:bg-orange-400 transition-colors clip-corner"
                >
                  ПОДТВЕРДИТЬ ЗАКАЗ
                </button>
              )}

              {step !== 'cart' && (
                <button
                  onClick={() => setStep(step === 'confirm' ? 'delivery' : 'cart')}
                  className="w-full mt-2 py-2 border border-border text-steel-DEFAULT spec-tag hover:border-orange-DEFAULT hover:text-orange-DEFAULT transition-colors"
                >
                  ← НАЗАД
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
