import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const CarouselCollection = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  useEffect(() => {
    setSelectedItem(selectedItem);
  }, [selectedItem]);

  const images = [
    '/images/3.png',
    '/images/15.png',
    '/images/20.png',
    '/images/41.png',
    '/images/1.png',
    '/images/34.png',
    '/images/37.png',
    '/images/3.png',
    '/images/15.png',
    '/images/20.png',
    '/images/41.png',
    '/images/1.png',
    '/images/34.png',
    '/images/37.png',
    '/images/3.png',
    '/images/15.png',
    '/images/20.png',
    '/images/41.png',
    '/images/1.png',
    '/images/34.png',
    '/images/37.png',
  ];

  interface WindowSize {
    width: number | undefined;
    height: number | undefined;
  }

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  } as WindowSize);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
      window.addEventListener('resize', handleResize);

      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const [slidePercentage, setSlidePercentage] = useState(
    (240 / windowSize.width!) * 100
  );

  useEffect(() => {
    if (windowSize.width && windowSize.width < 1200) {
      let newSlidePercentage = (245 / windowSize.width) * 100;
      setSlidePercentage(newSlidePercentage);
    }
    if (windowSize.width && windowSize.width > 1199) {
      let newSlidePercentage = (245 / 1400) * 100;
      setSlidePercentage(newSlidePercentage);
    }
  }, [windowSize]);

  return (
    <div className="mt-20">
      <div className="mb-5 max-w-[1200px] mx-auto">
        <h1 className="text-3xl font-bold text-dexfi-light_cyan z-30 px-6">
          Collection
        </h1>
      </div>
      <div className="h-[100px] w-[0px] absolute lalalala3 right-10 top-100"></div>
      <div className=" z-30 mt-4 mb-6  sm:mb-10 max-w-[1400px] mx-auto">
        <Carousel
          infiniteLoop
          showStatus={false}
          showThumbs={false}
          showIndicators={false}
          preventMovementUntilSwipeScrollTolerance={true}
          interval={5000}
          swipeScrollTolerance={15}
          autoFocus={false}
          // selectedItem={selectedItem}
          centerSlidePercentage={slidePercentage}
          centerMode={true}
          // onChange={(selectedItem) => setSelectedItem(selectedItem + 1)}
          transitionTime={680}
          showArrows={true}
        >
          {images.map((source, index) => (
            <div
              className="h-66 from-gray-100  ml-2 bottom-0 relative"
              key={index}
            >
              <Image
                loading="lazy"
                objectFit="cover"
                layout="fill"
                sizes="300px"
                // objectPosition="center"
                src={source}
                alt=""
                // className="px-4"
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div>
        <div className="sm:mb-5 flex justify-between max-w-[1200px] mx-auto px-6">
          <h1 className="sm:text-lg text-gray-300 trucante max-w-[60vw] sm:max-w-[800px]">
            The price of each Demons Gaze NFT card is 0.05 Ether, they are
            distributed on the Ethereum network, and there is a total of 2000
            cards.
          </h1>
          <h1 className="text-lg  truncate sm:text-xl font-medium text-white sm:ml-20">
            View All -{'>'}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default CarouselCollection;
