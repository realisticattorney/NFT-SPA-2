import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  return (
    <div className="w-full grid grid-cols-2 grid-rows-2 sm:grid-rows-1 sm:max-w-[1200px] sm:mx-auto">
      <div className="flex-col px-4 sm:px-6 sm:py-40 sm:mt-0 flex-grow row-start-2 sm:row-start-1 col-span-2 sm:col-span-1 space-y-6">
        <h1 className="text-7xl sm:text-8xl tracking-wide font-bold textGradient w-min">
          Demons
          <span className="block text-7xl sm:text-8xl tracking-wide font-bold textGradient w-min">
            Gaze
          </span>
        </h1>
        <p className="sm:text-lg text-gray-300">
          Limited 2,000 unique avatar collection that will take part on a
          metaverse gaming experience.
        </p>

        <div className="space-x-2">
          <Link href="/swap">
            <a>
              <button
                className="w-[132px] border-2 font-bold py-0.5 px-5 text-white hover:opacity-75 transition-opacity duration-300 active:translate-y-0.1 active:shadow-none active:opacity-90
               bg-gradient-to-r from-dexfi-cyan to-dexfi-pink lalalala borderGradientReverse
              "
              >
                Explore
              </button>
            </a>
          </Link>
        </div>
        <div className="">
          <div className="flex font-medium text-white space-x-6">
            <div>
              <h1 className="truncate text-xl">2,000</h1>
              <h1 className="text-xs1">Artworks</h1>
            </div>
            <div>
              <h1 className="truncate text-xl">1,446</h1>
              <h1 className="text-xs1">Owners</h1>
            </div>
            <div>
              <h1 className="truncate text-xl">48,200</h1>
              <h1 className="text-xs1">Volume Traded</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 sm:col-span-1 sm:col-start-2 relative row-span-1 m-5 z-0">
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
