
import React from 'react';
import { ShieldCheck, CreditCard, Users, Zap, Calendar, ArrowRight, Check, History, Lock } from 'lucide-react';
import { SubscriptionPlan } from '../types';

export default function SaaSAdmin() {
  const currentPlan = SubscriptionPlan.PRO;

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl font-bold text-slate-900">Assinatura & Plano</h2>
        <p className="text-slate-500">Gerencie os limites do seu SaaS e faturamento.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Plan Status */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">ATIVO</span>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-blue-600 rounded-2xl text-white">
                <Zap size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 uppercase italic">DistribuFlow <span className="text-blue-600">PRO</span></h3>
                <p className="text-slate-500 font-medium">Seu plano atual para médias distribuidoras.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-y border-slate-100">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Renovação</span>
                <span className="text-sm font-bold text-slate-900">12 de Abril, 2024</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Valor Mensal</span>
                <span className="text-sm font-bold text-slate-900">R$ 249,90</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Método Pagto.</span>
                <span className="text-sm font-bold text-slate-900">Cartão •••• 4422</span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Uso dos Limites do Plano</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Produtos (1.204 / 5.000)</span>
                  <span>24%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full w-[24%] transition-all duration-1000"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Usuários (8 / 10)</span>
                  <span>80%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full w-[80%] transition-all duration-1000"></div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors">
                Alterar Plano
              </button>
              <button className="px-6 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors">
                Gerenciar Pagamento
              </button>
            </div>
          </div>

          {/* Audit Logs */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <History size={20} className="text-slate-400" /> Logs de Segurança & Acesso
              </h3>
              <button className="text-blue-600 text-xs font-bold hover:underline">Ver Histórico Completo</button>
            </div>
            <div className="divide-y divide-slate-50">
              {[
                { action: 'Login bem sucedido', user: 'admin@distribuidora.com', ip: '192.168.1.1', date: 'Hoje, 10:45' },
                { action: 'Alteração de Estoque (SKU-102)', user: 'operador_vendas', ip: '172.16.5.22', date: 'Hoje, 09:12' },
                { action: 'Exportação de Relatório Fiscal', user: 'financeiro_silva', ip: '189.10.122.4', date: 'Ontem, 16:30' },
              ].map((log, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between text-sm">
                  <div className="flex gap-3 items-center">
                    <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                      <Lock size={16} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{log.action}</p>
                      <p className="text-xs text-slate-400">{log.user} • {log.ip}</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{log.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upgrade Sidebar */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-700 to-blue-600 p-6 rounded-3xl text-white shadow-xl shadow-blue-100">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={24} className="text-amber-300" />
              <h4 className="font-bold">Upgrade p/ Enterprise</h4>
            </div>
            <p className="text-blue-100 text-sm mb-6 leading-relaxed">
              Desbloqueie usuários ilimitados, multi-filiais e suporte prioritário 24/7.
            </p>
            <ul className="space-y-3 mb-8">
              {['Relatórios personalizados IA', 'Integração com ERP Externo', 'Multifiliais ilimitadas'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-xs font-medium">
                  <div className="p-0.5 bg-blue-500 rounded-full"><Check size={10} /></div>
                  {item}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 bg-white text-blue-700 rounded-xl text-sm font-black hover:bg-blue-50 transition-all flex items-center justify-center gap-2 group">
              Falar com Consultor <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Users size={18} className="text-blue-600" /> Gestão Multi-Tenant
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">ID da Organização:</span>
                <span className="font-mono text-slate-900 font-bold">ORG-992384</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Filiais Conectadas:</span>
                <span className="font-bold text-slate-900">01 / 02</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Acesso via API:</span>
                <span className="text-emerald-600 font-bold">Ativado</span>
              </div>
            </div>
            <button className="w-full mt-6 py-2.5 border-2 border-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors uppercase tracking-widest">
              Configurações Avançadas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
