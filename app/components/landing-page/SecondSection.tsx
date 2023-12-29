import { IconDocument } from '../common/Icons';

export default function SecondSection() {
  return (
    <section
      className="md:px-32 md:py-16 px-8 py-4 flex flex-col
      gap-6 items-end text-right bg-blue-sky
      bg-no-repeat bg-center bg-cover"
      id="content2"
    >
      <h2 className="text-heading-color md:text-6xl text-5xl
      font-extrabold"
      >
        Content 2
      </h2>
      <p className="max-w-[400px]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua
      </p>
      <div className="flex flex-wrap gap-6 justify-center w-full">
        {
          Array.from({ length: 3 }, (_, index) => (
            <div
              key={`showcase-${index}`}
              className="fill-white hover:fill-main-color
              p-6 bg-transparent flex-1 cursor-pointer"
            >
              <IconDocument className="h-[400px] mx-auto" />
            </div>
          ))
        }
      </div>
    </section>
  );
}
