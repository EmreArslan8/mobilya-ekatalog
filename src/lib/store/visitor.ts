"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { QuoteItem } from "../types"
import { safeStorage } from "./safe-storage"

/** Ziyaretçiye ait durum: favoriler, sepet (WhatsApp sipariş listesi), iletişim bilgisi. */
export interface Customer { name: string; phone: string; city: string; note: string }

interface VisitorState {
  fav: string[]
  cart: QuoteItem[]
  customer: Customer
  toggleFav: (id: string) => boolean
  addToCart: (item: QuoteItem) => void
  setQty: (index: number, qty: number) => void
  removeFromCart: (index: number) => void
  clearCart: () => void
  setCustomer: (c: Customer) => void
}

export const useVisitor = create<VisitorState>()(
  persist(
    (set, get) => ({
      fav: [],
      cart: [],
      customer: { name: "", phone: "", city: "", note: "" },
      toggleFav: (id) => {
        const on = !get().fav.includes(id)
        set((s) => ({ fav: on ? [...s.fav, id] : s.fav.filter((x) => x !== id) }))
        return on
      },
      addToCart: (item) =>
        set((s) => {
          const cart = [...s.cart]
          const i = cart.findIndex((x) => x.id === item.id && x.color === item.color)
          if (i > -1) cart[i] = { ...cart[i], qty: cart[i].qty + item.qty }
          else cart.push(item)
          return { cart }
        }),
      setQty: (i, qty) => set((s) => ({ cart: s.cart.map((x, n) => (n === i ? { ...x, qty: Math.max(1, qty) } : x)) })),
      removeFromCart: (i) => set((s) => ({ cart: s.cart.filter((_, n) => n !== i) })),
      clearCart: () => set({ cart: [] }),
      setCustomer: (customer) => set({ customer }),
    }),
    { name: "ekatalog-visitor", version: 2, storage: safeStorage, skipHydration: true }
  )
)
