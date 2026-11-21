import React from 'react';
import { redirect } from 'next/navigation';
import { isUserAuthenticated } from '@/lib/auth';
import AdminDashboardClient from './AdminDashboardClient';

export default async function AdminPage() {
  const authenticated = isUserAuthenticated();

  if (!authenticated) {
    redirect('/admin/login');
  }

  return <AdminDashboardClient />;
}
