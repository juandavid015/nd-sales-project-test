import SaleInformation from '@/app/components/sale-details/SaleDetails';

export default function SaleDetails({ params }: { params: { id: string } }) {
  return (
    <main className="flex flex-col gap-6 w-full h-full
    md:px-32 md:py-16 px-16 py-8"
    >
      <h1 className="md:text-5xl text-3xl font-bold">
        {params.id}
      </h1>
      <SaleInformation id={params.id} />
    </main>
  );
}
