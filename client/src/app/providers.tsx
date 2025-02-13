"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrivyProvider } from "@privy-io/react-auth";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <PrivyProvider appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}>{children}</PrivyProvider>;
    </QueryClientProvider>
  );
}
