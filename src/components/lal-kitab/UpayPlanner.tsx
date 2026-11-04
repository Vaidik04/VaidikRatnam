"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2, Circle, AlertCircle, Heart } from "lucide-react";

interface UpayItem {
  id: string;
  title: string;
  duration: string;
  practice: string;
  planet: string;
}

interface UpayPlannerProps {
  upayList: UpayItem[];
}

export function UpayPlanner({ upayList }: UpayPlannerProps) {
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});

  const toggleDone = (id: string) => {
    setCompletedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <h3 className="font-serif text-xl text-[#F6E7B4] font-normal">
            Lal Kitab Upay &bull; Daily Practice Planner
          </h3>
        </div>
        <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider">
          43-Day Classical Discipline
        </span>
      </div>

      <p className="text-xs text-[#A8B6AF] leading-relaxed">
        Lal Kitab remedies are natural behavioral calibrations, charity, and devotional habits. They require consistency (traditionally performed for 40 to 43 consecutive days without interruption).
      </p>

      {/* Safety Notice Card */}
      <div className="caution-ruby-glass p-3.5 flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-[#F1D98A] shrink-0 mt-0.5" />
        <div className="text-xs text-[#FAF7F0]/90 leading-snug">
          <strong>Safety &amp; Ethical Guarantee:</strong> These practices are cost-free or nominal, cause no harm to any living creature, and do not replace professional medical or psychiatric care.
        </div>
      </div>

      {/* Remedy Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {upayList.map((item) => {
          const isDone = Boolean(completedMap[item.id]);
          return (
            <div
              key={item.id}
              className={`p-5 rounded-xs border transition-all ${
                isDone
                  ? "bg-[#04170F]/90 border-[#48BB78]/60 opacity-80"
                  : "bg-white/5 border-[#D4AF37]/40 hover:border-[#D4AF37]"
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] block">
                    Governing Planet: {item.planet}
                  </span>
                  <h4 className="font-serif text-base text-white font-medium">
                    {item.title}
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={() => toggleDone(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider cursor-pointer border transition-colors ${
                    isDone
                      ? "bg-[#48BB78]/20 border-[#48BB78] text-[#48BB78]"
                      : "bg-white/5 border-white/20 text-[#A8B6AF] hover:text-white"
                  }`}
                >
                  {isDone ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#48BB78]" />
                      <span>Practiced</span>
                    </>
                  ) : (
                    <>
                      <Circle className="w-3.5 h-3.5 text-[#A8B6AF]" />
                      <span>Mark Today</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-[#FAF7F0]/85 leading-relaxed font-light mt-2">
                {item.practice}
              </p>

              <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#A8B6AF]">
                <span>Duration: <strong>{item.duration}</strong></span>
                <span className="text-[#D4AF37] flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  Ethical Practice
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

