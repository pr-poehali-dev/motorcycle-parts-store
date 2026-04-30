import { useState } from 'react';
import Icon from '@/components/ui/icon';

const CONTACTS = [
  { icon: 'Phone', label: 'Телефон', value: '+7 (495) 000-00-00', sub: 'Пн-Вс с 9:00 до 21:00' },
  { icon: 'Mail', label: 'Email', value: 'info@motoparts.ru', sub: 'Ответим в течение часа' },
  { icon: 'MapPin', label: 'Склад и самовывоз', value: 'Москва, ул. Промышленная, 12', sub: 'Пн-Сб 10:00–19:00' },
  { icon: 'MessageCircle', label: 'WhatsApp/Telegram', value: '+7 (916) 000-00-00', sub: 'Быстрый ответ' },
];

export default function ContactsPage() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="pt-16 min-h-screen">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-orange-DEFAULT" />
            <div>
              <h1 className="font-oswald text-3xl text-white tracking-wider">КОНТАКТЫ</h1>
              <p className="spec-tag text-steel-DEFAULT">Мы на связи каждый день</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contacts list */}
          <div className="space-y-4">
            <div className="space-y-3">
              {CONTACTS.map(c => (
                <div key={c.label} className="bg-card border border-border p-5 flex gap-4 hover:border-orange-DEFAULT transition-colors group">
                  <div className="w-10 h-10 border border-border group-hover:border-orange-DEFAULT flex items-center justify-center flex-shrink-0 transition-colors">
                    <Icon name={c.icon} size={18} className="text-orange-DEFAULT" />
                  </div>
                  <div>
                    <div className="spec-tag text-steel-DEFAULT mb-0.5">{c.label}</div>
                    <div className="font-oswald text-white text-lg">{c.value}</div>
                    <div className="spec-tag text-steel-DEFAULT">{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Working hours */}
            <div className="bg-card border border-border p-6">
              <div className="spec-tag text-orange-DEFAULT mb-4 flex items-center gap-2">
                <Icon name="Clock" size={12} />
                РЕЖИМ РАБОТЫ
              </div>
              <div className="space-y-2">
                {[
                  { days: 'Пн – Пт', time: '09:00 – 21:00' },
                  { days: 'Суббота', time: '10:00 – 19:00' },
                  { days: 'Воскресенье', time: '11:00 – 18:00' },
                ].map(row => (
                  <div key={row.days} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                    <span className="spec-tag text-steel-DEFAULT">{row.days}</span>
                    <span className="font-mono text-white text-sm">{row.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card border border-border p-8">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                <div className="w-16 h-16 border-2 border-orange-DEFAULT flex items-center justify-center">
                  <Icon name="CheckCircle" size={28} className="text-orange-DEFAULT" />
                </div>
                <h2 className="font-oswald text-2xl text-white">СООБЩЕНИЕ ОТПРАВЛЕНО</h2>
                <p className="spec-tag text-steel-DEFAULT">Мы свяжемся с вами в ближайшее время</p>
                <button
                  onClick={() => setSent(false)}
                  className="px-6 py-2 border border-border text-steel-DEFAULT spec-tag hover:border-orange-DEFAULT hover:text-orange-DEFAULT transition-colors"
                >
                  ОТПРАВИТЬ ЕЩЁ
                </button>
              </div>
            ) : (
              <>
                <div className="spec-tag text-orange-DEFAULT mb-6 flex items-center gap-2">
                  <Icon name="Send" size={12} />
                  НАПИШИТЕ НАМ
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="spec-tag text-steel-DEFAULT block mb-1.5">ИМЯ</label>
                    <input
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Иван Иванов"
                      className="w-full bg-background border border-border focus:border-orange-DEFAULT outline-none px-4 py-3 text-white placeholder-steel-DEFAULT text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="spec-tag text-steel-DEFAULT block mb-1.5">ТЕЛЕФОН</label>
                    <input
                      required
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      placeholder="+7 (999) 000-00-00"
                      className="w-full bg-background border border-border focus:border-orange-DEFAULT outline-none px-4 py-3 text-white placeholder-steel-DEFAULT text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="spec-tag text-steel-DEFAULT block mb-1.5">СООБЩЕНИЕ</label>
                    <textarea
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Подберите запчасти для Honda CBR 600 2009 года..."
                      rows={5}
                      className="w-full bg-background border border-border focus:border-orange-DEFAULT outline-none px-4 py-3 text-white placeholder-steel-DEFAULT text-sm transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-orange-DEFAULT text-white font-oswald text-lg tracking-wider hover:bg-orange-400 transition-colors clip-corner"
                  >
                    ОТПРАВИТЬ СООБЩЕНИЕ
                  </button>
                  <p className="spec-tag text-steel-DEFAULT text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}