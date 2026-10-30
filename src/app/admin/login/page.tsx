"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { loginStaff } from "./actions";
import { AlertCircle, ArrowLeft } from "lucide-react";

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
    <div className="min-h-screen bg-[#F7F4ED] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block group mb-4">
          <div className="flex justify-center mb-3">
            <Image
              src="/images/brand/logo-horizontal-transparent.png"
              alt="Vaidik Ratnam"
              width={260}
              height={85}
              priority
              className="h-12 w-auto object-contain"
            />
          </div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-semibold block">
            Business Operations Portal
          </span>
        </Link>
        <h2 className="font-serif text-xl font-normal text-[#182522]">
          Staff Authentication
        </h2>
        <p className="text-xs text-[#626A65] mt-1">
          Authorized family operations &amp; shop management only.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <Card className="p-8 bg-white shadow-sm border border-[#E5DFD5]">
          {errorMsg && (
            <div className="p-3.5 mb-5 bg-[#FFF0F0] border border-[#FFD0D0] text-xs text-[#A61C1C] flex items-center gap-2 rounded-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
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
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="w-full text-xs uppercase tracking-wider font-semibold"
              >
                Sign In to Dashboard &rarr;
              </Button>
            </div>
          </form>

          {/* Initial Bootstrap Demo Credentials Box */}
          <div className="mt-6 pt-5 border-t border-[#E5DFD5] text-center">
            <div className="p-3 bg-[#EEF3EE] rounded-xs border border-[#C5D5C4] text-[11px] text-[#173B32] text-left space-y-1">
              <strong className="block font-semibold">Initial Owner Bootstrap Account:</strong>
              <p>Email: <code className="font-mono bg-white px-1 py-0.5 rounded-xs">admin@vaidikratnam.com</code></p>
              <p>Password: <code className="font-mono bg-white px-1 py-0.5 rounded-xs">AdminVaidik2026!</code></p>
              <p className="text-[10px] text-[#626A65] mt-1">
                (Please change password in settings after first login in production).
              </p>
            </div>
          </div>
        </Card>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#626A65] hover:text-[#182522] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Studio Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
