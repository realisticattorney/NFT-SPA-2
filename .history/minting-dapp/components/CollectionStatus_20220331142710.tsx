import React from 'react';

interface Props {
  userAddress: string | null;
  totalSupply: number;
  maxSupply: number;
  isPaused: boolean;
  isWhitelistMintEnabled: boolean;
  isUserInWhitelist: boolean;
}

interface State {}

const defaultState: State = {};

export default class CollectionStatus extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = defaultState;
  }

  private isSaleOpen(): boolean {
    return this.props.isWhitelistMintEnabled || !this.props.isPaused;
  }

  render() { 
    return (
      <>
        <div className="text-3xl font-bold mb-6">
          <span className="font-sans2">Total Minted: </span>
          <span className="font-sans2 text-cyan-300">
            {this.props.totalSupply} / {this.props.maxSupply}
          </span>
        </div>
        <div className="collection-status">
          {/* <div className="user-address">
            <span className="label">Wallet address:</span>
            <span className="address">{this.props.userAddress}</span>
          </div> */}

          {/* <div className="current-sale">
            <span className="label">Sale status</span>
            {this.isSaleOpen() ? (
              <>
                {this.props.isWhitelistMintEnabled ? 'Whitelist only' : 'Open'}
              </>
            ) : (
              'Closed'
            )}
          </div> */}
        </div>
      </>
    );
  }
}
