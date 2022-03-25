import Nav from './Nav';
import Hero from './Hero';
import Footer from './Footer';
import CarouselCollection from './CarouselCollection';
import RoadMap from './RoadMap';
import Faq from './Faq';
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col sm:min-h-screen min-w-full w-fit sm:w-full bg-dexfi-violet">
      <Nav />
      <Hero />
      <main className="h-full w-full flex-grow appBackground">{children}</main>
      <CarouselCollection />
      <RoadMap />
      <Faq />
      <Footer />
    </div>
  );
};

export default Layout;
