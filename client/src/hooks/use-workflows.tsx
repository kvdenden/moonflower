import { usePrivy } from "@privy-io/react-auth";
import { useQuery } from "@tanstack/react-query";
import { fetchWorkflows } from "@/api/workflows";

export function useWorkflows(vaultId: string | undefined) {
  const { ready, authenticated } = usePrivy();

  return useQuery({
    queryKey: ["workflows", vaultId],
    queryFn: async () => (vaultId ? fetchWorkflows(vaultId) : undefined),
    enabled: vaultId !== undefined && ready && authenticated,
  });
}
