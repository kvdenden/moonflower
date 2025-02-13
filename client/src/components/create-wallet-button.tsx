"use client";

import { useEffect, useMemo } from "react";
import { useCreateWallet, usePrivy, useWallets } from "@privy-io/react-auth";

import { getSmartAccountAddress } from "@/web3/smartAccount";
import { Button } from "@/components/ui/button";

export function CreateWalletButton() {
  const { ready, authenticated, getAccessToken } = usePrivy();
  const { ready: walletsReady, wallets } = useWallets();
  const { createWallet } = useCreateWallet();

  const embeddedWallet = useMemo(() => wallets.find((wallet) => wallet.walletClientType === "privy"), [wallets]);

  useEffect(() => {
    if (!walletsReady) return;
    if (!embeddedWallet) createWallet();
  }, [walletsReady, embeddedWallet, createWallet]);

  const disabled = !ready || (ready && !authenticated);

  const registerVault = async (index: number = 0) => {
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

    if (response.ok) {
      console.log("Wallet created");
    } else {
      console.error("Failed to create wallet");
    }
  };

  return (
    <Button onClick={() => registerVault()} disabled={disabled}>
      Create wallet
    </Button>
  );
}

export default CreateWalletButton;
