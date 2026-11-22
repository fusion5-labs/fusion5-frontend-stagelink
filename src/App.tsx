import { useState } from 'react';
import { AppearanceProvider } from './lib/AppearanceContext';

export default function App() {
  const [role, setRole] = useState<'visitor' | 'customer' | 'artist' | 'renter' | 'admin'>('visitor');
  return (
    <AppearanceProvider isDark={false} onThemeChange={() => {}}>
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
          StageLink Platform
        </h1>
        <p className="text-slate-400 mt-2">Connecting Customers, Artists & Renters for Live Events</p>
        <span className="mt-4 px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-sm">Initial Scaffolding</span>
      </div>
    </AppearanceProvider>
  );
}
