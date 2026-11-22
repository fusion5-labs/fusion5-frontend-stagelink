import { useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react';
import { useAppearance } from '../lib/AppearanceContext';
import { Icon } from './Icons';
import '../signed-in-motion.css';

export type DashboardNav = { id: string; label: string; icon: ComponentType<{ className?: string }>; count?: number };

const identities = {
  customer: { title: 'Your backstage', name: 'Jordan Rivera', initials: 'JR', tag: 'Event organizer', note: 'Great nights start here.' },
};

export default function DashboardShell({ role, navItems, activeTab, onNavigate, onGoToLanding, children }: {
  role: keyof typeof identities; navItems: DashboardNav[]; activeTab: string;
  onNavigate: (tab: string) => void; onGoToLanding?: () => void; children: ReactNode;
}) {
  const { collapsed, toggleSidebar, isDark, onThemeChange } = useAppearance();
  const identity = identities[role] || identities.customer;
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <aside className={`transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} border-r border-slate-800 p-4 flex flex-col justify-between`}>
        <div>
          <div className="flex items-center gap-3 mb-8 cursor-pointer" onClick={onGoToLanding}>
            <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center font-bold text-lg">{identity.initials}</div>
            {!collapsed && <div><div className="font-semibold text-sm">{identity.name}</div><div className="text-xs text-slate-400">{identity.tag}</div></div>}
          </div>
          <nav className="space-y-1">
            {navItems.map(item => (
              <button key={item.id} onClick={() => onNavigate(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}>
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
        </div>
        <button onClick={toggleSidebar} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 text-xs flex items-center gap-2">
          <Icon.Sliders className="w-4 h-4" /> {!collapsed && 'Collapse'}
        </button>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
