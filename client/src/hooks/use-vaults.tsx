import { usePrivy } from "@privy-io/react-auth";
import { useQuery } from "@tanstack/react-query";
import { fetchVaults } from "@/api/vaults";

export function useVaults() {
  const { ready, authenticated } = usePrivy();

  return useQuery({
    queryKey: ["vaults"],
    queryFn: async () => fetchVaults(),
    enabled: ready && authenticated,
  });
}
