"use client";

import { PrivyProvider } from "@privy-io/react-auth";
// import { SmartWalletsProvider } from "@privy-io/react-auth/smart-wallets";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}>
      {/* <SmartWalletsProvider> */}
      {children}
      {/* </SmartWalletsProvider> */}
    </PrivyProvider>
  );
}
