import React from 'react';
import { CmsProvider } from '../store/cmsStore.jsx';
import Navbar from './Navbar.jsx';
import NewsFeed from './NewsFeed.jsx';
import Sidebar from './Sidebar.jsx';
import Footer from './Footer.jsx';

export default function HomeApp() {
  return (
    <CmsProvider>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 min-w-0">
            <NewsFeed />
          </div>
          <aside className="w-full lg:w-80 shrink-0 lg:self-start">
            <Sidebar />
          </aside>
        </div>
      </main>
      <Footer />
    </CmsProvider>
  );
}