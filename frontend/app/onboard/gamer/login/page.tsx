"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useConnect } from "wagmi";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

type LoginStatus = "idle" | "connecting" | "signing-in" | "success" | "error";
function WalletConnectButton(props: {
  onConnected: (address: string) => void;
  disabled?: boolean;
}) {
  const { onConnected, disabled } = props;
  const { address, status } = useAccount();
  const { connect, connectors, error, isPending } = useConnect();
  const [localError, setLocalError] = useState<string | null>(null);

  const handleConnect = () => {
    setLocalError(null);

    if (!connectors || connectors.length === 0) {
      setLocalError("No wallet connectors available. Check your Wagmi config.");
      return;
    }

    const preferred =
      connectors.find((c) => c.id === "walletConnect") ?? connectors[0];

    connect({ connector: preferred });
  };

  useEffect(() => {
    if (address) {
      onConnected(address);
    }
  }, [address, onConnected]);

  const isBusy =
    disabled ||
    isPending ||
    status === "connecting" ||
    status === "reconnecting";

  const label = (() => {
    if (address) {
      return `Wallet connected: ${address.slice(0, 6)}...${address.slice(-4)}`;
    }
    if (isBusy) {
      return "Connecting wallet…";
    }
    return "Connect Core / EVM wallet";
  })();

  return (
    <div className="space-y-2">
      <Button
        className="w-full rounded-full px-5 py-2.5 text-sm font-semibold cursor-pointer"
        onClick={handleConnect}
        disabled={isBusy}
      >
        {label}
      </Button>
      {error && (
        <p className="text-xs text-destructive">
          {error.message ?? "Failed to connect wallet."}
        </p>
      )}
      {localError && <p className="text-xs text-destructive">{localError}</p>}
    </div>
  );
}

export default function GamerLoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const { address } = useAccount();

  const [status, setStatus] = useState<LoginStatus>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleWalletConnected = useCallback(
    async (walletAddress: string) => {
      setStatus("signing-in");
      setMessage(null);

      try {
        await signIn(walletAddress);
        setStatus("success");
        setMessage("Signed in. Redirecting you to avax.exe…");
        router.push("/dashboard");
      } catch (err) {
        console.error(err);
        setStatus("error");
        setMessage("Unable to sign in with this wallet right now.");
      }
    },
    [router, signIn],
  );

  useEffect(() => {
    if (!address || status !== "idle") return;

    const id = setTimeout(() => {
      void handleWalletConnected(address);
    }, 0);
    return () => clearTimeout(id);
  }, [address, handleWalletConnected, status]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-neutral-800 bg-neutral-950/90 p-6 shadow-[0_0_60px_rgba(232,65,66,0.18)]">
        <div className="space-y-3 text-center mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">
            Avalanche player login
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">
            Sign back into avax<span className="text-red-500">.exe</span>
          </h1>
          <p className="text-sm text-neutral-400">
            Connect the same Core or EVM wallet you used during onboarding to
            access your profile, squads, and sessions.
          </p>
        </div>

        <div className="space-y-4">
          <WalletConnectButton
            onConnected={handleWalletConnected}
            disabled={status === "signing-in"}
          />

          <Button
            className="w-full rounded-full px-5 py-2.5 text-xs font-medium border border-neutral-700 bg-neutral-900 text-neutral-300 hover:bg-neutral-800 cursor-pointer"
            variant="outline"
            onClick={() => router.push("/onboard/gamer/connect")}
          >
            New here? Create your Avalanche player profile
          </Button>

          {message && (
            <p
              className={`text-xs text-center ${
                status === "error" ? "text-destructive" : "text-neutral-300"
              }`}
            >
              {message}
            </p>
          )}

          <p className="mt-2 text-[11px] text-neutral-500 text-center">
            We don&apos;t take custody of your keys. Your wallet simply proves
            it&apos;s you so we can load your stats and social graph.
          </p>
        </div>
      </div>
    </div>
  );
}
