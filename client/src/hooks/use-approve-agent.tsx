import { useMutation } from "@tanstack/react-query";
import { approveAgent } from "@/api/vaults";
import { useEmbeddedWallet } from "@/hooks/use-embedded-wallet";

export function useApproveAgent(options = {}) {
  const wallet = useEmbeddedWallet();

  return useMutation({
    mutationFn: async (vaultId: string) => wallet && approveAgent(wallet, vaultId),
    ...options,
  });
}
