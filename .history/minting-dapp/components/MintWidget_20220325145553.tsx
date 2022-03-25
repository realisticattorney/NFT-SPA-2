import { utils, BigNumber } from 'ethers';
import React from 'react';

interface Props {
  maxSupply: number;
  totalSupply: number;
  tokenPrice: BigNumber;
  maxMintAmountPerTx: number;
  isPaused: boolean;
  isWhitelistMintEnabled: boolean;
  isUserInWhitelist: boolean;
  mintTokens(mintAmount: number): Promise<void>;
  whitelistMintTokens(mintAmount: number): Promise<void>;
}

interface State {
  mintAmount: number;
}

const defaultState: State = {
  mintAmount: 1,
};

export default class MintWidget extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = defaultState;
  }

  private canMint(): boolean {
    return !this.props.isPaused || this.canWhitelistMint();
  }

  private canWhitelistMint(): boolean {
    return this.props.isWhitelistMintEnabled && this.props.isUserInWhitelist;
  }

  private incrementMintAmount(): void {
    this.setState({
      mintAmount: Math.min(
        this.props.maxMintAmountPerTx,
        this.state.mintAmount + 1
      ),
    });
  }

  private decrementMintAmount(): void {
    this.setState({
      mintAmount: Math.max(1, this.state.mintAmount - 1),
    });
  }

  private async mint(): Promise<void> {
    if (!this.props.isPaused) {
      await this.props.mintTokens(this.state.mintAmount);

      return;
    }

    await this.props.whitelistMintTokens(this.state.mintAmount);
  }

  render() {
    return (
      <>
        {this.canMint() ? (
          <div className="flex flex-col">
            {/* <div className="preview">
              <img src="/build/images/preview.png" alt="Collection preview" />
            </div> */}

            <div className="flex-col flex">
              <div className="flex justify-between">
                <div className="borderGradient">
                  <button
                    className="px-4 py-2 my-0.5 ml-0.5 bg-gradient-to-r from-dexfi-cyan to-dexfi-pink"
                    onClick={() => this.decrementMintAmount()}
                  >
                    -
                  </button>
                  <div className="inline-flex w-[150px]">
                    <h1 className="text-center w-full font-semibold">
                      {this.state.mintAmount}
                    </h1>
                  </div>
                  <button
                    className="px-4 py-2 mr-0.5  bg-gradient-to-r from-dexfi-cyan to-dexfi-pink"
                    onClick={() => this.incrementMintAmount()}
                  >
                    +
                  </button>
                </div>
                <div className="text-gray-300 font-medium md:mr-10 inline-block">
                  {utils.formatEther(
                    this.props.tokenPrice.mul(this.state.mintAmount)
                  )}{' '}
                  ETH + Gas Fee
                  <h1>Max 5 Demons per trasaction</h1>
                </div>
              </div>
              <div className="borderGradient w-min mt-10">
                <button
                  className="w-[132px]  font-bold py-1 px-5 text-white hover:opacity-75 transition-opacity duration-300 active:translate-y-0.1 active:shadow-none active:opacity-90
               bg-gradient-to-r from-dexfi-pink to-dexfi-cyan"
                  onClick={() => this.mint()}
                >
                  Mint
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="cannot-mint">
            <span className="emoji">⏳</span>
            {this.props.isWhitelistMintEnabled ? (
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
  }
}
