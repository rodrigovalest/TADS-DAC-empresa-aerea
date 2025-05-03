"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: 'FUNCIONARIO' | 'CLIENTE';
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get('token');
      const role = Cookies.get('role');
      
      if (!token) {
        router.push('/login');
        return;
      }
      
      if (role !== requiredRole) {
        router.push('/unauthorized');
        return;
      }

      setAuthorized(true);
    };

    checkAuth();
    setLoading(false);
  }, [requiredRole, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF3D00]"></div>
      </div>
    );
  }

  return authorized ? <>{children}</> : null;
}

export default ProtectedRoute;