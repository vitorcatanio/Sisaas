
import React, { useState } from 'react';
import { Truck, MapPin, Camera, User, CheckCircle, Play, MoreVertical } from 'lucide-react';
import { LogisticsRecord } from '../types';

const MOCK_RECORDS: LogisticsRecord[] = [
  { id: 'LOG-001', orderId: 'ORD-2024-001', driverName: 'Carlos Oliveira', vehiclePlate: 'ABC-1234', status: 'DELIVERED', deliveredAt: '2024-03-12T10:00:00Z', photoUrl: 'https://picsum.photos/400/300' },
  { id: 'LOG-002', orderId: 'ORD-2024-002', driverName: 'Renato Silva', vehiclePlate: 'DEF-5678', status: 'IN_TRANSIT' },
  { id: 'LOG-003', orderId: 'ORD-2024-003', driverName: 'Carlos Oliveira', vehiclePlate: 'ABC-1234', status: 'PENDING' },
];

export default function Logistics() {
  const [activeTab, setActiveTab] = useState<'DELIVERIES' | 'VEHICLES' | 'DRIVERS'>('DELIVERIES');

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Logística</h2>
          <p className="text-slate-500">Gerencie frotas, motoristas e entregas em tempo real.</p>
        </div>
        <div className="flex bg-white p-1 border border-slate-200 rounded-xl">
          <button 
            onClick={() => setActiveTab('DELIVERIES')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'DELIVERIES' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Entregas
          </button>
          <button 
            onClick={() => setActiveTab('VEHICLES')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'VEHICLES' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Veículos
          </button>
          <button 
            onClick={() => setActiveTab('DRIVERS')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'DRIVERS' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Motoristas
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Em Trânsito</p>
          <h4 className="text-3xl font-bold text-slate-900">08</h4>
          <div className="mt-4 flex items-center gap-2 text-emerald-600 text-sm font-medium">
            <Truck size={16} /> <span>3 veículos em rota ativa</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Entregas Hoje</p>
          <h4 className="text-3xl font-bold text-slate-900">24</h4>
          <div className="mt-4 flex items-center gap-2 text-blue-600 text-sm font-medium">
            <CheckCircle size={16} /> <span>85% de conclusão</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Custo Médio/KM</p>
          <h4 className="text-3xl font-bold text-slate-900">R$ 2,45</h4>
          <div className="mt-4 flex items-center gap-2 text-slate-500 text-sm font-medium">
            <MapPin size={16} /> <span>Região Metropolitana</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {MOCK_RECORDS.map((record) => (
          <div key={record.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-blue-300 transition-colors">
            <div className="p-5 flex items-start justify-between">
              <div className="flex gap-4">
                <div className={`p-4 rounded-2xl ${record.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-600' : record.status === 'IN_TRANSIT' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'}`}>
                  <Truck size={32} />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 leading-tight">Entrega {record.orderId}</h5>
                  <p className="text-sm text-slate-500 mb-2">{record.driverName} • {record.vehiclePlate}</p>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${record.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-700' : record.status === 'IN_TRANSIT' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                      {record.status === 'DELIVERED' ? 'Concluída' : record.status === 'IN_TRANSIT' ? 'Em Rota' : 'Pendente'}
                    </span>
                    {record.deliveredAt && (
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <CheckCircle size={12} /> {new Date(record.deliveredAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button className="text-slate-400 hover:text-slate-900">
                <MoreVertical size={20} />
              </button>
            </div>
            
            <div className="px-5 pb-5 flex gap-2">
              {record.status === 'IN_TRANSIT' ? (
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-100">
                  <Camera size={18} /> Registrar Foto & Entrega
                </button>
              ) : record.status === 'PENDING' ? (
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100">
                  <Play size={18} /> Iniciar Rota
                </button>
              ) : (
                <div className="w-full flex gap-3">
                  <button className="flex-1 py-2 text-sm font-semibold border border-slate-200 rounded-xl hover:bg-slate-50">Ver Comprovante</button>
                  <button className="flex-1 py-2 text-sm font-semibold border border-slate-200 rounded-xl hover:bg-slate-50">Localização</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
