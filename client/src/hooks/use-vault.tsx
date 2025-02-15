import { usePrivy } from "@privy-io/react-auth";
import { useQuery } from "@tanstack/react-query";
import { fetchVault } from "@/api/vaults";

export function useVault(vaultId: string) {
  const { ready, authenticated } = usePrivy();

  return useQuery({
    queryKey: ["vault", vaultId],
    queryFn: async () => fetchVault(vaultId),
    enabled: ready && authenticated,
  });
}
