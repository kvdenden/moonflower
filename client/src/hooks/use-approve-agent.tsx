import { useMutation } from "@tanstack/react-query";
import { approveAgent } from "@/api/vaults";
import { useEmbeddedWallet } from "@/hooks/use-embedded-wallet";

export function useApproveAgent(vaultId: string, options = {}) {
  const wallet = useEmbeddedWallet();

  return useMutation({
    mutationFn: async () => wallet && approveAgent(wallet, vaultId),
    ...options,
  });
}
