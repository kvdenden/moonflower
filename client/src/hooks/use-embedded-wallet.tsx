import { getEmbeddedConnectedWallet, useWallets } from "@privy-io/react-auth";

export function useEmbeddedWallet() {
  const { wallets } = useWallets();

  return getEmbeddedConnectedWallet(wallets);
}
