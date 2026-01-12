
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Truck, 
  DollarSign, 
  FileText, 
  Settings, 
  Bell, 
  Search, 
  LogOut,
  Menu,
  ChevronRight,
  TrendingUp,
  UserPlus
} from 'lucide-react';

import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
import Clients from './pages/Clients';
import Logistics from './pages/Logistics';
import Finance from './pages/Finance';
import Fiscal from './pages/Fiscal';
import SaaSAdmin from './pages/SaaSAdmin';
import { Tenant, SubscriptionPlan } from './types';

const MOCK_TENANT: Tenant = {
  id: 'tenant_123',
  name: 'Distribuidora Central Sul',
  cnpj: '12.345.678/0001-90',
  plan: SubscriptionPlan.PRO,
  trialEndsAt: '2025-12-31'
};

const SidebarItem = ({ icon: Icon, label, path, active }: { icon: any, label: string, path: string, active: boolean }) => (
  <Link 
    to={path}
    className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
      active 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
        : 'text-slate-500 hover:bg-white hover:text-indigo-600 hover:shadow-sm'
    }`}
  >
    <div className="flex items-center gap-3">
      <Icon size={20} strokeWidth={active ? 2.5 : 2} />
      <span className={`font-semibold text-sm ${active ? 'tracking-wide' : ''}`}>{label}</span>
    </div>
    {active && <ChevronRight size={14} />}
  </Link>
);

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => (
  <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 h-16 flex items-center justify-between px-8">
    <div className="flex items-center gap-4">
      <button onClick={toggleSidebar} className="lg:hidden text-slate-500 hover:bg-slate-100 p-2 rounded-lg">
        <Menu size={24} />
      </button>
      <div className="hidden md:flex items-center bg-slate-100/80 px-3 py-1.5 rounded-full border border-slate-200/50">
        <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-tighter mr-2 bg-indigo-50 px-2 py-0.5 rounded-full">Pro</span>
        <span className="text-xs font-semibold text-slate-600">{MOCK_TENANT.name}</span>
      </div>
    </div>
    
    <div className="flex items-center gap-6">
      <div className="relative hidden sm:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input 
          type="text" 
          placeholder="Comando rápido (Ctrl+K)" 
          className="pl-9 pr-4 py-2 bg-slate-100/50 border border-transparent rounded-xl text-sm w-48 lg:w-64 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <button className="relative p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="w-px h-6 bg-slate-200 mx-2"></div>
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">Ricardo Admin</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Gestor Master</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-indigo-100 shadow-lg group-hover:scale-105 transition-transform">
            RA
          </div>
        </div>
      </div>
    </div>
  </header>
);

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#fdfdfe] border-r border-slate-200/60 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-8 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-10">
            <div className="bg-indigo-600 w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-200">
              <TrendingUp size={24} />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Distribu<span className="text-indigo-600">Flow</span>
            </h1>
          </div>

          <nav className="flex-1 space-y-1.5 overflow-y-auto no-scrollbar">
            <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Principais</p>
            <SidebarItem icon={LayoutDashboard} label="Dashboard" path="/" active={location.pathname === '/'} />
            <SidebarItem icon={ShoppingCart} label="Vendas" path="/sales" active={location.pathname === '/sales'} />
            <SidebarItem icon={Package} label="Estoque" path="/inventory" active={location.pathname === '/inventory'} />
            <SidebarItem icon={Users} label="Clientes" path="/clients" active={location.pathname === '/clients'} />
            
            <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-8 mb-3">Operacional</p>
            <SidebarItem icon={Truck} label="Logística" path="/logistics" active={location.pathname === '/logistics'} />
            <SidebarItem icon={DollarSign} label="Financeiro" path="/finance" active={location.pathname === '/finance'} />
            <SidebarItem icon={FileText} label="Fiscal" path="/fiscal" active={location.pathname === '/fiscal'} />
            
            <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-8 mb-3">SaaS</p>
            <SidebarItem icon={Settings} label="Configurações" path="/saas" active={location.pathname === '/saas'} />
          </nav>
          
          <div className="mt-auto pt-8 border-t border-slate-100">
            <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all font-bold text-sm">
              <LogOut size={20} />
              <span>Sair da conta</span>
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scroll-smooth">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/logistics" element={<Logistics />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/fiscal" element={<Fiscal />} />
          <Route path="/saas" element={<SaaSAdmin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}
