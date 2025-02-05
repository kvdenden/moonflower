"use client";

import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const { ready, authenticated, logout } = usePrivy();

  const disabled = !ready || (ready && !authenticated);

  return (
    <Button onClick={logout} disabled={disabled}>
      Log out
    </Button>
  );
}
