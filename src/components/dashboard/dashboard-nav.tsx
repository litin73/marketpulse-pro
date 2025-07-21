'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Bell, Settings, Users, Watch, LineChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const links = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Premarket Screener', href: '/screener', icon: LineChart },
  { name: 'Alerts', href: '/alerts', icon: Bell },
  { name: 'Watchlist', href: '/watchlist', icon: Watch },
  { name: 'Community', href: '/community', icon: Users },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="grid items-start gap-2">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={cn(
            buttonVariants({ variant: pathname === link.href ? 'default' : 'ghost' }),
            'justify-start'
          )}
        >
          <link.icon className="mr-2 h-4 w-4" />
          {link.name}
        </Link>
      ))}
      <div className="mt-auto">
        <Link
          href="/settings"
          className={cn(
            buttonVariants({ variant: pathname === '/settings' ? 'default' : 'ghost' }),
            'justify-start'
          )}
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Link>
      </div>
    </nav>
  );
}
