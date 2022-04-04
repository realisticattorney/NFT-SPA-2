import React, { useCallback, useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import Web3Modal from 'web3modal';
import { ethers, BigNumber } from 'ethers';
import { ExternalProvider, Web3Provider } from '@ethersproject/providers';
import detectEthereumProvider from '@metamask/detect-provider';
import NftContractType from '../lib/NftContractType';
import CollectionConfig from '../../smart-contract/config/CollectionConfig';
import NetworkConfigInterface from '../../smart-contract/lib/NetworkConfigInterface';
import CollectionStatus from './CollectionStatus';
import MintWidget from './MintWidget';
import Whitelist from '../lib/Whitelist';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Logo from '../public/images/Web3Auth.svg';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useWeb3 } from './providers/web3';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
// import Moralis from 'moralis';
const ContractAbi = require('../../smart-contract/artifacts/contracts/' +
  CollectionConfig.contractName +
  '.sol/' +
  CollectionConfig.contractName +
  '.json').abi;

const Dapp = () => {
  const { contract, provider, chainId } = useWeb3();
  const Web3Api = useMoralisWeb3Api();
  const {
    isAuthenticated,
    isAuthenticating,
    authError,
    authenticate,
    user,
    logout,
    Moralis,
  } = useMoralis();
  const [maxSupply, setMaxSupply] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [maxMintAmountPerTx, setMaxMintAmountPerTx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [tokenPrice, setTokenPrice] = useState(0);
  const [isWhitelistMintEnabled, setIsWhitelistMintEnabled] = useState(false);
  const [isUserInWhitelist, setIsUserInWhitelist] = useState('');
  const [network, setNetwork] = useState(null);
  const [networkConfig, setNetworkConfig] = useState(CollectionConfig.mainnet);
  console.log('address', user?.get('ethAddress'));
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadProvider = async () => {
      setMaxSupply((await contract?.maxSupply()).toNumber());
      setTotalSupply((await contract?.totalSupply()).toNumber());
      setMaxMintAmountPerTx((await contract?.maxMintAmountPerTx()).toNumber());
      setTokenPrice(await contract?.cost());
      setIsPaused(await contract?.paused());
      setIsWhitelistMintEnabled(await contract?.whitelistMintEnabled());
      setIsUserInWhitelist(Whitelist.contains(user?.get('ethAddress') ?? ''));
    };
    contract && loadProvider();
  }, [contract]);

  const switchNetworkCallback = useCallback(async () => {
    await Moralis.switchNetwork('0x4');
  }, []);

  const authenticateCallback = async () => {
    authenticate({
      provider: 'web3Auth',
      clientId:
        'BD2w7iKElOcRdqglNobGn6bGPXh-JfNg3tPE7jNRmA1m4EB7KF3qDS_DOgGUwoidVMjWFyuzTncIdGntiotSkLM',
      chainId: '0x4',
    });
  };

  const logoutCallback = useCallback(async () => {
    await logout();
    window.location.reload();
  }, [logout]);

  // let merkleProofManualAddressInput!: HTMLInputElement;

  // const [maxMintAmountPerTx, setMaxMintAmountPerTx] = React.useState<number>(0);
  // const [merkleProofManualAddress, setMerkleProofManualAddress] =
  //   React.useState<string>('');
  // const [
  //   merkleProofManualAddressFeedbackMessage,
  //   setMerkleProofManualAddressFeedbackMessage,
  // ] = React.useState<string | JSX.Element | null>(null);
  // const [errorMessage, setErrorMessage] = React.useState<any>(null);

  // useEffect(() => {
  //   async function getEthAccountBalance() {
  //     const browserProvider =
  //       (await detectEthereumProvider()) as ExternalProvider;

  //     if (browserProvider?.isMetaMask !== true) {
  //       setError(
  //         <div className="font-sans2 text-gray-100 font-light">
  //           We were not able to detect <strong>MetaMask</strong>. We value{' '}
  //           <strong>privacy and security</strong> a lot so we limit the wallet
  //           options on the DAPP.
  //           <br />
  //         </div>
  //       );
  //     }

  //     setProvider(new ethers.providers.Web3Provider(browserProvider));
  //     console.log('Provider:', provider);
  //     registerWalletEvents(browserProvider);

  //     await initWallet();
  //   }
  //   getEthAccountBalance();
  // }, []);

  const mintTokens = async (amount) => {
    console.log('mintTokens', tokenPrice.mul(amount));
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    let contractVar = new ethers.Contract(
      CollectionConfig.contractAddress,
      ContractAbi,
      provider?.getSigner()
    );
    let transaction;
    try {
      transaction = await toast.promise(
        contractVar.mint(amount, { value: tokenPrice.mul(amount) }),
        {
          pending: 'Tx is pending',
          success: 'Tx sent 👌',
          error: 'Tx rejected 🤯',
        }
      );
      await toast.promise(transaction.wait(), {
        pending: 'Mining of tx is pending',
        success: 'Mining of tx resolved 👌',
        error: 'Mining of tx rejected 🤯',
      });
      setTotalSupply((await contract?.totalSupply()).toNumber());
    } catch (e) {
      errorHandler(e);
    }
  };

  const whitelistMintTokens = async (amount) => {
    try {
      await contract?.whitelistMint(
        amount,
        Whitelist.getProofForAddress(user.get('ethAddress')),
        { value: tokenPrice.mul(amount) }
      );
    } catch (e) {
      errorHandler(e);
    }
  };

  const isSoldOut = () => {
    return maxSupply !== 0 && totalSupply < maxSupply;
  };

  const isNotMainnet = () => {
    return chainId !== null && chainId !== CollectionConfig.mainnet.chainId;
  };

  // const copyMerkleProofToClipboard = (): void => {
  //   const merkleProof = Whitelist.getRawProofForAddress(
  //     userAddress ?? merkleProofManualAddress
  //   );

  //   if (merkleProof.length < 1) {
  //     setMerkleProofManualAddressFeedbackMessage(
  //       'The given address is not in the whitelist, please double-check.'
  //     );

  //     return;
  //   }

  //   navigator.clipboard.writeText(merkleProof);

  //   setMerkleProofManualAddressFeedbackMessage(
  //     <>
  //       <strong>Congratulations!</strong> <span className="emoji">🎉</span>
  //       <br />
  //       Your Merkle Proof <strong>has been copied to the clipboard</strong>. You
  //       can paste it into{' '}
  //       <Link href={generateContractUrl()}>
  //         {networkConfig.blockExplorer.name}
  //       </Link>{' '}
  //       to claim your tokens.
  //     </>
  //   );
  // };

  const errorHandler = (error = null) => {
    let errorMessagess = 'Unknown error...';
    console.log('errorrrr', error);
    if (null === error || typeof error === 'string') {
      errorMessagess = error;
    } else if (typeof error === 'object') {
      // Support any type of error from the Web3 Provider...
      if (error?.error?.message !== undefined) {
        errorMessagess = error.error.message;
      } else if (error?.data?.message !== undefined) {
        errorMessagess = error.data.message;
      } else if (error?.message !== undefined) {
        errorMessagess = error.message;
      } else if (React.isValidElement(error)) {
        setErrorMessage(error);

        return;
      }
    }
    setErrorMessage(
      null === errorMessage
        ? null
        : errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)
    );
  };

  // const generateContractUrl = (): string => {
  //   return networkConfig.blockExplorer.generateContractUrl(
  //     CollectionConfig.contractAddress!
  //   );
  // };

  const generateMarketplaceUrl = () => {
    return CollectionConfig.marketplaceConfig.generateCollectionUrl(
      CollectionConfig.marketplaceIdentifier,
      !isNotMainnet()
    );
  };

  // const connectWallet = async (): Promise<void> => {
  //   try {
  //     await provider?.provider.request!({ method: 'eth_requestAccounts' });

  //     initWallet();
  //   } catch (e) {
  //     setError(e);
  //   }
  // };

  // const initWallet = async (): Promise<void> => {
  //   console.log('providoooor,', provider);
  //   const walletAccounts = await provider?.listAccounts();
  //   console.log('Wallet accounts:', walletAccounts);
  //   if (walletAccounts?.length === 0) {
  //     return;
  //   }

  //   const network = await provider?.getNetwork();
  //   let networkConfig: NetworkConfigInterface;

  //   if (network?.chainId === CollectionConfig.mainnet.chainId) {
  //     networkConfig = CollectionConfig.mainnet;
  //   } else if (network?.chainId === CollectionConfig.testnet.chainId) {
  //     networkConfig = CollectionConfig.testnet;
  //   } else {
  //     setError('Unsupported network!');

  //     return;
  //   }

  //   setUserAddress(walletAccounts ? walletAccounts[0] : null);
  //   setNetwork(network);
  //   setNetworkConfig(networkConfig);

  //   if ((await provider?.getCode(CollectionConfig.contractAddress!)) === '0x') {
  //     setError(
  //       'Could not find the contract, are you connected to the right chain?'
  //     );

  //     return;
  //   }

  //   let contractVar = new ethers.Contract(
  //     CollectionConfig.contractAddress!,
  //     ContractAbi,
  //     provider?.getSigner()
  //   ) as unknown as NftContractType;

  //   setContract(contractVar);
  //   setMaxSupply((await contractVar.maxSupply()).toNumber());
  //   setTotalSupply((await contractVar.totalSupply()).toNumber());
  //   setMaxMintAmountPerTx((await contractVar.maxMintAmountPerTx()).toNumber());
  //   setTokenPrice(await contractVar.cost());
  //   setIsPaused(await contractVar.paused());
  //   setIsWhitelistMintEnabled(await contractVar.whitelistMintEnabled());
  //   setIsUserInWhitelist(Whitelist.contains(userAddress ?? ''));
  // };

  // const registerWalletEvents = (browserProvider: ExternalProvider): void => {
  //   // @ts-ignore
  //   browserProvider.on('accountsChanged', () => {
  //     initWallet();
  //   });

  //   // @ts-ignore
  //   browserProvider.on('chainChanged', () => {
  //     window.location.reload();
  //   });
  // };

  return (
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="mb-4 sm:mb-8 flex justify-between z-0">
        <h1
          className="font-mono text-sm sm:text-xl font-semibold self-center textGradientReverse z-50"
          id="mint"
        >
          Mint Demons Gaze
        </h1>
        <a
          href="https://rinkeby.etherscan.io/address/0xb966a41C4a5D25A6Eb2c776C90004D7256FCF690"
          target="_blank"
          rel="noreferrer"
          className="font-mono text-sm sm:text-xl font-medium self-center text-gray-100"
        >
          View Contract
          <ArrowRightAltIcon
            sx={{
              color: '#ffff',
              fontSize: 24,
              marginTop: '-1px',
              marginLeft: '5px',
            }}
          />
        </a>
      </div>
      <div className="h-[0px] w-[0px] absolute lalalala3 left-0 bottom-90 mt-32"></div>

      <div className=" glossy text-white px-5 py-7 sm:p-10 z-20">
        {/* {isNotMainnet() ? (
          <div className="not-mainnet">
            You are not connected to the main network.
            <span className="small">
              Current network: <strong>{network?.name}</strong>
            </span>
          </div>
        ) : null} */}
        {/* 
        {errorMessage ? (
          <div className="error">
            <p>{errorMessage}</p>
            {/* <button onClick={() => setError()} className="font-sans2 font-bold mb-2">Click to close message</button>
          </div>
        ) : null} */}

        {contract !== undefined ? (
          <>
            {maxSupply > 0 &&
              (totalSupply < maxSupply && !isSoldOut() ? (
                <>
                  <CollectionStatus
                    userAddress={user?.get('ethAddress')}
                    maxSupply={maxSupply}
                    totalSupply={totalSupply}
                    isPaused={isPaused}
                    isWhitelistMintEnabled={isWhitelistMintEnabled}
                    isUserInWhitelist={isUserInWhitelist}
                  />
                  <MintWidget
                    maxSupply={maxSupply}
                    totalSupply={totalSupply}
                    tokenPrice={tokenPrice}
                    user={user}
                    maxMintAmountPerTx={maxMintAmountPerTx}
                    isPaused={isPaused}
                    isWhitelistMintEnabled={isWhitelistMintEnabled}
                    isUserInWhitelist={isUserInWhitelist}
                    mintTokens={(mintAmount) => mintTokens(mintAmount)}
                    whitelistMintTokens={(mintAmount) =>
                      whitelistMintTokens(mintAmount)
                    }
                  />
                  {/* <button
                    className="w-[172px] py-1.5 px-1 text-white hover:opacity-75 transition-opacity duration-300 active:translate-y-0.1 active:shadow-none active:opacity-90
                bg-gradient-to-r from-dexfi-pink to-dexfi-cyan text-sm font-mono"
                    disabled={provider === undefined}
                    onClick={logoutCallback}
                  >
                    Log out
                  </button> */}
                  <p>{user?.get('ethAddress')}</p>
                </>
              ) : (
                <div className="collection-sold-out">
                  <h2>
                    Tokens have been <strong>sold out</strong>!{' '}
                    <span className="emoji">🥳</span>
                  </h2>
                  You can buy from our beloved holders on{' '}
                  <Link href={generateMarketplaceUrl()}>
                    {CollectionConfig.marketplaceConfig.name}
                  </Link>
                </div>
              ))}
          </>
        ) : (
          <div className="collection-not-ready">
            <svg
              className="spinner"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading collection data...
          </div>
        )}

        {!user || !isSoldOut() ? (
          <div className='{}'>
            <div className="borderGradient w-min mt-4">
              <button
                className="w-[172px] py-1.5 px-1 text-white hover:opacity-75 transition-opacity duration-300 active:translate-y-0.1 active:shadow-none active:opacity-90
                bg-gradient-to-r from-dexfi-pink to-dexfi-cyan text-sm font-mono"
                disabled={provider === undefined}
                onClick={() =>
                  !user ? authenticateCallback() : logoutCallback()
                }
              >
                {!user ? 'Sign in' : 'Log out'}
              </button>
            </div>
            {isAuthenticating && (
              <p className="text-xs1 mt-1.5 text-gray-100">Authenticating...</p>
            )}
            {authError && (
              <p className="text-xs1 mt-1.5 text-red-500">
                {JSON.stringify(authError.message)}
              </p>
            )}
          </div>
        ) : null}
      </div>
        <ToastContainer />
    </div>
  );
};

export default Dapp;
{
  /* <div className="borderGradient w-min mt-4">
            {!user ? (
              <button
                className="w-[172px] py-1.5 px-1 text-white hover:opacity-75 transition-opacity duration-300 active:translate-y-0.1 active:shadow-none active:opacity-90
                bg-gradient-to-r from-dexfi-pink to-dexfi-cyan text-sm font-mono"
                disabled={provider === undefined}
                onClick={authenticateCallback}
              >
                Connect Wallet
                <ArrowRightAltIcon
                  sx={{
                    color: '#ffff',
                    fontSize: 28,
                    marginTop: '-1px',
                    marginLeft: '5px',
                  }}
                />
              </button>
            ) : null}
          </div> */
}
