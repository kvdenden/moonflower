import { usePrivy } from "@privy-io/react-auth";
import { useQuery } from "@tanstack/react-query";

export function useVaults() {
  const { ready, authenticated, getAccessToken } = usePrivy();

  const fetchVaults = async () => {
    const accessToken = await getAccessToken();
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/vaults", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to fetch vaults");
    }
  };

  return useQuery({
    queryKey: ["vaults"],
    queryFn: fetchVaults,
    enabled: ready && authenticated,
  });
}
