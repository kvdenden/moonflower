import { useMutation } from "@tanstack/react-query";
import { executeWorkflow } from "@/api/workflows";

export function useExecuteWorkflow(options = {}) {
  return useMutation({
    mutationFn: async (workflowId: string) => executeWorkflow(workflowId),
    ...options,
  });
}
