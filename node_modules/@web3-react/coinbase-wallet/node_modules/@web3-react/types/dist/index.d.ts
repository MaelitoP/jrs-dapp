/// <reference types="node" />
import type { EventEmitter } from 'node:events';
import type { State, StoreApi } from 'zustand/vanilla';
export interface Web3ReactState extends State {
    chainId: number | undefined;
    accounts: string[] | undefined;
    activating: boolean;
    error: Error | undefined;
}
export declare type Web3ReactStore = StoreApi<Web3ReactState>;
export declare type Web3ReactStateUpdate = {
    chainId: number;
    accounts: string[];
} | {
    chainId: number;
    accounts?: never;
} | {
    chainId?: never;
    accounts: string[];
};
export interface Actions {
    startActivation: () => () => void;
    update: (stateUpdate: Web3ReactStateUpdate) => void;
    reportError: (error: Error | undefined) => void;
}
export interface RequestArguments {
    readonly method: string;
    readonly params?: readonly unknown[] | object;
}
export interface Provider extends EventEmitter {
    request(args: RequestArguments): Promise<unknown>;
}
export interface ProviderConnectInfo {
    readonly chainId: string;
}
export interface ProviderRpcError extends Error {
    message: string;
    code: number;
    data?: unknown;
}
export interface AddEthereumChainParameter {
    chainId: number;
    chainName: string;
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: 18;
    };
    rpcUrls: string[];
    blockExplorerUrls?: string[];
    iconUrls?: string[];
}
export declare abstract class Connector {
    /**
     * An
     * EIP-1193 ({@link https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md}) and
     * EIP-1102 ({@link https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1102.md}) compliant provider.
     * May also comply with EIP-3085 ({@link https://github.com/ethereum/EIPs/blob/master/EIPS/eip-3085.md}).
     * This property must be defined while the connector is active.
     */
    provider: Provider | undefined;
    protected readonly actions: Actions;
    /**
     * @param actions - Methods bound to a zustand store that tracks the state of the connector.
     * Actions are used by the connector to report changes in connection status.
     */
    constructor(actions: Actions);
    /**
     * Attempt to initiate a connection, failing silently
     */
    connectEagerly?(...args: unknown[]): Promise<void> | void;
    /**
     * Initiate a connection.
     */
    abstract activate(...args: unknown[]): Promise<void> | void;
    /**
     * Initiate a disconnect.
     */
    deactivate(...args: unknown[]): Promise<void> | void;
}
