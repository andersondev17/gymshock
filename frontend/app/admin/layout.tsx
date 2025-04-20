'use client';

import Header from '@/components/admin/Header';
import Sidebar from '@/components/admin/Sidebar';
import { LoadingBar } from '@/components/ui/LoadingBar';
import { LoadingProvider, useLoading } from '@/context/LoadingContext';
import { ReactNode } from 'react';

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { isLoading } = useLoading();

  return (
    <LoadingProvider>
      <main className='flex min-h-screen bg-slate-50'>
        <Sidebar />
        <div className='flex flex-col flex-1 overflow-x-hidden'>
          <Header />
          {isLoading && <LoadingBar />}
          <div className='flex-1 p-6'>
            {children}
          </div>
        </div>
      </main>
    </LoadingProvider>
  );
}
export default AdminLayout;