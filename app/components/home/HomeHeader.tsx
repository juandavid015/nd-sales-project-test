import { IconLogo } from '../common/Icons';

export default function HomeHeader() {
  return (
    <div className="flex items-center gap-2">
      <IconLogo className="h-[80px] fill-heading-color" />
      <h1 className="text-heading-color md:text-4xl text-3xl
            inline-block w-full pb-4
            font-extrabold border-b-4 border-blue-light"
      >
        New Sale
      </h1>
    </div>
  );
}
