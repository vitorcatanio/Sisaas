
import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, Users, Package, AlertCircle, ShoppingBag, 
  ArrowUpRight, ArrowDownRight, Sparkles, BrainCircuit, RefreshCw
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const MOCK_DATA = [
  { name: 'Seg', vendas: 4200, custo: 2100 },
  { name: 'Ter', vendas: 3800, custo: 1900 },
  { name: 'Qua', vendas: 2500, custo: 8500 },
  { name: 'Qui', vendas: 4100, custo: 3200 },
  { name: 'Sex', vendas: 5900, custo: 4100 },
  { name: 'Sab', vendas: 3100, custo: 3000 },
  { name: 'Dom', vendas: 2400, custo: 1800 },
];

const KpiCard = ({ title, value, change, icon: Icon, color }: any) => (
  <div className="group bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
    <div className="flex justify-between items-start mb-6">
      <div className={`p-4 rounded-2xl ${color} bg-opacity-10 group-hover:scale-110 transition-transform`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
      </div>
      <div className={`flex items-center gap-1 text-xs font-black ${change >= 0 ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'} px-2 py-1 rounded-full`}>
        {change >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {Math.abs(change)}%
      </div>
    </div>
    <div>
      <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{title}</p>
      <h3 className="text-2xl font-black text-slate-900 tracking-tight">{value}</h3>
    </div>
  </div>
);

export default function Dashboard() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);

  const generateAiInsight = async () => {
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analise estes dados de uma distribuidora e dê um insight curto e estratégico em português:
        Vendas hoje: R$ 142k (+12%)
        Novos Clientes: 48 (+8%)
        Estoque: 1204 itens (-2%)
        Alertas: 4 produtos abaixo do estoque mínimo.
        O foco deve ser em maximizar lucro ou gerenciar estoque.`
      });
      setAiInsight(response.text);
    } catch (err) {
      setAiInsight("Dica: Foque em repor os filtros de óleo, a demanda aumentou 15% esta semana.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            Dashboard <span className="text-xs font-bold bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full uppercase tracking-widest">Real-Time</span>
          </h2>
          <p className="text-slate-500 font-medium">Bom dia, Ricardo. Sua distribuidora está performando acima da média.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition-all">
            Relatórios
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 rounded-2xl text-sm font-bold text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all">
            <TrendingUp size={18} /> Exportar Dados
          </button>
        </div>
      </header>

      {/* AI Insights Bar */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-[2rem] p-6 text-white shadow-2xl shadow-indigo-200 overflow-hidden relative group">
        <div className="absolute top-0 right-0 -m-8 opacity-10 group-hover:scale-110 transition-transform duration-1000">
          <BrainCircuit size={200} />
        </div>
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
              <Sparkles className="text-amber-300 animate-pulse" size={28} />
            </div>
            <div className="max-w-xl">
              <h4 className="font-bold text-lg mb-1 flex items-center gap-2">Gemini AI Insights</h4>
              <p className="text-indigo-100 text-sm leading-relaxed">
                {isAnalyzing ? "Analisando padrões de mercado e estoque..." : aiInsight || "Clique para gerar uma análise preditiva baseada nos dados atuais."}
              </p>
            </div>
          </div>
          <button 
            onClick={generateAiInsight}
            disabled={isAnalyzing}
            className={`px-8 py-3 bg-white text-indigo-700 rounded-2xl font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2 whitespace-nowrap ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isAnalyzing ? <RefreshCw className="animate-spin" size={18} /> : <BrainCircuit size={18} />}
            Analisar Agora
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Faturamento/Mês" value="R$ 142.340" change={12.5} icon={ShoppingBag} color="bg-indigo-600" />
        <KpiCard title="Carteira Clientes" value="1.240" change={8.2} icon={Users} color="bg-blue-600" />
        <KpiCard title="Giro de Estoque" value="1.204" change={-2.4} icon={Package} color="bg-amber-600" />
        <KpiCard title="Lucratividade" value="28.4%" change={1.2} icon={TrendingUp} color="bg-emerald-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-200/60 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-black text-slate-900">Performance Comercial</h3>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Volume de Vendas vs Custo</p>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button className="px-4 py-1.5 text-xs font-bold text-indigo-600 bg-white rounded-lg shadow-sm">Dia</button>
              <button className="px-4 py-1.5 text-xs font-bold text-slate-500">Semana</button>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_DATA}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: '700'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: '700'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="vendas" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-200/60 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-2">
            <AlertCircle size={24} className="text-amber-500" />
            Risco de Ruptura
          </h3>
          <div className="space-y-5">
            {[
              { name: 'Óleo Motor 5W30', sku: 'LUB-102', stock: 12, min: 20, progress: 60 },
              { name: 'Filtro Ar Master', sku: 'FLT-004', stock: 5, min: 10, progress: 50 },
              { name: 'Pastilha Freio XP', sku: 'PST-992', stock: 2, min: 15, progress: 13 },
            ].map((item, idx) => (
              <div key={idx} className="group p-4 rounded-2xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{item.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-rose-600">{item.stock} un</p>
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${item.progress < 30 ? 'bg-rose-500' : 'bg-amber-500'}`} 
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-4 text-xs font-black text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-2xl transition-all uppercase tracking-[0.2em]">
            Gerar Pedido de Compra
          </button>
        </div>
      </div>
    </div>
  );
}
