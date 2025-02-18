import { usePrivy } from "@privy-io/react-auth";
import { useQuery } from "@tanstack/react-query";
import { fetchWorkflows } from "@/api/workflows";

export function useWorkflows(vaultId: string) {
  const { ready, authenticated } = usePrivy();

  return useQuery({
    queryKey: ["workflows", vaultId],
    queryFn: async () => fetchWorkflows(vaultId),
    enabled: ready && authenticated,
  });
}
