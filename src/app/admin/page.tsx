import { isAuthenticated } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const authenticated = await isAuthenticated()
  
  if (authenticated) {
    redirect('/admin/dashboard')
  }
  
  // If not authenticated, redirect to login
  redirect('/admin/login')
}
