import React from 'react';
import { CmsProvider } from '../store/cmsStore.jsx';
import AdminPanel from './AdminPanel.jsx';

export default function AdminApp() {
  return (
    <CmsProvider>
      <AdminPanel />
    </CmsProvider>
  );
}