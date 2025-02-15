"use client";

import Spinner from "@/components/spinner";
import VaultCard from "@/components/vault-card";
import { useCurrentVault } from "@/hooks/use-current-vault";

export default function VaultPage() {
  const { data: vault, isPending } = useCurrentVault();

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!vault) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>Could not find vault</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <VaultCard vaultId={vault.id} />
    </div>
  );
}
