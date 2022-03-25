import React, { useCallback, useEffect, useMemo } from 'react';
import { ethers, BigNumber } from 'ethers';
import { ExternalProvider, Web3Provider } from '@ethersproject/providers';
import detectEthereumProvider from '@metamask/detect-provider';
import NftContractType from '../lib/NftContractType';
import CollectionConfig from '../../smart-contract/config/CollectionConfig';
import NetworkConfigInterface from '../../smart-contract/lib/NetworkConfigInterface';
import CollectionStatus from './CollectionStatus';
import MintWidget from './MintWidget';
import Whitelist from '../lib/Whitelist';
import Link from 'next/link';

const ContractAbi = require('../../smart-contract/artifacts/contracts/' +
  CollectionConfig.contractName +
  '.sol/' +
  CollectionConfig.contractName +
  '.json').abi;

const Dapp = () => {
  const [provider, setProvider] = React.useState<Web3Provider | null>(null);

  const [contract, setContract] = React.useState<NftContractType | null>(null);
  console.log('contract', contract);
  console.log('provideeerrrr', provider);
  let merkleProofManualAddressInput!: HTMLInputElement;

  const [userAddress, setUserAddress] = React.useState<string | null>(null);
  const [network, setNetwork] = React.useState<ethers.providers.Network | null>(
    null
  );
  const [networkConfig, setNetworkConfig] =
    React.useState<NetworkConfigInterface>(CollectionConfig.mainnet);
  const [totalSupply, setTotalSupply] = React.useState<number>(0);
  const [maxSupply, setMaxSupply] = React.useState<number>(0);
  const [maxMintAmountPerTx, setMaxMintAmountPerTx] = React.useState<number>(0);
  const [tokenPrice, setTokenPrice] = React.useState<BigNumber>(
    BigNumber.from(0)
  );
  const [isPaused, setIsPaused] = React.useState<boolean>(true);
  const [isWhitelistMintEnabled, setIsWhitelistMintEnabled] =
    React.useState<boolean>(false);
  const [isUserInWhitelist, setIsUserInWhitelist] =
    React.useState<boolean>(false);
  const [merkleProofManualAddress, setMerkleProofManualAddress] =
    React.useState<string>('');
  const [
    merkleProofManualAddressFeedbackMessage,
    setMerkleProofManualAddressFeedbackMessage,
  ] = React.useState<string | JSX.Element | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<any>(null);

  useEffect(() => {
    async function getEthAccountBalance() {
      const browserProvider =
        (await detectEthereumProvider()) as ExternalProvider;

      if (browserProvider?.isMetaMask !== true) {
        setError(
          <>
            We were not able to detect <strong>MetaMask</strong>. We value{' '}
            <strong>privacy and security</strong> a lot so we limit the wallet
            options on the DAPP.
            <br />
            <br />
            But don{"'"}t worry! <span className="emoji">😃</span> You can
            always interact with the smart-contract through{' '}
            <Link href={generateContractUrl()}>
              {networkConfig.blockExplorer.name}
            </Link>{' '}
            and{' '}
            <strong>
              we do our best to provide you with the best user experience
              possible
            </strong>
            , even from there.
            <br />
            <br />
            You can also get your <strong>Whitelist Proof</strong> manually,
            using the tool below.
          </>
        );
      }

      setProvider(new ethers.providers.Web3Provider(browserProvider));
      console.log('Provider:', provider);
      registerWalletEvents(browserProvider);

      await initWallet();
    }
    getEthAccountBalance();
  }, []);

  const mintTokens = async (amount: number): Promise<void> => {
    try {
      await contract?.mint(amount, { value: tokenPrice.mul(amount) });
    } catch (e) {
      setError(e);
    }
  };

  const whitelistMintTokens = async (amount: number): Promise<void> => {
    try {
      await contract?.whitelistMint(
        amount,
        Whitelist.getProofForAddress(userAddress!),
        { value: tokenPrice.mul(amount) }
      );
    } catch (e) {
      setError(e);
    }
  };

  const isSoldOut = (): boolean => {
    return maxSupply !== 0 && totalSupply < maxSupply;
  };

  const isNotMainnet = (): boolean => {
    return (
      network !== null && network.chainId !== CollectionConfig.mainnet.chainId
    );
  };

  const copyMerkleProofToClipboard = (): void => {
    const merkleProof = Whitelist.getRawProofForAddress(
      userAddress ?? merkleProofManualAddress
    );

    if (merkleProof.length < 1) {
      setMerkleProofManualAddressFeedbackMessage(
        'The given address is not in the whitelist, please double-check.'
      );

      return;
    }

    navigator.clipboard.writeText(merkleProof);

    setMerkleProofManualAddressFeedbackMessage(
      <>
        <strong>Congratulations!</strong> <span className="emoji">🎉</span>
        <br />
        Your Merkle Proof <strong>has been copied to the clipboard</strong>. You
        can paste it into{' '}
        <Link href={generateContractUrl()}>
          {networkConfig.blockExplorer.name}
        </Link>{' '}
        to claim your tokens.
      </>
    );
  };

  const setError = (error: any = null): void => {
    let errorMessagess = 'Unknown error...';

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

  const generateContractUrl = (): string => {
    return networkConfig.blockExplorer.generateContractUrl(
      CollectionConfig.contractAddress!
    );
  };

  const generateMarketplaceUrl = (): string => {
    return CollectionConfig.marketplaceConfig.generateCollectionUrl(
      CollectionConfig.marketplaceIdentifier,
      !isNotMainnet()
    );
  };

  const connectWallet = async (): Promise<void> => {
    try {
      await provider?.provider.request!({ method: 'eth_requestAccounts' });

      initWallet();
    } catch (e) {
      setError(e);
    }
  };

  const initWallet = async (): Promise<void> => {
    console.log('providoooor,', provider);
    const walletAccounts = await provider?.listAccounts();
    console.log('Wallet accounts:', walletAccounts);
    if (walletAccounts?.length === 0) {
      return;
    }

    const network = await provider?.getNetwork();
    let networkConfig: NetworkConfigInterface;

    if (network?.chainId === CollectionConfig.mainnet.chainId) {
      networkConfig = CollectionConfig.mainnet;
    } else if (network?.chainId === CollectionConfig.testnet.chainId) {
      networkConfig = CollectionConfig.testnet;
    } else {
      setError('Unsupported network!');

      return;
    }

    setUserAddress(walletAccounts ? walletAccounts[0] : null);
    setNetwork(network);
    setNetworkConfig(networkConfig);

    if ((await provider?.getCode(CollectionConfig.contractAddress!)) === '0x') {
      setError(
        'Could not find the contract, are you connected to the right chain?'
      );

      return;
    }

    let contractVar = new ethers.Contract(
      CollectionConfig.contractAddress!,
      ContractAbi,
      provider?.getSigner()
    ) as unknown as NftContractType;

    setContract(contractVar);
    setMaxSupply((await contractVar.maxSupply()).toNumber());
    setTotalSupply((await contractVar.totalSupply()).toNumber());
    setMaxMintAmountPerTx((await contractVar.maxMintAmountPerTx()).toNumber());
    setTokenPrice(await contractVar.cost());
    setIsPaused(await contractVar.paused());
    setIsWhitelistMintEnabled(await contractVar.whitelistMintEnabled());
    setIsUserInWhitelist(Whitelist.contains(userAddress ?? ''));
  };

  const registerWalletEvents = (browserProvider: ExternalProvider): void => {
    // @ts-ignore
    browserProvider.on('accountsChanged', () => {
      initWallet();
    });

    // @ts-ignore
    browserProvider.on('chainChanged', () => {
      window.location.reload();
    });
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="mb-8 flex justify-between z-0">
        <h1 className="sm:text-xl font-semibold textGradientReverse z-50">Mint Demons Gaze</h1>
        <h1 className="sm:text-xl font-medium text-white">View Contract -{'>'}</h1>
      </div>
      <div className="h-[0px] w-[0px] absolute lalalala3 left-0 bottom-90 mt-32"></div>
      
      <div className=" glossy text-white p-10 z-20">
        {/* {isNotMainnet() ? (
          <div className="not-mainnet">
            You are not connected to the main network.
            <span className="small">
              Current network: <strong>{network?.name}</strong>
            </span>
          </div>
        ) : null} */}

        {errorMessage ? (
          <div className="error">
            <p>{errorMessage}</p>
            <button onClick={() => setError()}>Close</button>
          </div>
        ) : null}

        {userAddress ? (
          <>
            {contract !== undefined ? (
              <>
                <CollectionStatus
                  userAddress={userAddress}
                  maxSupply={maxSupply}
                  totalSupply={totalSupply}
                  isPaused={isPaused}
                  isWhitelistMintEnabled={isWhitelistMintEnabled}
                  isUserInWhitelist={isUserInWhitelist}
                />
                {totalSupply < maxSupply ? (
                  <MintWidget
                    maxSupply={maxSupply}
                    totalSupply={totalSupply}
                    tokenPrice={tokenPrice}
                    maxMintAmountPerTx={maxMintAmountPerTx}
                    isPaused={isPaused}
                    isWhitelistMintEnabled={isWhitelistMintEnabled}
                    isUserInWhitelist={isUserInWhitelist}
                    mintTokens={(mintAmount) => mintTokens(mintAmount)}
                    whitelistMintTokens={(mintAmount) =>
                      whitelistMintTokens(mintAmount)
                    }
                  />
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
                    .
                  </div>
                )}
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
          </>
        ) : null}

        {!userAddress || !isSoldOut() ? (
          <div className="no-wallet">
            {!userAddress ? (
              <button
                className="w-[152px]  font-bold py-1.5 px-3 text-white hover:opacity-75 transition-opacity duration-300 active:translate-y-0.1 active:shadow-none active:opacity-90
                bg-gradient-to-r from-dexfi-pink to-dexfi-cyan"
                disabled={provider === undefined}
                onClick={() => connectWallet()}
              >
                Connect Wallet
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Dapp;
