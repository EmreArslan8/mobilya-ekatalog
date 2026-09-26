export const norm = (s: string) =>
  s.toLocaleLowerCase("tr").replace(/ı/g, "i").normalize("NFD").replace(/[̀-ͯ]/g, "")

export const slugify = (s: string) =>
  norm(s).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48)

export function uniqueSlug(base: string, taken: string[]) {
  const root = slugify(base) || "yeni"
  let s = root
  for (let i = 2; taken.includes(s); i++) s = `${root}-${i}`
  return s
}

export const money = (n: number, currency = "TRY") =>
  new Intl.NumberFormat("tr-TR", { style: "currency", currency, maximumFractionDigits: 0 }).format(n)
