'use client';

import { usePathname } from 'next/navigation';
import WhatsAppFloat from './WhatsAppFloat';

export default function WhatsAppFloatWrapper() {
  const pathname = usePathname();
  
  // Don't show WhatsApp button on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }
  
  return <WhatsAppFloat />;
}