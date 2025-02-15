import { Button } from "@/components/ui/button"; // adjust import paths as needed
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // adjust import paths as needed
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"; // adjust import paths as needed
import { useVault } from "@/hooks/use-vault";

import { Copy, Wallet, CheckCircle2, XCircle, ArrowUpRight, ArrowDownRight } from "lucide-react";
import Spinner from "./spinner";

export default function VaultCard({ vaultId }: { vaultId: string }) {
  const { data: vault, isPending } = useVault(vaultId);

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!vault) return null;

  // Dummy function for formatting addresses
  const formatAddress = (address: string) => address.slice(0, 6) + "..." + address.slice(-4);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div>
            <CardTitle className="text-2xl font-bold">{vault.title}</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="text-sm text-muted-foreground flex items-center">
                  {formatAddress(vault.address)}
                  <Copy className="ml-2 h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{vault.address}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="mt-4 sm:mt-0">
            <p className="text-sm font-medium text-muted-foreground mb-1">Total Balance</p>
            <p className="text-3xl font-bold">$69,420</p>
          </div>
        </div>
        <Card className="bg-muted">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center mb-4 sm:mb-0">
                <Wallet className="h-5 w-5 mr-2 text-primary" />
                <div>
                  <p className="text-sm font-medium">Agent Wallet</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="text-sm text-muted-foreground">
                        {formatAddress(vault.agentWallet.address)}
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{vault.agentWallet.address}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="flex items-center">
                {vault.agentWallet.approved ? (
                  <div className="flex items-center text-green-500">
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    <span className="font-medium">Approved</span>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="flex items-center text-yellow-500">
                      <XCircle className="h-5 w-5 mr-2" />
                      <span className="font-medium">Not Approved</span>
                    </div>
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Approve Wallet
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </CardHeader>
    </Card>
  );
}
