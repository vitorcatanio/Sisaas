
import React from 'react';
import { FileCode, FileText, Send, XCircle, CheckCircle, Download, Search, AlertTriangle, ExternalLink } from 'lucide-react';
import { NFe } from '../types';

const MOCK_NFES: NFe[] = [
  { id: '1', orderId: 'ORD-2024-001', accessKey: '35240312345678901234567890123456789012345678', number: '1254', serie: '1', status: 'AUTHORIZED', xmlUrl: '#' },
  { id: '2', orderId: 'ORD-2024-002', accessKey: '35240312345678901234567890123456789012345679', number: '1255', serie: '1', status: 'AUTHORIZED', xmlUrl: '#' },
  { id: '3', orderId: 'ORD-2024-003', accessKey: '', number: '1256', serie: '1', status: 'DRAFT', xmlUrl: '#' },
];

export default function Fiscal() {
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Fiscal Brasil</h2>
          <p className="text-slate-500">Gestão de NF-e, CFOPs e obrigações fiscais.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50">
            <FileCode size={18} /> Exportar XML (Lote)
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200">
            <Send size={18} /> Transmitir Pendentes
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col gap-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Notas Autorizadas</span>
          <span className="text-xl font-bold text-slate-900">452</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col gap-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Notas em Digitação</span>
          <span className="text-xl font-bold text-amber-600">12</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col gap-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Falhas na Transmissão</span>
          <span className="text-xl font-bold text-rose-600">02</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col gap-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Certificado Digital</span>
          <span className="text-xs font-bold text-emerald-600">Válido até 12/2024</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50/50 border-b border-slate-200 flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por Chave de Acesso, N° Nota ou Pedido..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <select className="bg-white border border-slate-200 rounded-lg text-sm px-3 py-2 outline-none w-full sm:w-auto font-medium text-slate-600">
            <option>Todos os Status</option>
            <option>Autorizada</option>
            <option>Rascunho</option>
            <option>Cancelada</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/80 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
              <tr>
                <th className="px-6 py-4">N° / Série</th>
                <th className="px-6 py-4">Pedido Relacionado</th>
                <th className="px-6 py-4">Chave de Acesso</th>
                <th className="px-6 py-4">Status SEFAZ</th>
                <th className="px-6 py-4">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_NFES.map((nfe) => (
                <tr key={nfe.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <FileText size={18} className="text-slate-400" />
                      <span className="text-sm font-bold text-slate-900">{nfe.number} <span className="text-slate-400 font-normal">({nfe.serie})</span></span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">{nfe.orderId}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[11px] font-mono text-slate-400 truncate max-w-[150px] inline-block">
                      {nfe.accessKey || 'Não gerada'}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1.5">
                      {nfe.status === 'AUTHORIZED' ? (
                        <span className="flex items-center gap-1 py-1 px-2.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full">
                          <CheckCircle size={10} /> AUTORIZADA
                        </span>
                      ) : nfe.status === 'DRAFT' ? (
                        <span className="flex items-center gap-1 py-1 px-2.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full">
                          <AlertTriangle size={10} /> RASCUNHO
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 py-1 px-2.5 bg-rose-100 text-rose-700 text-[10px] font-bold rounded-full">
                          <XCircle size={10} /> CANCELADA
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-blue-600" title="DANFE">
                        <ExternalLink size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-blue-600" title="XML">
                        <Download size={18} />
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
