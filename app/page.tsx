import Footer from './components/common/Footer';
import Header from './components/common/Header';
import FirstSection from './components/landing-page/FirstSection';
import Hero from './components/landing-page/Hero';
import SecondSection from './components/landing-page/SecondSection';

function Landing() {
  return (
    <>
      <Header />
      <main className="min-h-screen h-full w-full text-paragraph-color
      font-medium"
      >
        <Hero />
        <FirstSection />
        <SecondSection />
      </main>
      <Footer />
    </>
  );
}
export default Landing;
