"use client"

import { useEffect, useState } from "react"
import { useDB } from "./db"
import { useVisitor } from "./visitor"

/** Store'ları client'ta bir kez localStorage'dan yükler; SSR ile uyumsuzluk olmasın diye. */
export function useHydrated() {
  const [ready, setReady] = useState(() => useDB.persist.hasHydrated() && useVisitor.persist.hasHydrated())
  useEffect(() => {
    if (ready) return
    Promise.all([useDB.persist.rehydrate(), useVisitor.persist.rehydrate()]).then(() => setReady(true))
  }, [ready])
  return ready
}
