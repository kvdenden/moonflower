import { useMutation } from "@tanstack/react-query";
import { createWorkflow } from "@/api/workflows";

export function useCreateWorkflow(options = {}) {
  return useMutation({
    mutationFn: async (vaultId: string) => createWorkflow(vaultId),
    ...options,
  });
}
