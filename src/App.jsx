import React, { useState } from 'react';
import { useRouter } from './router/Router';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import MobileNav from './components/layout/MobileNav';
import Footer from './components/layout/Footer';
import AuthModal from './components/common/AuthModal';

// 12 Page Views
import HomePage from './pages/HomePage';
import MessagesPage from './pages/MessagesPage';
import CreateHubPage from './pages/CreateHubPage';
import CompanionCreatePage from './pages/CompanionCreatePage';
import CommunityPage from './pages/CommunityPage';
import PricingPage from './pages/PricingPage';
import TagExplorerPage from './pages/TagExplorerPage';
import AffiliatePage from './pages/AffiliatePage';
import SavedCompanionsPage from './pages/SavedCompanionsPage';
import UserProfilePage from './pages/UserProfilePage';
import DashboardPage from './pages/DashboardPage';
import DocsPage from './pages/DocsPage';

export default function App() {
  const { currentPath } = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Router dispatcher
  const renderPage = () => {
    // Normalise path (remove trailing slash unless root)
    const normalized = currentPath.length > 1 && currentPath.endsWith('/') 
      ? currentPath.slice(0, -1) 
      : currentPath;

    switch (normalized) {
      case '/':
        return <HomePage onOpenAuth={() => setIsAuthOpen(true)} />;
      case '/messages':
        return <MessagesPage />;
      case '/create':
        return <CreateHubPage />;
      case '/girls/create':
        return <CompanionCreatePage />;
      case '/community':
        return <CommunityPage />;
      case '/pricing':
        return <PricingPage />;
      case '/tag':
        return <TagExplorerPage />;
      case '/affiliate':
        return <AffiliatePage />;
      case '/user/saves/companions':
        return <SavedCompanionsPage />;
      case '/u/username':
        return <UserProfilePage />;
      case '/dashboard':
        return <DashboardPage />;
      case '/docs':
        return <DocsPage />;
      default:
        // Handle sub-paths or user paths like /u/...
        if (normalized.startsWith('/u/')) {
          return <UserProfilePage />;
        }
        return <HomePage onOpenAuth={() => setIsAuthOpen(true)} />;
    }
  };

  const isMessagesView = currentPath.startsWith('/messages');

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col antialiased selection:bg-[#ff4747]/30 selection:text-white">
      {/* 1. Persistent Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* 2. Main Content Wrapper (offset for desktop sidebar) */}
      <div className="flex-1 flex flex-col md:pl-[72px] transition-all">
        {/* Top Header */}
        <Header 
          onOpenSidebar={() => setIsSidebarOpen(true)} 
          onOpenAuth={() => setIsAuthOpen(true)} 
        />

        {/* Dynamic Page View */}
        <main className="flex-1 w-full">
          {renderPage()}
        </main>

        {/* Footer (omitted on full-height chat view) */}
        {!isMessagesView && <Footer />}
      </div>

      {/* 3. Mobile Bottom Navigation */}
      <MobileNav />

      {/* 4. Global Auth Modal */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
      />
    </div>
  );
}

