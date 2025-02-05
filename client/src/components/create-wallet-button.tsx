"use client";

import { Button } from "@/components/ui/button";
import { usePrivy } from "@privy-io/react-auth";

export default function CreateWalletButton() {
  const { getAccessToken } = usePrivy();

  const createWallet = async () => {
    const accessToken = await getAccessToken();
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/wallets", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      console.log("Wallet created");
    } else {
      console.error("Failed to create wallet");
    }
  };

  return <Button onClick={createWallet}>Create wallet</Button>;
}
