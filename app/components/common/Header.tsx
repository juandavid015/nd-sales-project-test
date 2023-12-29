'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Header() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <header className="sticky top-0">
      <nav className="w-full flex justify-end gap-6
      md:py-8 md:px-16 py-4 px-8
      backdrop-blur-sm bg-white/70 font-bold
      md:text-xl text-lg"
      >
        <ul className="w-fit flex gap-6 text-heading-color">
          <li className="hover:text-main-color">
            <Link href="/#content1">
              Content 1
            </Link>
          </li>
          <li className="hover:text-main-color">
            <Link href="/#content2">
              Content 2
            </Link>
          </li>
        </ul>
        <Link
          href="#login"
          className="text-main-color"
        >
          Login
        </Link>
      </nav>
    </header>
  );
}
export default Header;
