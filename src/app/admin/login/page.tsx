"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { loginStaff } from "./actions";
import { AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await loginStaff({ email, password });
      if (res.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setErrorMsg(res.message || "Invalid credentials.");
      }
    } catch {
      setErrorMsg("An unexpected network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#04170f] text-[#faf7f0] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-radial from-[#0a2a1d] via-[#04170f] to-[#04170f] pointer-events-none opacity-80" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
        <Link href="/" className="inline-block group mb-4">
          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 rounded-2xl bg-[#0a2a1d] border border-[#d4af37]/60 flex items-center justify-center p-1 shadow-xl">
              <Image
                src="/images/brand/app-icon-emerald-256.png"
                alt="Vaidik Ratnam"
                width={56}
                height={56}
                priority
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#d4af37] font-mono font-semibold block">
            Business Operations Portal
          </span>
        </Link>
        <h2 className="font-serif text-2xl font-normal text-white">
          Staff Authentication
        </h2>
        <p className="text-xs text-[#a8b6af] mt-1 font-light">
          Authorized family operations &amp; shop management only.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 relative z-10">
        <Card className="p-8 bg-[#0a2a1d] shadow-2xl border border-[#d4af37]/40 rounded-3xl">
          {errorMsg && (
            <div className="p-3.5 mb-5 caution-ruby-glass text-xs text-[#fca5a5] flex items-center gap-2 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#f87171]" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Staff Email"
              type="email"
              required
              placeholder="e.g. admin@vaidikratnam.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="gold"
                size="lg"
                isLoading={isLoading}
                className="w-full text-xs uppercase tracking-wider font-semibold shadow-lg"
              >
                Sign In to Dashboard &rarr;
              </Button>
            </div>
          </form>

          {/* Initial Bootstrap Demo Credentials Box */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <div className="p-3 bg-[#04170f] rounded-xl border border-[#d4af37]/30 text-[11px] text-[#a8b6af] text-left space-y-1">
              <strong className="block font-semibold text-[#f1d98a]">Initial Owner Bootstrap Account:</strong>
              <p>Email: <code className="font-mono bg-[#0a2a1d] text-[#d4af37] px-1.5 py-0.5 rounded-md border border-[#d4af37]/20">admin@vaidikratnam.com</code></p>
              <p>Password: <code className="font-mono bg-[#0a2a1d] text-[#d4af37] px-1.5 py-0.5 rounded-md border border-[#d4af37]/20">AdminVaidik2026!</code></p>
              <p className="text-[10px] text-[#a8b6af]/70 mt-1">
                (Please change password in settings after first login in production).
              </p>
            </div>
          </div>
        </Card>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-[#d4af37] hover:text-[#f6e7b4] font-mono tracking-wider transition-colors"
          >
            &larr; Return to Public Showroom
          </Link>
        </div>
      </div>
    </div>
  );
}
