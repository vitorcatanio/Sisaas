
import React, { useState } from 'react';
import { Users, Search, Filter, Plus, Mail, Phone, MoreVertical, ExternalLink, UserCheck } from 'lucide-react';
import { Client } from '../types';

const MOCK_CLIENTS: Client[] = [
  { id: '1', name: 'Auto Peças Silva Ltda', cnpj_cpf: '12.345.678/0001-90', email: 'contato@autopeças.com.br', phone: '(11) 98877-6655' },
  { id: '2', name: 'Oficina Central de Reparos', cnpj_cpf: '98.765.432/0001-21', email: 'vendas@central.com', phone: '(21) 2233-4455' },
  { id: '3', name: 'Frota Express S.A.', cnpj_cpf: '45.678.901/0001-33', email: 'logistica@express.com.br', phone: '(31) 3344-5566' },
  { id: '4', name: 'Mecânica do Beto', cnpj_cpf: '123.456.789-00', email: 'beto@gmail.com', phone: '(41) 99988-7766' },
];

export default function Clients() {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Clientes</h2>
          <p className="text-slate-500 font-medium">Gestão completa da sua base de compradores.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all font-bold shadow-xl shadow-indigo-100">
          <Plus size={20} />
          Cadastrar Cliente
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl"><Users size={24} /></div>
          <div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Total Ativos</p>
            <p className="text-2xl font-bold text-slate-900">1.240</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl"><UserCheck size={24} /></div>
          <div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Retenção</p>
            <p className="text-2xl font-bold text-slate-900">92%</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl"><Plus size={24} /></div>
          <div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Novos (30 dias)</p>
            <p className="text-2xl font-bold text-slate-900">+48</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Nome, CNPJ, Email..." 
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-3 border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={18} />
            Filtros Avançados
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-[0.15em]">
              <tr>
                <th className="px-8 py-5">Identificação</th>
                <th className="px-8 py-5">Documento</th>
                <th className="px-8 py-5">Contato</th>
                <th className="px-8 py-5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_CLIENTS.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{client.name}</p>
                        <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider">Cliente VIP</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-mono text-slate-500">{client.cnpj_cpf}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Mail size={12} className="text-slate-300" /> {client.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Phone size={12} className="text-slate-300" /> {client.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg shadow-sm">
                        <ExternalLink size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg shadow-sm">
                        <MoreVertical size={18} />
                      </button>
                    </div>
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
