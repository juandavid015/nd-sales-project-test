import FirstSection from './components/landing-page/FirstSection';
import Hero from './components/landing-page/Hero';
import SecondSection from './components/landing-page/SecondSection';

function Home() {
  return (
    <main className="min-h-screen h-full w-full text-paragraph-color
    font-medium"
    >
      <Hero />
      <FirstSection />
      <SecondSection />
    </main>
  );
}
export default Home;
