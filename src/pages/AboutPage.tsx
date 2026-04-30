import { Page } from '../App';
import Icon from '@/components/ui/icon';

const ABOUT_IMG = 'https://cdn.poehali.dev/projects/d94a8c6b-10ab-422d-badd-0b7a5301cf25/files/5b7a1366-7892-4a66-9698-fe011c4a62b4.jpg';

interface Props {
  navigate: (page: Page) => void;
}

const TEAM = [
  { name: 'Алексей Громов', role: 'Основатель & CEO', exp: '20 лет в мотоиндустрии' },
  { name: 'Дмитрий Орлов', role: 'Технический директор', exp: 'Мастер спорта по мотогонкам' },
  { name: 'Елена Соколова', role: 'Руководитель склада', exp: '12 лет в логистике' },
];

const VALUES = [
  { icon: 'Shield', title: 'Только оригинал', desc: 'Прямые контракты с производителями. Никаких подделок.' },
  { icon: 'Cpu', title: 'Умный подбор', desc: 'Алгоритм совместимости на базе 2 млн+ позиций.' },
  { icon: 'Clock', title: 'Оперативность', desc: 'Отправка в день заказа для позиций в наличии.' },
  { icon: 'Headphones', title: 'Экспертная поддержка', desc: 'Команда механиков на связи с 9:00 до 21:00.' },
];

export default function AboutPage({ navigate }: Props) {
  return (
    <main className="pt-16 min-h-screen">
      {/* Hero */}
      <section className="relative h-64 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ABOUT_IMG})` }}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative h-full flex items-center max-w-7xl mx-auto px-4">
          <div>
            <div className="spec-tag text-orange-DEFAULT mb-2 flex items-center gap-2">
              <div className="w-6 h-px bg-orange-DEFAULT" />
              О КОМПАНИИ
            </div>
            <h1 className="font-oswald text-5xl text-white tracking-wider">MOTOPARTS</h1>
            <p className="font-mono text-steel-DEFAULT text-sm mt-1">Москва · с 2012 года</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        {/* Story */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-orange-DEFAULT" />
              <h2 className="font-oswald text-3xl text-white tracking-wider">НАША ИСТОРИЯ</h2>
            </div>
            <p className="text-foreground leading-relaxed mb-4">
              Мы начали в 2012 году как небольшой сервис для гонщиков, которым надоело ждать месяцами
              нужные запчасти. Сегодня MOTOPARTS — федеральный поставщик с собственным складом в Москве,
              отгружающий более 500 заказов в день.
            </p>
            <p className="text-steel-DEFAULT leading-relaxed font-sans">
              Каждая деталь проходит контроль подлинности. Мы работаем только с авторизованными
              дистрибьюторами ведущих мировых брендов: Brembo, EBC, NGK, K&N, DID и других.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-px bg-border">
            {[
              { val: '2012', label: 'Год основания' },
              { val: '50 000+', label: 'Артикулов' },
              { val: '120 000+', label: 'Выполненных заказов' },
              { val: '98%', label: 'Рейтинг клиентов' },
            ].map(s => (
              <div key={s.label} className="bg-card p-6 text-center">
                <div className="font-oswald text-3xl text-orange-DEFAULT mb-1">{s.val}</div>
                <div className="spec-tag text-steel-DEFAULT">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-6 bg-orange-DEFAULT" />
            <h2 className="font-oswald text-3xl text-white tracking-wider">НАШИ ПРИНЦИПЫ</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {VALUES.map(v => (
              <div key={v.title} className="bg-card p-6">
                <div className="w-10 h-10 border border-border flex items-center justify-center mb-4">
                  <Icon name={v.icon} size={18} className="text-orange-DEFAULT" />
                </div>
                <div className="font-oswald text-white mb-2">{v.title}</div>
                <div className="spec-tag text-steel-DEFAULT leading-relaxed">{v.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-6 bg-orange-DEFAULT" />
            <h2 className="font-oswald text-3xl text-white tracking-wider">КОМАНДА</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border">
            {TEAM.map(member => (
              <div key={member.name} className="bg-card p-6">
                <div className="w-12 h-12 bg-steel-dark border border-border flex items-center justify-center mb-4">
                  <Icon name="User" size={20} className="text-orange-DEFAULT" />
                </div>
                <div className="font-oswald text-white text-lg mb-1">{member.name}</div>
                <div className="spec-tag text-orange-DEFAULT mb-1">{member.role}</div>
                <div className="spec-tag text-steel-DEFAULT">{member.exp}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border border-orange-DEFAULT/30 p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 stripe-pattern" />
          <div className="relative">
            <h2 className="font-oswald text-3xl text-white mb-3">ГОТОВЫ СДЕЛАТЬ ЗАКАЗ?</h2>
            <p className="spec-tag text-steel-DEFAULT mb-6">Более 50 000 запчастей в наличии</p>
            <button
              onClick={() => navigate('catalog')}
              className="px-10 py-4 bg-orange-DEFAULT text-black font-oswald text-xl tracking-wider hover:bg-orange-400 transition-colors clip-corner"
            >
              ПЕРЕЙТИ В КАТАЛОГ
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
