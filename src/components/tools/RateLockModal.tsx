"use client";

import React, { useState } from "react";
import {
  Lock,
  X,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  QrCode,
  MessageCircle,
} from "lucide-react";
import { submitRateLockAction } from "@/app/actions/rate-lock";

interface RateLockModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialKarat?: "22K" | "24K" | "18K";
  rates?: {
    gold24k?: number;
    gold22k?: number;
    silver?: number;
  };
}

export function RateLockModal({
  isOpen,
  onClose,
  initialKarat = "22K",
  rates,
}: RateLockModalProps) {
  const [karat, setKarat] = useState<"22K" | "24K" | "18K">(initialKarat);
  const [weight, setWeight] = useState<number>(15);
  const [tokenAmount, setTokenAmount] = useState<number>(5000);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [paymentMode, setPaymentMode] = useState<"upi" | "shop_counter">("upi");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState<{
    referenceCode: string;
    upiUrl?: string;
  } | null>(null);

  if (!isOpen) return null;

  const gold24k = rates?.gold24k || 8150;
  const ratesMap = {
    "24K": gold24k,
    "22K": Math.round(gold24k * (22 / 24)),
    "18K": Math.round(gold24k * (18 / 24)),
  };

  const currentRate = ratesMap[karat];
  const totalValue = weight * currentRate;
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "919876543210";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!customerName.trim() || !customerPhone.trim()) {
      setErrorMessage("Please provide your name and phone number.");
      return;
    }

    setIsSubmitting(true);
    const res = await submitRateLockAction({
      customerName,
      customerPhone,
      karat,
      weightGrams: weight,
      ratePerGram: currentRate,
      tokenAmount,
      paymentMode,
    });

    setIsSubmitting(false);

    if (res.success && res.referenceCode) {
      setResult({
        referenceCode: res.referenceCode,
        upiUrl: res.upiUrl,
      });
    } else {
      setErrorMessage(res.message || "Could not complete rate lock reservation.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0a2a1d] border-2 border-[#d4af37]/60 rounded-3xl shadow-2xl p-6 sm:p-8 my-8 text-[#faf7f0]">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#a8b6af] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!result ? (
          <div>
            {/* Header */}
            <div className="border-b border-white/10 pb-4 mb-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/50 text-[#f1d98a] text-xs font-mono uppercase tracking-widest mb-2">
                <Lock className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Rate Lock Vault</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                Lock In Today&apos;s Gold Rate
              </h3>
              <p className="text-xs text-[#a8b6af] mt-1 font-light leading-relaxed">
                Shield your wedding budget against market spikes. Reserve today&apos;s rate with a refundable token advance for up to 30 days.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 mb-4 bg-[#8e1b2e]/30 border border-[#8e1b2e]/60 rounded-xl text-xs text-[#f6e7b4] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#ff8888]" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Karat selection */}
              <div>
                <label className="block text-xs font-mono text-[#d4af37] uppercase tracking-wider mb-2 font-semibold">
                  Select Purity to Lock:
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {(["22K", "24K", "18K"] as const).map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setKarat(k)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        karat === k
                          ? "bg-[#14502f] text-white border-[#d4af37] font-semibold shadow-md"
                          : "bg-[#04170f]/80 text-[#a8b6af] border-white/10 hover:border-[#d4af37]/40"
                      }`}
                    >
                      <span className="block text-sm font-serif font-bold text-[#f1d98a]">{k}</span>
                      <span className="block text-[10px] font-mono mt-0.5 text-[#c8d4cf]">
                        ₹{ratesMap[k].toLocaleString("en-IN")}/g
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight selection */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                  <label className="text-[#d4af37] uppercase tracking-wider font-semibold">
                    Weight to Lock:
                  </label>
                  <span className="font-bold text-white bg-[#04170f] px-2.5 py-0.5 rounded-lg border border-[#d4af37]/40">
                    {weight} grams
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="1"
                  value={weight}
                  onChange={(e) => setWeight(parseInt(e.target.value, 10))}
                  className="w-full accent-[#d4af37] cursor-pointer h-2 bg-[#04170f] rounded-lg"
                />
                <div className="flex gap-2 mt-2">
                  {[8, 15, 25, 50, 100].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setWeight(w)}
                      className={`text-[10px] font-mono px-2.5 py-1 rounded-lg border cursor-pointer ${
                        weight === w
                          ? "bg-[#d4af37] text-[#04170f] font-bold border-[#f1d98a]"
                          : "bg-[#04170f]/80 text-[#a8b6af] border-white/10 hover:border-[#d4af37]/40"
                      }`}
                    >
                      {w}g {w === 8 ? "(Pavan)" : ""}
                    </button>
                  ))}
                </div>
              </div>

              {/* Locked summary card */}
              <div className="p-4 bg-[#04170f]/90 rounded-xl border border-[#d4af37]/35 space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-[#a8b6af]">
                  <span>Locked Rate:</span>
                  <span className="text-[#f1d98a] font-semibold">
                    ₹{currentRate.toLocaleString("en-IN")}/g ({karat})
                  </span>
                </div>
                <div className="flex justify-between text-[#c8d4cf] pt-1 border-t border-white/10">
                  <span>Estimated Total Gold Value:</span>
                  <span className="font-bold text-white text-sm">
                    ₹{totalValue.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Token Advance */}
              <div>
                <label className="block text-xs font-mono text-[#d4af37] uppercase tracking-wider mb-2 font-semibold">
                  Token Advance Amount:
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[2500, 5000, 10000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setTokenAmount(amt)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer font-mono text-xs font-semibold ${
                        tokenAmount === amt
                          ? "bg-[#14502f] text-[#f1d98a] border-[#d4af37] shadow-md"
                          : "bg-[#04170f]/80 text-[#a8b6af] border-white/10 hover:border-[#d4af37]/40"
                      }`}
                    >
                      ₹{amt.toLocaleString("en-IN")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-mono text-[#a8b6af] uppercase tracking-wider mb-1">
                    Your Full Name:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Sharma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#04170f] border border-[#d4af37]/30 rounded-xl text-white placeholder-[#7a8a83] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-[#a8b6af] uppercase tracking-wider mb-1">
                    Mobile / WhatsApp:
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#04170f] border border-[#d4af37]/30 rounded-xl text-white placeholder-[#7a8a83] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* Payment Mode */}
              <div>
                <label className="block text-[11px] font-mono text-[#a8b6af] uppercase tracking-wider mb-1.5">
                  Advance Payment Method:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  <label className="flex items-center gap-2 p-3 rounded-xl border border-white/10 bg-[#04170f] cursor-pointer hover:border-[#d4af37]/40 transition-colors">
                    <input
                      type="radio"
                      name="paymentMode"
                      value="upi"
                      checked={paymentMode === "upi"}
                      onChange={() => setPaymentMode("upi")}
                      className="accent-[#d4af37]"
                    />
                    <span>Instant UPI (GPay/PhonePe)</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 rounded-xl border border-white/10 bg-[#04170f] cursor-pointer hover:border-[#d4af37]/40 transition-colors">
                    <input
                      type="radio"
                      name="paymentMode"
                      value="shop_counter"
                      checked={paymentMode === "shop_counter"}
                      onChange={() => setPaymentMode("shop_counter")}
                      className="accent-[#d4af37]"
                    />
                    <span>Pay at Varanasi Shop</span>
                  </label>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold-gradient text-[#04170f] py-3.5 rounded-xl text-xs font-mono uppercase tracking-widest font-bold shadow-lg cursor-pointer flex items-center justify-center gap-2 mt-4 hover:brightness-105 active:scale-[0.98] transition-all gold-shimmer-sweep"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>
                  {isSubmitting
                    ? "Locking Rate..."
                    : `Confirm Rate Lock & Reserve (₹${tokenAmount.toLocaleString("en-IN")})`}
                </span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#a8b6af] pt-1 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
                <span>100% Refundable or Adjustable Against Final Jewellery Invoice</span>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="space-y-6 text-center py-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#10b981]/15 border border-[#10b981]/50 text-[#10b981] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-9 h-9 text-[#10b981]" />
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#d4af37] font-semibold block">
                Rate Lock Confirmed &bull; Reference Code
              </span>
              <h3 className="font-mono text-3xl font-bold text-white tracking-wider mt-1.5">
                {result.referenceCode}
              </h3>
              <p className="text-xs text-[#a8b6af] mt-2 font-light max-w-sm mx-auto">
                {weight}g of {karat} Gold locked at <strong className="text-[#f1d98a]">₹{currentRate.toLocaleString("en-IN")}/g</strong> for customer {customerName}.
              </p>
            </div>

            {/* UPI Payment Trigger */}
            {paymentMode === "upi" && result.upiUrl && (
              <div className="p-5 bg-[#04170f] rounded-2xl border-2 border-[#d4af37]/60 space-y-3 shadow-xl">
                <span className="text-xs font-mono font-semibold text-[#f1d98a] block uppercase tracking-wider">
                  Complete Token Advance: ₹{tokenAmount.toLocaleString("en-IN")}
                </span>
                <p className="text-[11px] text-[#a8b6af]">
                  Click below to open Google Pay, PhonePe, Paytm, or BHIM on your mobile phone:
                </p>
                <a
                  href={result.upiUrl}
                  className="bg-gold-gradient text-[#04170f] py-3 px-4 rounded-xl text-xs font-mono uppercase tracking-wider font-bold inline-flex items-center justify-center gap-2 w-full shadow-lg hover:brightness-105 transition-all"
                >
                  <QrCode className="w-4 h-4 text-[#04170f]" />
                  <span>Pay ₹{tokenAmount.toLocaleString("en-IN")} via UPI App</span>
                </a>
              </div>
            )}

            {/* WhatsApp verification button */}
            <div className="space-y-3 pt-2">
              <a
                href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
                  `Namaste Vaidik Ratnam, I have booked a Rate Lock on your website.\nReference: ${result.referenceCode}\nCustomer: ${customerName}\nLocked: ${weight}g of ${karat} @ ₹${currentRate}/g\nToken Advance: ₹${tokenAmount}\nPlease confirm reservation.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#14502f] hover:bg-[#1a663c] border border-[#25D366]/40 text-white font-mono py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Confirm on Shop WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 text-xs font-mono text-[#a8b6af] hover:text-white transition-colors cursor-pointer"
              >
                Done / Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
