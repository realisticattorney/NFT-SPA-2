import Image from 'next/image';
import React from 'react';

const RoadMap = () => {
  return (
    <div className="mt-20  max-w-[1200px] mx-auto">
      <div className="mb-5 mx-6 ">
        <h1 className="text-3xl font-bold text-dexfi-light_cyan">Roadmap</h1>
      </div>
      <div className="grid grid-cols-4 grid-rows-2 h-[600px] max-w-full sm:max-w-[1200px] mx-auto glossy gap-4 p-4">
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
          <div className="h-[85px] flex sm:ml3">
            <div className="w-[18px] h-[85px] bg-gradient-to-r text-transparent from-dexfi-cyan to-dexfi-pink "></div>
            <div className="ml-5 flex-col -mt-1 self-center">
              <h1 className="text-dexfi-light_cyan font-semibold">100%</h1>
              <h1 className="text-white ">
                Star working on Cybershops Metaverse NFT Game!
              </h1>
            </div>
          </div>
          <div className="h-[85px] flex sm:ml3">
            <div className="w-[18px] h-[85px] bg-gradient-to-r text-transparent from-dexfi-cyan to-dexfi-pink "></div>
            <div className="ml-5 flex-col -mt-1 self-center">
              <h1 className="text-dexfi-light_cyan font-semibold">80%</h1>
              <h1 className="text-white ">
                Star working at second collection in Demons Gaze Metaverse.
              </h1>
            </div>
          </div>
          <div className="h-[85px] flex sm:ml3">
            <div className="w-[18px] h-[85px] bg-gradient-to-r text-transparent from-dexfi-cyan to-dexfi-pink "></div>
            <div className="ml-5 flex-col -mt-1 self-center">
              <h1 className="text-dexfi-light_cyan font-semibold">60%</h1>
              <h1 className="text-white ">
                5 ETH Giveaway between Demons Gaze Holders!
              </h1>
            </div>
          </div>
          <div className="h-[85px] flex sm:ml3">
            <div className="w-[18px] h-[85px] bg-gradient-to-r text-transparent from-dexfi-cyan to-dexfi-pink "></div>
            <div className="ml-5 flex-col -mt-1 self-center">
              <h1 className="text-dexfi-light_cyan font-semibold">40%</h1>
              <h1 className="text-white ">
                10 NFT Giveaway for Twitter followers.
              </h1>
            </div>
          </div>
          <div className="h-[85px] flex sm:ml3">
            <div className="w-[18px] h-[85px] bg-gradient-to-r text-transparent from-dexfi-cyan to-dexfi-pink "></div>
            <div className="ml-5 flex-col -mt-1 self-center">
              <h1 className="text-dexfi-light_cyan font-semibold">20%</h1>
              <h1 className="text-white ">
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
