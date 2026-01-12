
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { TrendingUp, Users, Package, AlertCircle, ShoppingBag, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const MOCK_DATA = [
  { name: 'Seg', vendas: 4000, custo: 2400 },
  { name: 'Ter', vendas: 3000, custo: 1398 },
  { name: 'Qua', vendas: 2000, custo: 9800 },
  { name: 'Qui', vendas: 2780, custo: 3908 },
  { name: 'Sex', vendas: 1890, custo: 4800 },
  { name: 'Sab', vendas: 2390, custo: 3800 },
  { name: 'Dom', vendas: 3490, custo: 4300 },
];

const KpiCard = ({ title, value, change, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium ${change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
        {change >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {Math.abs(change)}%
      </div>
    </div>
    <div>
      <p className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
    </div>
  </div>
);

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Visão Geral</h2>
          <p className="text-slate-500">Bem-vindo, aqui estão os números da sua distribuidora hoje.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
            Exportar Relatório
          </button>
          <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 shadow-lg shadow-blue-200">
            Nova Venda
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Vendas do Mês" value="R$ 142.340" change={12.5} icon={ShoppingBag} color="bg-blue-600" />
        <KpiCard title="Novos Clientes" value="48" change={8.2} icon={Users} color="bg-indigo-600" />
        <KpiCard title="Itens em Estoque" value="1.204" change={-2.4} icon={Package} color="bg-amber-600" />
        <KpiCard title="Margem Média" value="28.4%" change={1.2} icon={TrendingUp} color="bg-emerald-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900">Performance de Vendas</h3>
            <select className="bg-slate-100 border-none rounded-lg text-sm px-3 py-1 outline-none">
              <option>Últimos 7 dias</option>
              <option>Último mês</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_DATA}>
                <defs>
                  <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="vendas" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorVendas)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <AlertCircle size={20} className="text-amber-500" />
            Alertas de Estoque
          </h3>
          <div className="space-y-4">
            {[
              { name: 'Lubrificante 5W30', sku: 'LUB-102', stock: 12, min: 20 },
              { name: 'Filtro de Ar Master', sku: 'FLT-004', stock: 5, min: 10 },
              { name: 'Pastilha Freio XP', sku: 'PST-992', stock: 2, min: 15 },
              { name: 'Óleo Hidráulico 1L', sku: 'LUB-001', stock: 8, min: 30 },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-500">SKU: {item.sku}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-amber-600">{item.stock} un</p>
                  <p className="text-[10px] text-slate-400">Min: {item.min}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
            Ver Todos os Alertas
          </button>
        </div>
      </div>
    </div>
  );
}
