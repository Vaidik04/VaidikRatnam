"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  X,
  Send,
  Loader2,
  ExternalLink,
  ShieldCheck,
  Minimize2,
  Sparkles,
} from "lucide-react";

let messageCounter = 0;
function getNextId(prefix: string) {
  messageCounter += 1;
  return `${prefix}-${messageCounter}`;
}

interface Message {
  id: string;
  sender: "user" | "advisor";
  text: string;
  links?: Array<{ label: string; url: string }>;
  isAiGenerated?: boolean;
}

const STARTER_PROMPTS = [
  "How is gold jewellery price calculated?",
  "Can I wear Blue Sapphire during Sade Sati?",
  "What is a BIS HUID and how do I check it?",
  "What gemstones are recommended for Aries (Mesha)?",
  "How does bespoke custom design work?",
];

export function StudioAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "advisor",
      text: "Namaste! Welcome to Vaidik Ratnam. How can we help you? You can ask about our 22K/18K gold jewellery, custom designs, live gold rates, BIS hallmarking, or natural gemstones.",
      links: [
        { label: "Gold Budget Estimator", url: "/tools/gold-budget-estimator" },
        { label: "Gemstone & Astrology Guide", url: "/astrology" },
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMessage: Message = {
      id: getNextId("user"),
      sender: "user",
      text: query,
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      const history = messages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({
          role: m.sender === "user" ? ("user" as const) : ("assistant" as const),
          content: m.text,
        }));

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const advisorMessage: Message = {
          id: getNextId("advisor"),
          sender: "advisor",
          text: data.reply || "Thank you. Our studio team will be happy to assist further.",
          links: data.relevantLinks || [],
          isAiGenerated: data.isAiGenerated,
        };
        setMessages((prev) => [...prev, advisorMessage]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: getNextId("err"),
            sender: "advisor",
            text: "Our assistant is temporarily unable to retrieve records. Please feel free to call our shop directly or message us on WhatsApp.",
            links: [{ label: "Contact Our Shop", url: "/contact" }],
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: getNextId("err"),
          sender: "advisor",
          text: "Network connection was interrupted. Please try asking again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 print:hidden font-sans">
      {/* Refined Luxury Celestial Orb (Collision-Free) */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative w-12 h-12 rounded-full bg-[#04170f]/95 border-2 border-[#d4af37] shadow-[0_0_24px_rgba(212,175,55,0.35)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer backdrop-blur-md"
          title="Vaidik Ratnam AI Advisor"
          aria-label="Open Vaidik Ratnam Heritage AI Advisor"
        >
          {/* Ambient Pulsing Ring */}
          <span className="absolute -inset-1 rounded-full border border-[#d4af37]/40 animate-ping-slow pointer-events-none" />

          {/* Sparkle Icon */}
          <Sparkles className="w-5 h-5 text-[#f1d98a] group-hover:rotate-12 transition-transform duration-300" />

          {/* Online Indicator Badge */}
          <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#d4af37] border-2 border-[#04170f]"></span>
          </span>

          {/* Elegant Micro Hover Label */}
          <span className="absolute left-14 px-3 py-1 bg-[#04170f]/95 border border-[#d4af37]/40 text-[#f1d98a] text-[10px] font-mono uppercase tracking-wider rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            AI Advisor
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] h-[560px] max-h-[85vh] bg-[#04170f]/95 border-2 border-[#d4af37]/60 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-[#0a2a1d] text-white p-4 flex items-center justify-between border-b border-[#d4af37]/30">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#04170f] border border-[#d4af37]/60 flex items-center justify-center p-0.5 shrink-0 shadow-xs overflow-hidden">
                <Image
                  src="/images/brand/app-icon-emerald-256.png"
                  alt="VR Monogram"
                  width={36}
                  height={36}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="font-serif text-sm font-normal text-[#f6e7b4] flex items-center gap-1.5">
                  Vaidik Ratnam Heritage Advisor
                </h3>
                <span className="text-[10px] text-[#a8b6af] font-mono block">
                  Authentic Jewellery &amp; Jyotish Guidance
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-[#a8b6af] hover:text-[#d4af37] rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                title="Minimize chat"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-[#a8b6af] hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#04170f]/80 scrollbar-thin">
            {messages.map((m) => {
              const isUser = m.sender === "user";
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      isUser
                        ? "bg-[#14502f] text-[#f6e7b4] border border-[#d4af37]/40 rounded-tr-none shadow-md"
                        : "bg-[#0a2a1d]/90 text-[#faf7f0] border border-[#d4af37]/25 rounded-tl-none shadow-lg"
                    }`}
                  >
                    <p className="whitespace-pre-line">{m.text}</p>

                    {/* Grounded Recommended Links */}
                    {m.links && m.links.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-white/10 space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#d4af37] font-semibold block">
                          Suggested Resources:
                        </span>
                        {m.links.map((link, idx) => (
                          <Link
                            key={idx}
                            href={link.url}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1 text-[11px] font-mono text-[#f1d98a] hover:text-white hover:underline mr-2 transition-colors"
                          >
                            <span>&bull; {link.label}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 p-3 bg-[#0a2a1d] border border-[#d4af37]/30 rounded-2xl max-w-[75%] text-xs text-[#a8b6af]">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#d4af37]" />
                <span>Consulting heritage records...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Prompts */}
          {messages.length <= 2 && (
            <div className="p-2.5 bg-[#0a2a1d]/90 border-t border-[#d4af37]/20 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5">
              {STARTER_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(prompt)}
                  className="text-[11px] px-3 py-1 bg-[#04170f] border border-[#d4af37]/35 rounded-full text-[#f1d98a] hover:border-[#d4af37] hover:bg-[#d4af37]/15 transition-colors shrink-0 cursor-pointer font-mono"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#0a2a1d] border-t border-[#d4af37]/25 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about 22K gold, HUID, or gemstones..."
              className="flex-1 text-xs px-3.5 py-2.5 bg-[#04170f] border border-[#d4af37]/30 rounded-xl focus:outline-none focus:border-[#d4af37] text-white placeholder-[#a8b6af]/60 font-sans"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 bg-gold-gradient text-[#04170f] rounded-xl hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer font-bold shadow-md"
              title="Send question"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Micro Disclaimer */}
          <div className="px-3.5 py-2 bg-[#04170f] border-t border-white/5 text-[10px] text-[#a8b6af] flex items-center justify-between font-mono">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#d4af37]" />
              Authentic Store Advisor
            </span>
            <span>Live Studio Rates Verified</span>
          </div>
        </div>
      )}
    </div>
  );
}
