import type { CoinbaseWalletProvider, CoinbaseWalletSDK } from '@coinbase/wallet-sdk';
import type { Actions, AddEthereumChainParameter } from '@web3-react/types';
import { Connector } from '@web3-react/types';
declare type CoinbaseWalletSDKOptions = ConstructorParameters<typeof CoinbaseWalletSDK>[0] & {
    url: string;
};
export declare class CoinbaseWallet extends Connector {
    /** {@inheritdoc Connector.provider} */
    provider: CoinbaseWalletProvider | undefined;
    private readonly options;
    private eagerConnection?;
    /**
     * A `CoinbaseWalletSDK` instance.
     */
    coinbaseWallet: CoinbaseWalletSDK | undefined;
    /**
     * @param options - Options to pass to `@coinbase/wallet-sdk`
     * @param connectEagerly - A flag indicating whether connection should be initiated when the class is constructed.
     */
    constructor(actions: Actions, options: CoinbaseWalletSDKOptions, connectEagerly?: boolean);
    private get connected();
    private isomorphicInitialize;
    /** {@inheritdoc Connector.connectEagerly} */
    connectEagerly(): Promise<void>;
    /**
     * Initiates a connection.
     *
     * @param desiredChainIdOrChainParameters - If defined, indicates the desired chain to connect to. If the user is
     * already connected to this chain, no additional steps will be taken. Otherwise, the user will be prompted to switch
     * to the chain, if one of two conditions is met: either they already have it added, or the argument is of type
     * AddEthereumChainParameter, in which case the user will be prompted to add the chain with the specified parameters
     * first, before being prompted to switch.
     */
    activate(desiredChainIdOrChainParameters?: number | AddEthereumChainParameter): Promise<void>;
    /** {@inheritdoc Connector.deactivate} */
    deactivate(): void;
}
export {};
