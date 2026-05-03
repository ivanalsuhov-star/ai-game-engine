"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Topic } from "./types";

export type ThemeMode = "dark" | "light" | "auto";

export interface SettingsState {
  /** Целевой балл по ЕГЭ (профиль), 50–100. */
  targetScore: number;
  /** Темы, на которых пользователь хочет сделать акцент. */
  focusTopics: Topic[];
  /** Тема оформления. По умолчанию dark — приложение запускалось как dark-only. */
  theme: ThemeMode;
  /** Активирован ли Pro-доступ (placeholder без реального биллинга). */
  isPro: boolean;
  /** Имя пользователя (для приветствия). */
  displayName: string;

  setTargetScore: (s: number) => void;
  toggleFocusTopic: (t: Topic) => void;
  setFocusTopics: (ts: Topic[]) => void;
  setTheme: (t: ThemeMode) => void;
  setIsPro: (v: boolean) => void;
  setDisplayName: (s: string) => void;
  reset: () => void;
}

const DEFAULT_STATE = {
  targetScore: 80,
  focusTopics: [] as Topic[],
  theme: "dark" as ThemeMode,
  isPro: false,
  displayName: "",
};

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULT_STATE,
      setTargetScore: (s) => set({ targetScore: Math.max(40, Math.min(100, Math.round(s))) }),
      toggleFocusTopic: (t) =>
        set((state) => ({
          focusTopics: state.focusTopics.includes(t)
            ? state.focusTopics.filter((x) => x !== t)
            : [...state.focusTopics, t],
        })),
      setFocusTopics: (ts) => set({ focusTopics: ts }),
      setTheme: (t) => set({ theme: t }),
      setIsPro: (v) => set({ isPro: v }),
      setDisplayName: (s) => set({ displayName: s.slice(0, 40) }),
      reset: () => set(DEFAULT_STATE),
    }),
    { name: "profmat-settings" },
  ),
);
