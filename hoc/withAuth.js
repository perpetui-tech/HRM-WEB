'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent, redirectPath = '/') => {
  const AuthComponent = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(() => {
        const token = localStorage.getItem('authToken'); 

        localStorage.setItem('authToken', '456454465465')
        if (!token) {
            router.push(redirectPath);
        } else {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[var(--primary-color)] mb-6"></div>
            <h2 className="text-xl font-semibold text-gray-600">Please wait...</h2>
            <p className="text-sm text-gray-400 mt-2">We're checking your authentication status</p>
        </div>
      );
    }

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return AuthComponent;
};

export default withAuth;