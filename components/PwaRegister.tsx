"use client";

import { useEffect } from "react";

/**
 * Регистрирует service worker для PWA-режима.
 * Безопасно ничего не делает на iOS Safari < 16.4 (поддержка PWA — best effort).
 */
export function PwaRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV !== "production") return;
    const onLoad = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* off-line хостинг — игнорируем */
      });
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);
  return null;
}
