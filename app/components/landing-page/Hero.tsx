import Link from 'next/link';

export default function Hero() {
  return (
    <div className="w-full bg-hero-pattern bg-no-repeat bg-center bg-contain
    min-h-[400px] md:px-32 md:py-16 px-8 py-4"
    >
      <div className="max-w-[400px] flex flex-col gap-6">
        <h1 className="text-heading-color text-6xl font-extrabold">
          Lorem ipsum Design
        </h1>
        <p className="sm:bg-transparent bg-white/70 sm:backdrop-blur-none backdrop-blur-sm
        text-heading-color md:text-inherit"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua
        </p>
        <Link
          href="/home"
          className="px-8 py-3 bg-main-color text-white font-bold w
          w-fit mt-8"
          type="button"
        >
          LOGIN
        </Link>
      </div>
    </div>
  );
}
