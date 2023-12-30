import FormSales from '../components/home/FormSales';
import HomeHeader from '../components/home/HomeHeader';
import SalesDataProvider from '../context-store/SalesDataProvider';

export default function Home() {
  return (
    <main className="w-full h-full md:px-32 md:py-16 px-16 py-8
    text-paragraph-color flex flex-col gap-8
    "
    >
      <SalesDataProvider>
        <HomeHeader />
        <FormSales />
      </SalesDataProvider>
    </main>
  );
}
