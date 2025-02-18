import { getAccessToken } from "@privy-io/react-auth";

type Workflow = {
  id: string;
};

function toWorkflow(data: { id: string }): Workflow {
  return {
    id: data.id,
  } as Workflow;
}

export async function fetchWorkflows(vaultId: string) {
  const accessToken = await getAccessToken();
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/vaults/${vaultId}/workflows`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) throw new Error("Failed to fetch workflows");

  const workflows: [] = await response.json();
  return workflows.map((w) => toWorkflow(w));
}

export async function fetchWorkflow(workflowId: string) {
  const accessToken = await getAccessToken();
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/workflows/${workflowId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) throw new Error("Failed to fetch workflow");

  const workflow = await response.json();
  return toWorkflow(workflow);
}

export async function executeWorkflow(workflowId: string) {
  const accessToken = await getAccessToken();
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/workflows/${workflowId}/execute`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) throw new Error("Failed to fetch workflow");
}

export async function createWorkflow(vaultId: string) {
  const accessToken = await getAccessToken();
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/vaults/${vaultId}/workflows`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) throw new Error("Failed to create workflow");

  const workflow = await response.json();
  return toWorkflow(workflow);
}
