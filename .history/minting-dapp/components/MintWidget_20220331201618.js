import { utils, BigNumber } from 'ethers';
import React from 'react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Moralis from 'moralis/types';
// interface Props {
//   maxSupply: number;
//   totalSupply: number;
//   tokenPrice: BigNumber;
//   user: Moralis.User<Moralis.Attributes> | null;
//   maxMintAmountPerTx: number;
//   isPaused: boolean;
//   isWhitelistMintEnabled: boolean;
//   isUserInWhitelist: boolean;
//   mintTokens(mintAmount: number): Promise<void>;
//   whitelistMintTokens(mintAmount: number): Promise<void>;
// }

// interface State {
//   mintAmount: number;
// }

// const defaultState: State = {
//   mintAmount: 1,
// };

const MintWidget = ({
  maxSupply,
  totalSupply,
  tokenPrice,
  user,
  maxMintAmountPerTx,
  isPaused,
  isWhitelistMintEnabled,
  isUserInWhitelist,
  mintTokens,
  whitelistMintTokens,
}) => {
  const [mintAmount, setMintAmount] = React.useState(1);

  const canMint = () => {
    return !isPaused || canWhitelistMint();
  };

  const canWhitelistMint = () => {
    return isWhitelistMintEnabled && isUserInWhitelist;
  };

  const incrementMintAmount = () => {
    setMintAmount((prevAmount) => {
      Math.min(maxMintAmountPerTx, prevAmount + 1);
    });
  };

  const decrementMintAmount = () => {
    setMintAmount((prevAmount) => {
      Math.min(maxMintAmountPerTx, prevAmount - 1);
    });
  };

  const mint = async () => {
    if (!isPaused) {
      await mintTokens(mintAmount);
      return;
    }
    await whitelistMintTokens(mintAmount);
  };

  return (
    <>
      <div className="text-3xl font-bold mb-6">
        <span className="font-sans2">Total Minted: </span>
        <span className="font-sans2 text-cyan-300">
          {totalSupply} / {maxSupply}
        </span>
      </div>
      {canMint() ? (
        <div className="flex flex-col">
          <div className="flex-col flex ">
            <div className="flex justify-between">
              <div className="borderGradient">
                <button
                  className="px-4 py-2 my-0.5 ml-0.5 bg-gradient-to-r from-dexfi-cyan to-dexfi-pink"
                  onClick={() => decrementMintAmount()}
                >
                  -
                </button>
                <div className="inline-flex w-[150px]">
                  <h1 className="text-center font-sans2 text-lg w-full font-semibold">
                    {mintAmount}
                  </h1>
                </div>
                <button
                  className="px-4 py-2 mr-0.5  bg-gradient-to-r from-dexfi-cyan to-dexfi-pink"
                  onClick={() => incrementMintAmount()}
                >
                  +
                </button>
              </div>
              <div className="font-sans2 text-gray-300 text-lg font-medium md:mr-10 hidden sm:block">
                {utils.formatEther(tokenPrice ? tokenPrice.mul(mintAmount) : 0)}{' '}
                ETH + Gas Fee
                <h1 className="-m-1">Max 5 Demons per trasaction</h1>
              </div>
            </div>
            <div className="text-gray-300 font-sans2 font-medium md:mr-10 mt-4 sm:hidden">
              {utils.formatEther(tokenPrice ? tokenPrice.mul(mintAmount) : 0)}{' '}
              ETH + Gas Fee
              <h1>Max 5 Demons per trasaction</h1>
            </div>
            {user && (
              <div className="borderGradient w-min mt-6 sm:mt-10">
                <button
                  className="w-[132px] tracking-wider text-sm font-mono py-1 px-5 text-white hover:opacity-75 transition-opacity duration-300 active:translate-y-0.1 active:shadow-none active:opacity-90
bg-gradient-to-r from-dexfi-pink to-dexfi-cyan"
                  onClick={() => mint()}
                >
                  Mint
                  <ArrowRightAltIcon
                    sx={{
                      color: '#ffff',
                      fontSize: 28,
                      marginBottom: '-1px',
                      marginLeft: '5px',
                    }}
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="cannot-mint">
          <span className="emoji">???</span>
          {isWhitelistMintEnabled ? (
            <>
              You are not included in the <strong>whitelist</strong>.
            </>
          ) : (
            <>
              The contract is <strong>paused</strong>.
            </>
          )}
          <br />
          Please come back during the next sale!
        </div>
      )}
    </>
  );
};
export default MintWidget;
