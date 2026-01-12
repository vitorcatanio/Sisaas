
import React, { useState } from 'react';
import { Package, Plus, Search, Filter, MoreVertical, ArrowDown, ArrowUp, Edit } from 'lucide-react';
import { Product } from '../types';

const MOCK_PRODUCTS: Product[] = [
  { id: '1', sku: 'PRD-001', name: 'Óleo Motor 5W30 Sintético', category: 'Lubrificantes', price: 45.90, cost: 28.50, stock: 150, minStock: 50, unit: 'UN' },
  { id: '2', sku: 'PRD-002', name: 'Filtro de Óleo Premium', category: 'Filtros', price: 22.50, cost: 12.00, stock: 85, minStock: 100, unit: 'UN' },
  { id: '3', sku: 'PRD-003', name: 'Fluido de Freio DOT4 500ml', category: 'Fluidos', price: 18.00, cost: 9.50, stock: 200, minStock: 50, unit: 'UN' },
  { id: '4', sku: 'PRD-004', name: 'Aditivo Radiador Pronto Uso', category: 'Arrefecimento', price: 35.00, cost: 19.00, stock: 42, minStock: 40, unit: 'L' },
];

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Estoque</h2>
          <p className="text-slate-500">Controle de entradas, saídas e produtos.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium">
            <ArrowDown size={18} />
            Entrada
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md">
            <Plus size={18} />
            Novo Produto
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar SKU, Nome ou Categoria..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-100">
            <Filter size={18} />
            Filtros
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4">SKU / Produto</th>
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4">Qtd Atual</th>
                <th className="px-6 py-4 text-right">Preço Venda</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_PRODUCTS.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                        <Package size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{product.name}</p>
                        <p className="text-xs text-slate-500 font-mono">{product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-md uppercase">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className={`text-sm font-bold ${product.stock <= product.minStock ? 'text-rose-600' : 'text-slate-900'}`}>
                        {product.stock} {product.unit}
                      </span>
                      <span className="text-[10px] text-slate-400">Min: {product.minStock}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-sm font-bold text-slate-900">R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  </td>
                  <td className="px-6 py-4">
                    {product.stock <= product.minStock ? (
                      <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-rose-100 text-rose-700">
                        Reposição
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                        Normal
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all opacity-0 group-hover:opacity-100">
                      <Edit size={18} />
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
