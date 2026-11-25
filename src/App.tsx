import { useState, useEffect, useCallback } from 'react';
import LandingPage from './components/LandingPage';
import CustomerDashboard from './components/CustomerDashboard';
import ArtistDashboard from './components/ArtistDashboard';
import RenterDashboard from './components/RenterDashboard';
import AuthModal from './components/AuthModal';
import SplashScreen from './components/SplashScreen';
import { AnimatePresence, LayoutGroup } from 'motion/react';
import { AppearanceProvider } from './lib/AppearanceContext';

type Role = 'visitor' | 'customer' | 'artist' | 'renter' | 'admin';

export default function App() {
  const [role, setRole] = useState<Role>('visitor');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [authMode, setAuthMode] = useState<any>(null);
  const [isSplashLogoTransition, setIsSplashLogoTransition] = useState(false);

  return (
    <AppearanceProvider isDark={isDark} onThemeChange={setIsDark}>
      <LayoutGroup id="stagelink-brand">
        <AnimatePresence>
          {!isLoaded && <SplashScreen key="splash" onComplete={() => { setIsSplashLogoTransition(true); setIsLoaded(true); }} />}
        </AnimatePresence>
        {isLoaded && (
          <div className="theme-root min-h-screen">
            {role === 'visitor' ? (
              <>
                <LandingPage onAuth={setAuthMode} isDark={isDark} onThemeChange={setIsDark} isSplashLogoTransition={isSplashLogoTransition} />
                {authMode && <AuthModal initialMode={authMode} onClose={() => setAuthMode(null)} onSuccess={(r) => { setRole(r as Role); setAuthMode(null); }} />}
              </>
            ) : (
              role === 'customer' ? <CustomerDashboard onOpenBooking={() => {}} onOpenPayments={() => {}} onOpenChat={() => {}} onGoToLanding={() => setRole('visitor')} /> : role === 'artist' ? <ArtistDashboard onOpenWorkspace={() => {}} onGoToLanding={() => setRole('visitor')} /> : <RenterDashboard onOpenWorkspace={() => {}} onGoToLanding={() => setRole('visitor')} />
            )}
          </div>
        )}
      </LayoutGroup>
    </AppearanceProvider>
  );
}
