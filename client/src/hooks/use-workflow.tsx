import { usePrivy } from "@privy-io/react-auth";
import { useQuery } from "@tanstack/react-query";
import { fetchWorkflow } from "@/api/workflows";

export function useWorkflow(workflowId: string) {
  const { ready, authenticated } = usePrivy();

  return useQuery({
    queryKey: ["workflow", workflowId],
    queryFn: async () => fetchWorkflow(workflowId),
    enabled: ready && authenticated,
  });
}
