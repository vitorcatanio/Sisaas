
import React from 'react';
import { 
  TrendingUp, TrendingDown, DollarSign, PieChart, Download, Calendar, 
  ArrowRightLeft, FileText, ChevronRight
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const DRE_DATA = [
  { label: 'Receita Operacional Bruta', value: 250000.00, type: 'primary' },
  { label: '(-) Deduções e Impostos', value: -45000.00, type: 'expense' },
  { label: '(=) Receita Líquida', value: 205000.00, type: 'total' },
  { label: '(-) CPV (Custo dos Produtos Vendidos)', value: -120000.00, type: 'expense' },
  { label: '(=) Lucro Bruto', value: 85000.00, type: 'total' },
  { label: '(-) Despesas Operacionais', value: -35000.00, type: 'expense' },
  { label: '(=) EBITDA', value: 50000.00, type: 'total' },
];

const CASHFLOW_CHART = [
  { month: 'Jan', ent: 45000, sai: 32000 },
  { month: 'Fev', ent: 52000, sai: 38000 },
  { month: 'Mar', ent: 48000, sai: 41000 },
  { month: 'Abr', ent: 61000, sai: 44000 },
  { month: 'Mai', ent: 55000, sai: 49000 },
  { month: 'Jun', ent: 67000, sai: 52000 },
];

export default function Finance() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Financeiro</h2>
          <p className="text-slate-500">Controle de caixa, contas a pagar e resultados (DRE).</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2.5 border border-slate-200 rounded-xl bg-white text-slate-600 hover:bg-slate-50">
            <Calendar size={20} />
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200">
            <Plus size={18} className="inline" /> Lançar Movimento
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-600 p-6 rounded-2xl text-white shadow-lg shadow-emerald-100">
          <div className="flex justify-between mb-4">
            <span className="p-2 bg-white/20 rounded-lg"><TrendingUp size={24} /></span>
            <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded">Contas a Receber</span>
          </div>
          <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest mb-1">Total Previsto</p>
          <h4 className="text-3xl font-bold">R$ 84.320,00</h4>
        </div>
        <div className="bg-rose-600 p-6 rounded-2xl text-white shadow-lg shadow-rose-100">
          <div className="flex justify-between mb-4">
            <span className="p-2 bg-white/20 rounded-lg"><TrendingDown size={24} /></span>
            <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded">Contas a Pagar</span>
          </div>
          <p className="text-rose-100 text-xs font-bold uppercase tracking-widest mb-1">Total Previsto</p>
          <h4 className="text-3xl font-bold">R$ 32.150,00</h4>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 border-b-4 border-b-blue-600 shadow-sm">
          <div className="flex justify-between mb-4">
            <span className="p-2 bg-blue-50 text-blue-600 rounded-lg"><DollarSign size={24} /></span>
            <span className="text-xs font-bold text-slate-400 px-2 py-1 rounded bg-slate-50">Saldo Disponível</span>
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Caixa Geral</p>
          <h4 className="text-3xl font-bold text-slate-900">R$ 156.900,00</h4>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <PieChart size={20} className="text-blue-600" /> Fluxo de Caixa
            </h3>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                <span className="w-2.5 h-2.5 bg-blue-600 rounded-full"></span> Entradas
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                <span className="w-2.5 h-2.5 bg-slate-300 rounded-full"></span> Saídas
              </div>
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CASHFLOW_CHART}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="ent" fill="#2563eb" radius={[4, 4, 0, 0]} />
                <Bar dataKey="sai" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText size={20} className="text-slate-900" /> Demonstração de Resultado (DRE)
            </h3>
            <button className="text-blue-600 hover:text-blue-800 transition-colors">
              <Download size={20} />
            </button>
          </div>
          <div className="p-2 flex-1 overflow-y-auto max-h-[300px]">
            <table className="w-full">
              <tbody>
                {DRE_DATA.map((row, idx) => (
                  <tr key={idx} className={`group hover:bg-slate-50 transition-colors ${row.type === 'total' ? 'bg-slate-50 font-bold' : ''}`}>
                    <td className="px-4 py-4 text-sm text-slate-600">{row.label}</td>
                    <td className={`px-4 py-4 text-sm text-right font-mono ${row.value < 0 ? 'text-rose-600' : 'text-slate-900'}`}>
                      R$ {row.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 border-t border-slate-100 bg-blue-50/30 rounded-b-2xl">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Lucro Líquido Final</p>
                <p className="text-2xl font-black text-blue-700">R$ 41.500,00</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Margem Líquida</p>
                <p className="text-xl font-bold text-emerald-600">16.6%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
