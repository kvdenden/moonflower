import { fetchVault } from "@/api/vaults";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export function useCurrentVault() {
  const { vaultId } = useParams<{ vaultId: string | undefined }>();

  return useQuery({
    queryKey: ["vault", vaultId],
    queryFn: async () => (vaultId ? fetchVault(vaultId) : undefined),
    enabled: vaultId !== undefined,
  });
}
