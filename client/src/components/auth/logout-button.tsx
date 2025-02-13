"use client";

import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const { ready, authenticated, logout } = usePrivy();

  const disabled = !ready || (ready && !authenticated);

  return (
    <Button onClick={logout} disabled={disabled}>
      Log out
    </Button>
  );
}

export default LogoutButton;
