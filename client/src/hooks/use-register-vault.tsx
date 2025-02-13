import { getSmartAccountAddress } from "@/web3/smartAccount";
import { getAccessToken, useWallets } from "@privy-io/react-auth";
import { useMutation } from "@tanstack/react-query";

export function useRegisterVault(options = {}) {
  const { wallets } = useWallets();

  const registerVault = async (index: number) => {
    const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === "privy");
    if (!embeddedWallet) {
      throw new Error("Privy wallet not found");
    }

    const smartAccountAddress = await getSmartAccountAddress(embeddedWallet.address as `0x${string}`, BigInt(index));

    const accessToken = await getAccessToken();
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/vaults", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        index,
        address: smartAccountAddress,
      }),
    });

    if (!response.ok) throw new Error("Failed to register vault");

    const vault = await response.json();
    return vault as { id: string };
  };

  return useMutation({
    mutationFn: (index: number) => registerVault(index),
    ...options,
  });
}
