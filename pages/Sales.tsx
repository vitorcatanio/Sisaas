
import React from 'react';
import { ShoppingCart, Search, Filter, MoreHorizontal, Download, Plus, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';
import { Order } from '../types';

const MOCK_ORDERS: Order[] = [
  { id: 'ORD-2024-001', clientId: 'Auto Peças Silva', total: 1250.40, status: 'DELIVERED', createdAt: '2024-03-10T14:30:00Z', items: [] },
  { id: 'ORD-2024-002', clientId: 'Oficina Central', total: 840.00, status: 'SHIPPED', createdAt: '2024-03-11T09:15:00Z', items: [] },
  { id: 'ORD-2024-003', clientId: 'Frota Express', total: 3100.25, status: 'PENDING', createdAt: '2024-03-12T11:00:00Z', items: [] },
  { id: 'ORD-2024-004', clientId: 'Mecânica do Beto', total: 150.00, status: 'QUOTE', createdAt: '2024-03-12T16:45:00Z', items: [] },
];

const StatusBadge = ({ status }: { status: Order['status'] }) => {
  const configs = {
    QUOTE: { label: 'Orçamento', color: 'bg-slate-100 text-slate-600', icon: Clock },
    PENDING: { label: 'Pendente', color: 'bg-amber-100 text-amber-600', icon: Clock },
    SHIPPED: { label: 'Enviado', color: 'bg-blue-100 text-blue-600', icon: Truck },
    DELIVERED: { label: 'Entregue', color: 'bg-emerald-100 text-emerald-600', icon: CheckCircle },
    CANCELLED: { label: 'Cancelado', color: 'bg-rose-100 text-rose-600', icon: XCircle },
  };

  const { label, color, icon: Icon } = configs[status];

  return (
    <span className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-bold ${color}`}>
      <Icon size={12} />
      {label}
    </span>
  );
};

export default function Sales() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Vendas e Pedidos</h2>
          <p className="text-slate-500">Acompanhe seus orçamentos e pedidos em tempo real.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-200">
          <Plus size={20} />
          Novo Pedido
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por Pedido ou Cliente..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-100 bg-white">
              <Filter size={18} />
              Filtrar
            </button>
            <button className="p-2.5 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-100 bg-white">
              <Download size={20} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">ID Pedido</th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Valor Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-5">
                    <span className="text-sm font-mono font-bold text-slate-900">{order.id}</span>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-700 font-medium">
                    {order.clientId}
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-500">
                    {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-bold text-slate-900">R$ {order.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </td>
                  <td className="px-6 py-5">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 text-slate-400 hover:bg-white hover:shadow rounded-lg transition-all">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
