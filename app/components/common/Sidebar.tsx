'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  IconFavorite, IconFolder, IconHome, IconNotification, IconUser,
} from './Icons';

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <nav className="py-8 bg-main-color text-white h-screen
    "
    >
      <ul>
        <li className={`py-4 px-8 w-full hover:bg-blue
        fill-white transition-all hover:scale-[0.95]
        ${pathname === '/home' && 'bg-blue'}`}
        >
          <Link
            href="/home"
            className="flex flex-row-reverse justify-end gap-2
            fill-white"
          >
            <span>Home</span>
            <IconHome className="h-[20px]" />
          </Link>
        </li>
        <li className={`py-4 px-8 w-full hover:bg-blue
        fill-white transition-all hover:scale-[0.95]
        ${pathname === '/favorite' && 'bg-blue'}`}
        >
          <Link
            href="/home"
            className="flex flex-row-reverse justify-end gap-2
            fill-white"
          >
            <span>Favorite</span>
            <IconFavorite className="h-[20px]" />
          </Link>
        </li>
        <li className={`py-4 px-8 w-full hover:bg-blue
        fill-white transition-all hover:scale-[0.95]
        ${pathname === '/notifications' && 'bg-blue'}`}
        >
          <Link
            href="/home"
            className="flex flex-row-reverse justify-end gap-2
            fill-white"
          >
            <span>Notification</span>
            <IconNotification className="h-[20px]" />
          </Link>
        </li>
        <li className={`py-4 px-8 w-full hover:bg-blue
        fill-white transition-all hover:scale-[0.95]
        ${pathname === '/saved' && 'bg-blue'}`}
        >
          <Link
            href="/home"
            className="flex flex-row-reverse justify-end gap-2
            fill-white"
          >
            <span>Saved</span>
            <IconFolder className="h-[20px]" />
          </Link>
        </li>
        <li className={`py-4 px-8 w-full hover:bg-blue
        fill-white transition-all hover:scale-[0.95]
        ${pathname === '/profile' && 'bg-blue'}`}
        >
          <Link
            href="/home"
            className="flex flex-row-reverse justify-end gap-2
            fill-white"
          >
            <span>Profile</span>
            <IconUser className="h-[20px]" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
