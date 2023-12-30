import Link from 'next/link';
import { IconLogo } from './Icons';

export default function Footer() {
  return (
    <footer className="md:px-32 md:py-20 px-8 py-4 text-paragraph-color
    flex flex-wrap justify-center items-center w-full
    gap-16 mt-auto"
    >
      <IconLogo className="h-[80px] fill-main-color" />
      <div className="flex flex-col">
        <p className="font-bold text-xl text-heading-color">
          COMPANY NAME
        </p>
        <p>
          Sales management solutions
        </p>
      </div>
      <ul className="flex gap-16">
        <li>
          <span className="font-bold text-heading-color">
            Contact
          </span>
          <ul className="flex flex-col gap-2">
            <li className="hover:text-main-color cursor-pointer">
              +1 205 559 999
            </li>
            <li className="hover:text-main-color cursor-pointer">
              <Link href="/#content2">
                Av. Ron # 999, Apt. 22
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <span className="font-bold text-heading-color">
            Product
          </span>
          <ul className="flex flex-col gap-2">
            <li className="hover:text-main-color cursor-pointer">
              <Link href="/#content1">
                Content 1
              </Link>
            </li>
            <li className="hover:text-main-color cursor-pointer">
              <Link href="/#content2">
                Content 2
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </footer>
  );
}
