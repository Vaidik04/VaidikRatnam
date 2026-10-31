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
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [paymentMode, setPaymentMode] = useState<"upi" | "shop_counter">("upi");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<{ referenceCode: string; upiUrl?: string } | null>(null);

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
    if (!customerName.trim() || !customerPhone.trim()) {
      setErrorMessage("Please enter your full name and 10-digit mobile number.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FAF8F5] border-2 border-[#D4AF37] rounded-xs shadow-2xl p-6 sm:p-8 my-8 text-[#4B3F36]">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#4B3F36] hover:bg-[#E8DFC8] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!result ? (
          <div>
            {/* Header */}
            <div className="border-b border-[#E8DFC8] pb-4 mb-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F3D2E]/10 border border-[#D4AF37]/50 text-[#0F3D2E] text-xs uppercase tracking-wider font-semibold mb-2">
                <Lock className="w-3.5 h-3.5 text-[#B59328]" />
                <span>Rate Lock Booking</span>
              </div>
              <h3 className="font-serif text-2xl text-[#0F3D2E] font-normal">
                Lock In Today&apos;s Gold Rate
              </h3>
              <p className="text-xs text-[#4B3F36] mt-1 font-light leading-relaxed">
                Book today&apos;s rate with a token advance for upcoming weddings or ceremonies. Rate is locked for up to 30 days.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 mb-4 bg-red-50 border border-red-200 rounded-xs text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Karat selection */}
              <div>
                <label className="block text-xs font-semibold text-[#0F3D2E] uppercase tracking-wider mb-1.5">
                  Select Purity to Lock:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["22K", "24K", "18K"] as const).map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setKarat(k)}
                      className={`p-2.5 rounded-xs border text-center transition-all cursor-pointer ${
                        karat === k
                          ? "bg-[#0F3D2E] text-[#F3E5AB] border-[#D4AF37] font-semibold shadow-xs"
                          : "bg-white text-[#4B3F36] border-[#E8DFC8] hover:bg-[#F9F5EB]"
                      }`}
                    >
                      <span className="block text-xs font-mono font-bold">{k}</span>
                      <span className="block text-[10px] opacity-80">
                        ₹{ratesMap[k].toLocaleString("en-IN")}/g
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight selection */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <label className="font-semibold text-[#0F3D2E] uppercase tracking-wider">
                    Weight to Lock:
                  </label>
                  <span className="font-mono font-bold text-[#0F3D2E] bg-white px-2 py-0.5 rounded-xs border border-[#E8DFC8]">
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
                  className="w-full accent-[#0F3D2E] cursor-pointer"
                />
                <div className="flex gap-1.5 mt-1.5">
                  {[8, 15, 25, 50, 100].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setWeight(w)}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-xs border cursor-pointer ${
                        weight === w
                          ? "bg-[#D4AF37] text-[#0F3D2E] font-bold border-[#D4AF37]"
                          : "bg-white text-[#4B3F36] border-[#E8DFC8]"
                      }`}
                    >
                      {w}g {w === 8 ? "(Pavan)" : ""}
                    </button>
                  ))}
                </div>
              </div>

              {/* Locked summary card */}
              <div className="p-3.5 bg-white rounded-xs border border-[#E8DFC8] space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Locked Rate:</span>
                  <span className="font-mono font-semibold text-[#0F3D2E]">
                    ₹{currentRate.toLocaleString("en-IN")}/g ({karat})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Total Gold Value:</span>
                  <span className="font-mono font-bold text-[#0F3D2E]">
                    ₹{totalValue.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Token Advance */}
              <div>
                <label className="block text-xs font-semibold text-[#0F3D2E] uppercase tracking-wider mb-1.5">
                  Token Advance Amount:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[2500, 5000, 10000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setTokenAmount(amt)}
                      className={`p-2 rounded-xs border text-center transition-all cursor-pointer font-mono text-xs font-semibold ${
                        tokenAmount === amt
                          ? "bg-[#0F3D2E] text-[#F3E5AB] border-[#D4AF37]"
                          : "bg-white text-[#4B3F36] border-[#E8DFC8]"
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
                  <label className="block text-[11px] font-semibold text-[#0F3D2E] uppercase tracking-wider mb-1">
                    Your Full Name:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Sharma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#E8DFC8] rounded-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#0F3D2E] uppercase tracking-wider mb-1">
                    10-Digit Mobile / WhatsApp:
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#E8DFC8] rounded-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Payment Mode */}
              <div>
                <label className="block text-[11px] font-semibold text-[#0F3D2E] uppercase tracking-wider mb-1">
                  Advance Payment Method:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center gap-2 p-2.5 rounded-xs border border-[#E8DFC8] bg-white cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMode"
                      value="upi"
                      checked={paymentMode === "upi"}
                      onChange={() => setPaymentMode("upi")}
                      className="accent-[#0F3D2E]"
                    />
                    <span>Instant UPI (GPay / PhonePe)</span>
                  </label>
                  <label className="flex items-center gap-2 p-2.5 rounded-xs border border-[#E8DFC8] bg-white cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMode"
                      value="shop_counter"
                      checked={paymentMode === "shop_counter"}
                      onChange={() => setPaymentMode("shop_counter")}
                      className="accent-[#0F3D2E]"
                    />
                    <span>Pay Cash/Card at Shop</span>
                  </label>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold-pure w-full py-3 rounded-xs text-xs uppercase tracking-widest font-bold shadow-md cursor-pointer flex items-center justify-center gap-2 mt-4 text-[#0F3D2E]"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>
                  {isSubmitting
                    ? "Locking Rate..."
                    : `Confirm Rate Lock & Reserve (₹${tokenAmount.toLocaleString("en-IN")})`}
                </span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#8F9691] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1B6442]" />
                <span>100% Refundable or Adjustable Against Final Jewellery Invoice</span>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="space-y-5 text-center py-2 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-[#1B6442]/10 border border-[#1B6442]/40 text-[#1B6442] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-[#1B6442]" />
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#B59328] font-bold block">
                Rate Lock Confirmed &bull; Reference Code
              </span>
              <h3 className="font-mono text-2xl font-bold text-[#0F3D2E] tracking-wider mt-1">
                {result.referenceCode}
              </h3>
              <p className="text-xs text-[#4B3F36] mt-1 font-light">
                {weight}g of {karat} Gold locked at <strong>₹{currentRate.toLocaleString("en-IN")}/g</strong> for customer {customerName}.
              </p>
            </div>

            {/* UPI Payment Trigger */}
            {paymentMode === "upi" && result.upiUrl && (
              <div className="p-4 bg-white rounded-xs border-2 border-[#D4AF37] space-y-3">
                <span className="text-xs font-semibold text-[#0F3D2E] block uppercase tracking-wider">
                  Complete Token Advance: ₹{tokenAmount.toLocaleString("en-IN")}
                </span>
                <p className="text-[11px] text-[#4B3F36]">
                  Click below to open Google Pay, PhonePe, Paytm, or BHIM on your mobile phone:
                </p>
                <a
                  href={result.upiUrl}
                  className="btn-gold-shimmer text-white py-2.5 px-4 rounded-xs text-xs uppercase tracking-wider font-semibold inline-flex items-center justify-center gap-2 w-full shadow-xs"
                >
                  <QrCode className="w-4 h-4 text-[#F3E5AB]" />
                  <span>Pay ₹{tokenAmount.toLocaleString("en-IN")} via UPI App</span>
                </a>
              </div>
            )}

            {/* WhatsApp verification button */}
            <div className="space-y-2 pt-2">
              <a
                href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
                  `Namaste Vaidik Ratnam, I have booked a Rate Lock on your website.\nReference: ${result.referenceCode}\nCustomer: ${customerName}\nLocked: ${weight}g of ${karat} @ ₹${currentRate}/g\nToken Advance: ₹${tokenAmount}\nPlease confirm reservation.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-pure w-full py-3 rounded-xs text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-xs text-[#0F3D2E]"
              >
                <MessageCircle className="w-4 h-4 text-[#0F3D2E]" />
                <span>Confirm on Shop WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 text-xs text-[#4B3F36] hover:text-[#0F3D2E] transition-colors"
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
