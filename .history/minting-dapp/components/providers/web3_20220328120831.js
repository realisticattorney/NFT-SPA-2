const {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} = require('react');
import { ethers } from 'ethers';
import Moralis from 'moralis';
// import { registryAddress, scammExchangeAddress } from '../../config-local.js';
// import Registry from '../../utils/Registry.json';
// import Exchange from '../../utils/Exchange.json';
const ContractAbi = require('../../../smart-contract/artifacts/contracts/' +
  CollectionConfig.contractName +
  '.sol/' +
  CollectionConfig.contractName +
  '.json').abi;


const Web3Context = createContext(null);
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
export default function Web3Provider({ children }) {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    exchangeBunny: null,
    registry: null,
    exchangeCurrent: null,
  });

  useEffect(() => {
    Moralis.onChainChanged(function (chain) {
      setWeb3Api((api) => ({ ...api, chainId: chain }));
    });
  }, []);

  useEffect(() => {
    const loadProvider = async () => {
      let provider;
      let chainId;
      if (window.ethereum) {
        provider = await Moralis.enableWeb3();
        chainId = Moralis.chainId;
      }
      if (!window.ethereum || chainId !== '0x4') {
        const url = `https://eth-rinkeby.alchemyapi.io/v2/${API_KEY}`;
        provider = new ethers.providers.JsonRpcProvider(url);
      }
      if (provider) {
        const registry = new ethers.Contract(
          registryAddress,
          Registry.abi,
          provider
        );

        const exchangeBunny = new ethers.Contract(
          scammExchangeAddress,
          Exchange.abi,
          provider
        );
        const exchangeBalance = ethers.utils.formatEther(
          await provider.getBalance(exchangeBunny.address)
        );
        const getReserve = ethers.utils.formatEther(
          await exchangeBunny.getReserve()
        );
        const totalSupply = ethers.utils.formatEther(
          await exchangeBunny.totalSupply()
        );
        setWeb3Api({
          provider,
          registry,
          chainId,
          slippage: 0.5,
          txSpeed: 5,
          accountERC20Balance: 0,
          exchangeBunny: {
            balance: exchangeBalance,
            reserve: getReserve,
            totalSupply,
            contract: exchangeBunny,
          },
          exchangeCurrent: {
            balance: exchangeBalance,
            reserve: getReserve,
            totalSupply,
            contract: exchangeBunny,
          },
        });
      } else {
        setWeb3Api((api) => ({ ...api, isLoading: false }));
        console.error('Please, install Metamask.');
      }
    };

    loadProvider();
  }, []);

  const _web3Api = useMemo(() => {
    return {
      ...web3Api,
      switchNetwork: async (tokenBalance) => {
        setWeb3Api((api) => ({
          ...api,
          accountERC20Balance: tokenBalance,
        }));
      },
      setSlippage: (slippage) => {
        setWeb3Api((api) => ({ ...api, slippage }));
      },
      setTxSpeed: (txSpeed) => {
        setWeb3Api((api) => ({ ...api, txSpeed }));
      },
      setExchangeCurrent: async (exchange) => {
        let newExchangeAddress = await web3Api.registry
          .getExchange(exchange)
          .catch((e) => console.log(e));
        const newExchange = new ethers.Contract(
          newExchangeAddress,
          Exchange.abi,
          web3Api.provider
        );

        const exchangeBalance = ethers.utils.formatEther(
          await web3Api.provider.getBalance(newExchange.address)
        );
        const getReserve = ethers.utils.formatEther(
          await newExchange.getReserve()
        );
        const totalSupply = ethers.utils.formatEther(
          await newExchange.totalSupply()
        );
        setWeb3Api((api) => ({
          ...api,
          exchangeCurrent: {
            balance: exchangeBalance,
            reserve: getReserve,
            totalSupply,
            contract: newExchange,
          },
        }));
      },
    };
  }, [web3Api]);

  return (
    <Web3Context.Provider value={_web3Api}>{children}</Web3Context.Provider>
  );
}

export function useWeb3() {
  return useContext(Web3Context);
}

export async function useExchange(exchange) {
  const { setExchangeCurrent } = useWeb3();
  await setExchangeCurrent(exchange);
}

export function useHooks(cb) {
  const { hooks } = useWeb3();
  return cb(hooks);
}