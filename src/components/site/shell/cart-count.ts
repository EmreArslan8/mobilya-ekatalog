"use client"

import { useVisitor } from "@/lib/store/visitor"

export const useCartCount = () => useVisitor((s) => s.cart.reduce((a, i) => a + i.qty, 0))
export const useFavCount = () => useVisitor((s) => s.fav.length)
