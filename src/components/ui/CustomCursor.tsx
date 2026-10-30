"use client";

import { useEffect, useRef, useState } from "react";

// Detect reduced motion preference
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function CustomCursor() {
  const [isTouch, setIsTouch] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const dotRef = useRef<HTMLElement>(null);
  const ringRef = useRef<HTMLElement>(null);

  // Initialize elements after mount
  useEffect(() => {
    if (typeof document === "undefined") return;

    // Check if touch device
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouch(isTouchDevice);

    if (!isTouchDevice && !prefersReducedMotion) {
      createCursorElements();
      setupCursorEvents();
      setupHoverLabels();
    }

    // Update on resize
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [prefersReducedMotion]);

  // Create the dot and ring elements
  function createCursorElements() {
    const container = document.createElement("div");
    container.style.cssText = `
      pointer-events-none;
      position: fixed;
      width: 8px;
      height: 8px;
      background: ${T.gold[500]};
      border-radius: 50%;
      z-index: 9999;
      top: 0;
      left: 0;
      transform: translate(-50%, -50%);
      transition: transform 0.1s cubic-bezier(0.22, 1, 0.36, 1);
    `;
    container.setAttribute("data-testid", "custom-cursor-dot");
    document.body.appendChild(container);
    dotRef.current = container;

    // Create the lagging ring
    const ring = document.createElement("div");
    ring.style.cssText = `
      pointer-events-none;
      position: fixed;
      width: 40px;
      height: 40px;
      border: 2px solid ${T.gold[300]};
      border-radius: 50%;
      z-index: 9998;
      top: 0;
      left: 0;
      transform: translate(-50%, -50%);
      transition: transform 0.2s cubic-bezier(0.22, 1, 0.36, 1);
      opacity: 0;
    `;
    ring.setAttribute("data-testid", "custom-cursor-ring");
    document.body.appendChild(ring);
    ringRef.current = ring;
  }

  // Follow mouse position with smoothing
  useEffect(() => {
    if (isTouch || prefersReducedMotion) return;

    let rafId: number;
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    function animate() {
      // Smooth follow with slightly different easing for dot vs ring
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.left = `${cursorX}px`;
        dotRef.current.style.top = `${cursorY}px`;
      }

      if (ringRef.current) {
        // Ring expands near interactive elements
        const dx = mouseX - (cursorX + dotRef.current?.offsetWidth / 2 || cursorX);
        const dy = mouseY - (cursorY + dotRef.current?.offsetHeight / 2 || cursorY);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;
        const expandRatio = Math.min(1, dist / maxDist);

        ringRef.current.style.opacity = `${0.6 - 0.6 * expandRatio}`;
        const ringSize = 40 + 16 * expandRatio;
        ringRef.current.style.width = `${ringSize}px`;
        ringRef.current.style.height = `${ringSize}px`;
        ringRef.current.style.transform = `translate(${cursorX - ringRef.current.offsetWidth / 2}px, ${cursorY - ringRef.current.offsetHeight / 2}px)`;
      }

      rafId = requestAnimationFrame(animate);
    }

    // Initial positions
    dotRef.current?.dispatchEvent(new MouseEvent("mousemove", { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 }));
    animate();

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [isTouch, prefersReducedMotion]);

  // Show/hide labels on hover
  function setupHoverLabels() {
    if (typeof window === "undefined") return;

    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], img, .product-card, .cta, .accordion-header'
    );

    interactiveElements.forEach((el) => {
      let timeoutId: NodeJS.Timeout;

      const showLabel = (e: MouseEvent) => {
        clearTimeout(timeoutId);
        // Create lag label
        const label = document.createElement("div");
        label.style.cssText = `
          pointer-events-none;
          position: fixed;
          padding: 4px 8px;
          background: rgba(250, 247, 240, 0.95);
          border: 1px solid ${T.gold[300]};
          border-radius: 4px;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          z-index: 99999;
          color: ${T.ink};
          white-space: nowrap;
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events-none;
        `;
        label.textContent = getLabelText(el);
        document.body.appendChild(label);

        // Position near cursor
        const cursor = document.querySelector('[data-testid="custom-cursor-dot"]');
        if (cursor) {
          const rect = cursor.getBoundingClientRect();
          const labelRect = label.getBoundingClientRect();
          const x = rect.left + rect.width / 2 - labelRect.width / 2;
          const y = rect.top - rect.height - 12;
          label.style.left = `${x}px`;
          label.style.top = `${y}px`;
        }

        // Fade in
        requestAnimationFrame(() => {
          label.style.opacity = "1";
        });

        // Remove after delay
        timeoutId = setTimeout(() => {
          if (label.parentNode) {
            label.parentNode.removeChild(label);
          }
        }, 2000);
      };

      const getLabelText = (el: Element) => {
        if (el.tagName === "IMG") return "Drag";
        if (el.tagName === "A") return el.getAttribute("href")?.includes("wa.me") ? "Chat" : "Explore";
        if (el.tagName === "BUTTON") {
          const text = (el.textContent || "").trim().toLowerCase();
          if (text.includes("explore") || text.includes("view")) return "Explore";
          if (text.includes("order") || text.includes("custom")) return "Order";
          if (text.includes("scroll")) return "Drag";
          return "Explore";
        }
        return "Explore";
      };

      el.addEventListener("mouseenter", showLabel);
      el.addEventListener("mouseleave", () => {
        clearTimeout(timeoutId);
      });
    });
  }

  // Hide on touch devices - nothing rendered
  if (isTouch || prefersReducedMotion) {
    return null;
  }

  return null; // DOM elements created directly in effects
}