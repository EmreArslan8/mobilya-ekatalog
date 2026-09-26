import { createJSONStorage } from "zustand/middleware"
import { toast } from "sonner"

/** localStorage sarmalayıcı: kota dolarsa uygulamayı düşürmek yerine uyarır. */
export const safeStorage = createJSONStorage(() => ({
  getItem: (k: string) => {
    try { return localStorage.getItem(k) } catch { return null }
  },
  setItem: (k: string, v: string) => {
    try { localStorage.setItem(k, v) } catch {
      toast.error("Tarayıcı depolama alanı doldu", { description: "Daha küçük görseller yükleyin veya bazı görselleri kaldırın." })
    }
  },
  removeItem: (k: string) => {
    try { localStorage.removeItem(k) } catch {}
  },
}))
