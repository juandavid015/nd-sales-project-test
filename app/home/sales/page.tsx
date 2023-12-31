import SalesList from '@/app/components/sales/SalesList';

export default function Sales() {
  return (
    <main className="md:px-32 md:py-16 px-16 py-8 w-full h-full
    min-h-screen flex flex-col gap-6
    text-dark-blue border-b border-sky-blue"
    >
      <h1 className="md:text-4xl text-3xl font-extrabold">
        Sales
      </h1>
      <SalesList />
    </main>
  );
}
