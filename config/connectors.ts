import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'

export const injected = new InjectedConnector({
  supportedChainIds: [1, 4],
})

export const walletconnect = new WalletConnectConnector({
  rpc: ['https://api.etherscan.io/', 'https://api-rinkeby.etherscan.io/'],
  chainId: 4,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
})

export const walletlink = new WalletLinkConnector({
  url: 'https://api-rinkeby.etherscan.io/',
  appName: 'web3-react example',
  supportedChainIds: [1, 4],
})
