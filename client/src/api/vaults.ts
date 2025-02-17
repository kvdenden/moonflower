import { approveSessionKey, getSmartAccountAddress } from "@/web3/smartAccount";
import { ConnectedWallet, getAccessToken } from "@privy-io/react-auth";
import { EIP1193Provider } from "viem";

type Vault = {
  id: string;
  index: number;
  address: `0x${string}`;
  title: string;
  agentWallet?: {
    address: `0x${string}`;
    approved: boolean;
  };
};

type Workflow = {
  id: string;
};

function toVault(data: {
  id: string;
  index: number;
  address: `0x${string}`;
  agentWallet: { id: string; address: `0x${string}`; approval: string | null };
}): Vault {
  return {
    id: data.id,
    index: data.index,
    address: data.address,
    title: `Vault ${data.index}`,
    agentWallet: { address: data.agentWallet.address, approved: !!data.agentWallet.approval },
  } as Vault;
}

function toWorkflow(data: { id: string }): Workflow {
  return {
    id: data.id,
  } as Workflow;
}

export async function fetchVaults() {
  const accessToken = await getAccessToken();
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/vaults", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) throw new Error("Failed to fetch vaults");

  const vaults: [] = await response.json();
  return vaults.map((v) => toVault(v));
}

export async function fetchVault(vaultId: string) {
  const accessToken = await getAccessToken();
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/vaults/${vaultId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) throw new Error("Failed to fetch vaults");

  const vault = await response.json();
  return toVault(vault);
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

export async function registerVault(wallet: ConnectedWallet, index: number) {
  const smartAccountAddress = await getSmartAccountAddress(wallet.address as `0x${string}`, BigInt(index));

  const accessToken = await getAccessToken();
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/vaults", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      index,
      address: smartAccountAddress,
    }),
  });

  if (!response.ok) throw new Error("Failed to register vault");

  const vault = await response.json();
  return toVault(vault);
}

export async function approveAgent(wallet: ConnectedWallet, vaultId: string) {
  const vault = await fetchVault(vaultId);

  const provider = (await wallet.getEthereumProvider()) as EIP1193Provider;
  const approval = await approveSessionKey(vault.agentWallet.address, provider, BigInt(vault.index));

  const accessToken = await getAccessToken();
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/vaults/${vaultId}/approve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      approval,
    }),
  });

  if (!response.ok) throw new Error("Failed to approve agent");
}
