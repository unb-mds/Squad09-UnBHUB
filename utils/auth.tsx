'use client';

import { useState } from 'react';
import { auth } from '../config/firebase';

import { ProgressSpinner } from 'primereact/progressspinner';
import { useNavigate } from 'react-router-dom';

export const withAuth = (WrappedComponent: any) => {
  return function WithAuth(props: any) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/Landing');
      } else {
        setLoading(false);
      }
    });

    if (loading) {
      return (
        <div className="bg-background flex h-screen items-center justify-center py-10">
          <ProgressSpinner
            style={{ width: '50px', height: '50px' }}
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};
