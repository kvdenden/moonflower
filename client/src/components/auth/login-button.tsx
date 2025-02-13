"use client";

import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";

export function LoginButton() {
  const { ready, authenticated, login } = usePrivy();

  const disabled = !ready || (ready && authenticated);

  return (
    <Button onClick={login} disabled={disabled}>
      Log in
    </Button>
  );
}

export default LoginButton;
