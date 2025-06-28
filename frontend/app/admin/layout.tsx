'use client';

import Header from '@/components/admin/Header';
import Sidebar from '@/components/admin/Sidebar';
import { LoadingBar } from '@/components/ui/LoadingBar';
import { useAuth } from '@/context/AuthProvider';
import { LoadingProvider, useLoading } from '@/context/LoadingContext';
import { AlertTriangle, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { user, loading, isAdmin } = useAuth();
  const { isLoading } = useLoading();
  const router = useRouter();

  // ✅ RBAC Protection - Redirect non-admin users
  useEffect(() => {
    if (!loading && user && !isAdmin) {
      console.log('🚫 Non-admin user tried to access admin panel');
      router.push('/'); // Redirect to home
    }
  }, [user, loading, isAdmin, router]);

  // ✅ Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent mx-auto" />
          <p className="text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // ✅ Not Authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-6 max-w-md mx-auto p-8">
          <div className="bg-white rounded-full p-4 w-20 h-20 mx-auto shadow-lg">
            <Shield className="w-12 h-12 text-red-500 mx-auto" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Admin Access Required
            </h2>
            <p className="text-gray-600">
              Please log in with an administrator account to access this panel.
            </p>
          </div>
          <button
            onClick={() => router.push('/login')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // ✅ Access Denied (User exists but is not admin)
  if (user && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-6 max-w-md mx-auto p-8">
          <div className="bg-white rounded-full p-4 w-20 h-20 mx-auto shadow-lg">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Access Denied
            </h2>
            <p className="text-gray-600 mb-4">
              You don&apos;t have administrator privileges to access this panel.
            </p>
            <div className="bg-gray-100 p-3 rounded-lg text-sm">
              <p className="text-gray-700">
                <strong>Current Role:</strong> {user.role?.charAt(0).toUpperCase()}{user.role?.slice(1)}
              </p>
              <p className="text-gray-700">
                <strong>Required Role:</strong> Administrator
              </p>
            </div>
          </div>
          <button
            onClick={() => router.push('/')}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // ✅ Authorized Admin - Render Admin Layout
  return (
    <LoadingProvider>
      <main className='flex min-h-screen bg-slate-50'>
        <Sidebar />
        <div className='flex flex-col flex-1 overflow-x-hidden'>
          <Header />
          {isLoading && <LoadingBar />}
          <div className='flex-1 p-6'>
            <div className="mb-4 flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg w-fit">
              <Shield size={16} />
              <span>Admin Panel Access Verified</span>
            </div>
            {children}
          </div>
        </div>
      </main>
    </LoadingProvider>
  );
}

export default AdminLayout;