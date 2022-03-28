import Image from 'next/image';
import React from 'react';

const RoadMap = () => {
  return (
    <div className="mt-20 sm:px-0" id="roadmap">
      <div className="mb-5 px-6 max-w-[1152px] mx-auto">
        <h1 className="font-mono text-3xl font-bold text-dexfi-light_cyan">
          Roadmap
        </h1>
      </div>
      <div className="grid grid-cols-4 grid-rows-2 h-[600px] max-w-full sm:max-w-[1152px] mx-auto  gap-4 py-4 px-6">
        <div className="hidden sm:block col-span-1 relative row-span-1">
          <Image src="/images/34.png" objectFit="cover" layout="fill" />
        </div>
        <div className="hidden sm:block col-start-2 relative row-span-1">
          <Image src="/images/20.png" objectFit="cover" layout="fill" />
        </div>
        <div className="hidden sm:block col-span-1 relative row-start-2">
          <Image src="/images/41.png" objectFit="cover" layout="fill" />
        </div>
        <div className="hidden sm:block col-span-1 relative row-start-2">
          <Image src="/images/30.png" objectFit="cover" layout="fill" />
        </div>

        <div className="col-span-4 sm:col-span-2 row-span-2 flex-col p-5 borderGradient space-y-6 ">
          <div className="h-[85px] flex sm:ml-3">
            <div className="w-[15px] h-[85px] bg-gradient-to-r text-transparent from-dexfi-cyan to-dexfi-pink "></div>
            <div className="ml-4 flex-col -mt-1 self-center">
              <h1 className="text-dexfi-light_cyan font-sans2 font-semibold">
                100%
              </h1>
              <h1 className="text-white text-sm sm:text-normal font-sans2 font-medium">
                Star working on Cybershops Metaverse NFT Game!
              </h1>
            </div>
          </div>
          <div className="h-[85px] flex sm:ml-3">
            <div className="w-[15px] h-[85px] bg-gradient-to-r text-transparent from-dexfi-cyan to-dexfi-pink "></div>
            <div className="ml-4 flex-col -mt-1 self-center">
              <h1 className="text-dexfi-light_cyan font-sans2 font-semibold">
                80%
              </h1>
              <h1 className="text-white text-sm sm:text-normal font-sans2 font-medium">
                Star working at second collection in Demons Gaze Metaverse.
              </h1>
            </div>
          </div>
          <div className="h-[85px] flex sm:ml-3">
            <div className="w-[15px] h-[85px] bg-gradient-to-r text-transparent from-dexfi-cyan to-dexfi-pink "></div>
            <div className="ml-4 flex-col -mt-1 self-center">
              <h1 className="text-dexfi-light_cyan font-sans2 font-semibold">
                60%
              </h1>
              <h1 className="text-white text-sm sm:text-normal font-sans2 font-medium">
                5 ETH Giveaway between Demons Gaze Holders!
              </h1>
            </div>
          </div>
          <div className="h-[85px] flex sm:ml-3">
            <div className="w-[15px] h-[85px] bg-gradient-to-r text-transparent from-dexfi-cyan to-dexfi-pink "></div>
            <div className="ml-4 flex-col -mt-1 self-center">
              <h1 className="text-dexfi-light_cyan font-sans2 font-semibold">
                40%
              </h1>
              <h1 className="text-white text-sm sm:text-normal font-sans2 font-medium">
                10 NFT Giveaway for Twitter followers.
              </h1>
            </div>
          </div>
          <div className="h-[85px] flex sm:ml-3">
            <div className="w-[15px] h-[85px] bg-gradient-to-r text-transparent from-dexfi-cyan to-dexfi-pink "></div>
            <div className="ml-4 flex-col -mt-1 self-center">
              <h1 className="text-dexfi-light_cyan font-sans2 font-semibold">
                20%
              </h1>
              <h1 className="text-white text-sm sm:text-normal font-sans2 font-medium">
                10 NFT Giveaway for Discord users.
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadMap;
