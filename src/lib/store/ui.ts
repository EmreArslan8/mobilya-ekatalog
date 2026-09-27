"use client"

import { create } from "zustand"
import type { QuoteItem } from "../types"

/** Kalıcı olmayan arayüz durumu (arama paneli, "sepete eklendi" paneli). */
interface UIState {
  searchOpen: boolean
  setSearchOpen: (v: boolean) => void
  added: QuoteItem | null
  showAdded: (item: QuoteItem | null) => void
}

export const useUI = create<UIState>()((set) => ({
  searchOpen: false,
  setSearchOpen: (searchOpen) => set({ searchOpen }),
  added: null,
  showAdded: (added) => set({ added }),
}))
