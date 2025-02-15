"use client";

import { FilePlus, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";

import { useVaults } from "@/hooks/use-vaults";
import { useRegisterVault } from "@/hooks/use-register-vault";
import { max } from "lodash";

export default function Dashboard() {
  const { data: vaults = [], refetch, isPending } = useVaults();
  const { mutate: registerVault, isPending: isRegistrationPending } = useRegisterVault({
    onSuccess: () => refetch(),
  });

  const nextVaultIndex = max(vaults.map((v) => v.index + 1)) ?? 0;

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // if (vaults.length === 0) {
  return (
    <div className="flex flex-col space-y-4 p-8">
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <Card className="max-w-md w-full text-center shadow">
          <CardHeader>
            <CardTitle className="text-xl font-bold">No Vaults Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              You haven&apos;t created any vaults yet. Vaults are smart wallets that allow you to securely store your
              assets and set up automated workflows.
            </p>
            <Button className="w-full" disabled={isRegistrationPending} onClick={() => registerVault(nextVaultIndex)}>
              {isRegistrationPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4" /> Creating Vault...
                </>
              ) : (
                <>
                  <FilePlus className="mr-2 h-4 w-4" /> Create Your First Vault
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
  // }

  return (
    <div className="flex flex-col space-y-4 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Main Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {vaults.map((vault) => (
          <Card key={vault.id} className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Vault {vault.id}</h3>
              <div className="text-2xl font-bold">{vault.address}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
