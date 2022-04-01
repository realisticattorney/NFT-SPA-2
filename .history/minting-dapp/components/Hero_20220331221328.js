import Link from 'next/link';
import Image from 'next/image';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import * as Scroll from 'react-scroll';
import { animateScroll as scroll, scroller } from 'react-scroll';

const Hero = () => {
  const scrollTo = (whereto) => {
    scroller.scrollTo(whereto, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  return (
    <div className="w-full grid grid-cols-2 grid-rows-2 sm:mt-10 mb-20 px-2 sm:mb-32 sm:grid-rows-1 sm:max-w-[1200px] sm:mx-auto">
      <div className="flex-col px-4 sm:px-6 py-8 sm:py-0 sm:mt-0 flex-grow row-start-1 sm:row-start-1 col-span-2 sm:col-span-1 space-y-6">
        <div>
          <h1 className="font-serif text-6xl pt-2 sm:text-7xl tracking-wide font-bold textGradient w-min">
            Demons
          </h1>
          <span className="font-serif block text-6xl pt-2 sm:text-7xl md: tracking-wide font-bold textGradient w-min">
            Gaze
          </span>
        </div>
        <p className="font-sans2 sm:text-lg text-gray-300 max-w-[400px]">
          Limited 2,000 unique avatar collection that will take part on a
          metaverse gaming experience.
        </p>

        <div className="space-x-2">
          <a>
            <button
              className="  border-2  text-sm font-mono pb-0.7 pt-0.9 px-7 text-white hover:opacity-75 transition-opacity duration-300 active:translate-y-0.1 active:shadow-none active:opacity-90
               bg-gradient-to-r from-dexfi-cyan to-dexfi-pink lalalala borderGradientReverse
              "
              onClick={() => scrollTo('mint')}
            >
              Explore
              <ArrowRightAltIcon
                sx={{
                  color: '#ffff',
                  fontSize: 28,
                  marginTop: '-1px',
                  marginLeft: '5px',
                }}
              />
            </button>
          </a>
        </div>
        <div className="">
          <div className="flex font-medium text-white space-x-6 justify-between sm:justify-start">
            <div>
              <h1 className="font-aldrich truncate text-xl text-gray-100">
                2,000
              </h1>
              <h1 className="font-aldrich text-xs1 text-gray-100">Artworks</h1>
            </div>
            <div>
              <h1 className="font-aldrich truncate text-xl text-gray-100">
                1,446
              </h1>
              <h1 className="font-aldrich text-xs1 text-gray-100">Owners</h1>
            </div>
            <div>
              <h1 className="font-aldrich truncate text-xl text-gray-100">
                48,200
              </h1>
              <h1 className="font-aldrich text-xs1 text-gray-100">
                Volume Traded
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 sm:col-span-1 sm:col-start-2 relative row-start-2 sm:row-start-1 m-5 sm:m-5 z-0">
        <Image
          src="/images/30.png"
          layout="fill"
          alt="lol"
          priority={false}
          objectFit="contain"
        />
      </div>
    </div>
  );
};

export default Hero;
