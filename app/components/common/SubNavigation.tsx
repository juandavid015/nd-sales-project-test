'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SubNavigation() {
  const pathname = usePathname();
  return (
    <ul className="p-8 bg-gray-light border-r border-gray/70">
      <li className={`font-medium 
        hover:text-dark-blue 
        ${pathname === '/home/sales' ? 'text-dark-blue underline' : 'text-dark-blue/70'}`}
      >
        <Link href="/home/sales">
          Sales
        </Link>
      </li>
      <li className={`font-medium 
        hover:text-dark-blue 
        ${pathname === '/home' ? 'text-dark-blue underline' : 'text-dark-blue/70'}`}
      >
        <Link href="/home">
          Create
        </Link>
      </li>
    </ul>
  );
}
