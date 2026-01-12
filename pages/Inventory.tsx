
import React, { useState } from 'react';
import { Package, Plus, Search, Filter, ArrowDown, Edit, X, Save } from 'lucide-react';
import { Product } from '../types';

const MOCK_PRODUCTS: Product[] = [
  { id: '1', sku: 'PRD-001', name: 'Óleo Motor 5W30 Sintético', category: 'Lubrificantes', price: 45.90, cost: 28.50, stock: 150, minStock: 50, unit: 'UN' },
  { id: '2', sku: 'PRD-002', name: 'Filtro de Óleo Premium', category: 'Filtros', price: 22.50, cost: 12.00, stock: 85, minStock: 100, unit: 'UN' },
  { id: '3', sku: 'PRD-003', name: 'Fluido de Freio DOT4 500ml', category: 'Fluidos', price: 18.00, cost: 9.50, stock: 200, minStock: 50, unit: 'UN' },
  { id: '4', sku: 'PRD-004', name: 'Aditivo Radiador Pronto Uso', category: 'Arrefecimento', price: 35.00, cost: 19.00, stock: 42, minStock: 40, unit: 'L' },
];

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Estoque & Catálogo</h2>
          <p className="text-slate-500 font-medium">Controle de entradas, saídas e gestão de ativos.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl hover:bg-slate-50 transition-all font-bold shadow-sm">
            <ArrowDown size={20} className="text-emerald-500" />
            Entrada de Lote
          </button>
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all font-bold shadow-xl shadow-indigo-100"
          >
            <Plus size={20} />
            Novo Produto
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200/60 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por SKU, Nome ou Categoria..." 
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200/60 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 border border-slate-200/60 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={18} />
            Categorias
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-[0.2em]">
              <tr>
                <th className="px-8 py-5">Item</th>
                <th className="px-8 py-5">Categoria</th>
                <th className="px-8 py-5">Qtd Disponível</th>
                <th className="px-8 py-5 text-right">Preço Sugerido</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_PRODUCTS.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold group-hover:scale-110 transition-transform">
                        <Package size={22} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{product.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono font-bold tracking-widest">{product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black rounded-full uppercase tracking-widest">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className={`text-sm font-black ${product.stock <= product.minStock ? 'text-rose-600' : 'text-slate-900'}`}>
                        {product.stock} <span className="text-[10px] text-slate-400 uppercase">{product.unit}</span>
                      </span>
                      <div className="w-20 h-1 bg-slate-100 rounded-full mt-2 overflow-hidden">
                        <div className={`h-full rounded-full ${product.stock <= product.minStock ? 'bg-rose-400' : 'bg-emerald-400'}`} style={{width: '60%'}}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <p className="text-sm font-black text-slate-900">R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  </td>
                  <td className="px-8 py-6">
                    {product.stock <= product.minStock ? (
                      <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-[10px] font-black bg-rose-50 text-rose-600 uppercase tracking-widest">
                        Ruptura
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-600 uppercase tracking-widest">
                        Saudável
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl shadow-sm transition-all opacity-0 group-hover:opacity-100">
                      <Edit size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simplified Modal Mockup */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-indigo-50/50">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                <div className="p-2 bg-indigo-600 text-white rounded-xl"><Plus size={24} /></div>
                Novo Produto
              </h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white rounded-full transition-colors text-slate-400">
                <X size={24} />
              </button>
            </div>
            <div className="p-8 grid grid-cols-2 gap-6">
              <div className="col-span-2 space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome do Produto</label>
                <input type="text" className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600" placeholder="Ex: Óleo de Transmissão X" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SKU / Código</label>
                <input type="text" className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl outline-none" placeholder="Ex: SKU-001" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Categoria</label>
                <select className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl outline-none">
                  <option>Lubrificantes</option>
                  <option>Filtros</option>
                  <option>Fluidos</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Preço de Venda (R$)</label>
                <input type="number" className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl outline-none" placeholder="0,00" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estoque Inicial</label>
                <input type="number" className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl outline-none" placeholder="0" />
              </div>
            </div>
            <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-4 text-sm font-bold text-slate-600 hover:bg-white border border-transparent hover:border-slate-200 rounded-2xl transition-all">Cancelar</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-4 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl shadow-xl shadow-indigo-100 flex items-center justify-center gap-2">
                <Save size={18} /> Salvar Produto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
