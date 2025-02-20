import { useMutation } from "@tanstack/react-query";
import { registerVault } from "@/api/vaults";
import { useEmbeddedWallet } from "@/hooks/use-embedded-wallet";

export function useRegisterVault(options = {}) {
  const wallet = useEmbeddedWallet();

  return useMutation({
    mutationFn: async (index: number) => wallet && registerVault(wallet, index),
    ...options,
  });
}
