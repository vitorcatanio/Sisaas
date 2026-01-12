
import React, { useState, useEffect } from 'react';
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
  X,
  ShieldCheck,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
import Logistics from './pages/Logistics';
import Finance from './pages/Finance';
import Fiscal from './pages/Fiscal';
import SaaSAdmin from './pages/SaaSAdmin';
import { Tenant, SubscriptionPlan } from './types';

// Mock Auth & Tenant Context (Simplified for SPA)
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
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      active 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </Link>
);

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => (
  <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 flex items-center justify-between px-6">
    <div className="flex items-center gap-4">
      <button onClick={toggleSidebar} className="lg:hidden text-slate-500">
        <Menu size={24} />
      </button>
      <div className="relative hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Buscar produtos, pedidos..." 
          className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
    </div>
    <div className="flex items-center gap-4">
      <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full">
        <Bell size={20} />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
      </button>
      <div className="h-8 w-px bg-slate-200 mx-2"></div>
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold text-slate-900 leading-tight">Admin User</p>
          <p className="text-xs text-slate-500">Gestor Pro</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border-2 border-blue-200">
          AD
        </div>
      </div>
    </div>
  </header>
);

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-blue-600 p-2 rounded-xl text-white">
              <TrendingUp size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Distribu<span className="text-blue-600">Flow</span></h1>
          </div>

          <nav className="space-y-1">
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Geral</p>
            <SidebarItem icon={LayoutDashboard} label="Dashboard" path="/" active={location.pathname === '/'} />
            <SidebarItem icon={Package} label="Estoque" path="/inventory" active={location.pathname === '/inventory'} />
            <SidebarItem icon={ShoppingCart} label="Vendas" path="/sales" active={location.pathname === '/sales'} />
            
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-6 mb-2">Operacional</p>
            <SidebarItem icon={Truck} label="Logística" path="/logistics" active={location.pathname === '/logistics'} />
            <SidebarItem icon={DollarSign} label="Financeiro" path="/finance" active={location.pathname === '/finance'} />
            <SidebarItem icon={FileText} label="Fiscal" path="/fiscal" active={location.pathname === '/fiscal'} />
            
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-6 mb-2">Gestão SaaS</p>
            <SidebarItem icon={Settings} label="Assinatura & SaaS" path="/saas" active={location.pathname === '/saas'} />
          </nav>
        </div>
        
        <div className="absolute bottom-0 w-full p-6 border-t border-slate-100">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium">
            <LogOut size={20} />
            <span>Sair do App</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 bg-slate-50">
        <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
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
