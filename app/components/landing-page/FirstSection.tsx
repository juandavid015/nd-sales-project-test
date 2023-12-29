import Image from 'next/image';

export default function FirstSection() {
  return (
    <section
      className="md:px-32 md:py-16 px-8 py-4 flex flex-col
      gap-6"
      id="content1"
    >
      <h2 className="text-heading-color md:text-6xl text-5xl
      font-extrabold"
      >
        Content 1
      </h2>
      <p className="max-w-[400px]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua
      </p>
      <div className="grid grid-cols-images-layout gap-8 justify-items-center">
        {
          Array.from({ length: 4 }, (_, index) => (
            <div key={`${index} fallback-img`}>
              <div
                className="max-w-[450px] max-h-[300px] w-full h-full
                mx-auto"
              >
                <Image
                  width={350}
                  height={350}
                  alt="fallback image showcase"
                  src="/image-fallback.svg"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-justify">
                Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed
                do eiusmod tempor incididunt
                ut labore et dolore magna
                aliqua
              </p>
            </div>

          ))
        }
      </div>
    </section>
  );
}
