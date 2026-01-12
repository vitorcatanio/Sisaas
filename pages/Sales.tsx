
import React from 'react';
import { Search, Filter, MoreHorizontal, Download, Plus, Clock, CheckCircle, Truck, XCircle, ShoppingCart } from 'lucide-react';
import { Order } from '../types';

const MOCK_ORDERS: Order[] = [
  { id: 'ORD-2024-001', clientId: 'Auto Peças Silva', total: 1250.40, status: 'DELIVERED', createdAt: '2024-03-10T14:30:00Z', items: [] },
  { id: 'ORD-2024-002', clientId: 'Oficina Central', total: 840.00, status: 'SHIPPED', createdAt: '2024-03-11T09:15:00Z', items: [] },
  { id: 'ORD-2024-003', clientId: 'Frota Express', total: 3100.25, status: 'PENDING', createdAt: '2024-03-12T11:00:00Z', items: [] },
  { id: 'ORD-2024-004', clientId: 'Mecânica do Beto', total: 150.00, status: 'QUOTE', createdAt: '2024-03-12T16:45:00Z', items: [] },
];

const StatusBadge = ({ status }: { status: Order['status'] }) => {
  const configs = {
    QUOTE: { label: 'Orçamento', color: 'bg-slate-100 text-slate-500', icon: Clock },
    PENDING: { label: 'Em Separação', color: 'bg-amber-50 text-amber-600', icon: Clock },
    SHIPPED: { label: 'Em Trânsito', color: 'bg-blue-50 text-blue-600', icon: Truck },
    DELIVERED: { label: 'Faturado', color: 'bg-emerald-50 text-emerald-600', icon: CheckCircle },
    CANCELLED: { label: 'Cancelado', color: 'bg-rose-50 text-rose-600', icon: XCircle },
  };

  const { label, color, icon: Icon } = configs[status];

  return (
    <span className={`inline-flex items-center gap-2 py-1.5 px-4 rounded-full text-[10px] font-black uppercase tracking-widest ${color}`}>
      <Icon size={14} strokeWidth={3} />
      {label}
    </span>
  );
};

export default function Sales() {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Pedidos & Vendas</h2>
          <p className="text-slate-500 font-medium">Controle o ciclo de vida comercial desde o orçamento até a entrega.</p>
        </div>
        <button className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all font-bold shadow-xl shadow-indigo-100 scale-100 hover:scale-[1.02] active:scale-95">
          <Plus size={22} />
          Novo Pedido (PDV)
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200/60 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Pesquisar ID, Cliente ou Vendedor..." 
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-white bg-white shadow-sm transition-all">
              <Filter size={18} />
              Filtrar
            </button>
            <button className="p-3.5 border border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 hover:bg-white bg-white shadow-sm transition-all">
              <Download size={22} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/80 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
              <tr>
                <th className="px-8 py-5">N° Pedido</th>
                <th className="px-8 py-5">Cliente</th>
                <th className="px-8 py-5">Data Emissão</th>
                <th className="px-8 py-5">Valor Total</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-indigo-50/30 transition-colors group">
                  <td className="px-8 py-6">
                    <span className="text-sm font-black text-indigo-600 font-mono tracking-tight">{order.id}</span>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-slate-900">{order.clientId}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Consumidor Final</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-medium text-slate-500">
                      {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-black text-slate-900 tracking-tight">R$ {order.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </td>
                  <td className="px-8 py-6">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-3 text-slate-300 hover:text-indigo-600 hover:bg-white hover:shadow-md rounded-2xl transition-all">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-400">Exibindo 4 de 1.450 pedidos</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-xs font-bold bg-white border border-slate-200 rounded-xl hover:bg-slate-50">Anterior</button>
            <button className="px-4 py-2 text-xs font-bold bg-white border border-slate-200 rounded-xl hover:bg-slate-50">Próximo</button>
          </div>
        </div>
      </div>
    </div>
  );
}
