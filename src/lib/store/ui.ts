"use client"

import { create } from "zustand"

/** Kalıcı olmayan arayüz durumu (arama paneli vb.) */
interface UIState {
  searchOpen: boolean
  setSearchOpen: (v: boolean) => void
}

export const useUI = create<UIState>()((set) => ({
  searchOpen: false,
  setSearchOpen: (searchOpen) => set({ searchOpen }),
}))
