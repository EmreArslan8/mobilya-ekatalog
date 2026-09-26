import { cn } from "@/lib/utils"

/** Site genelinde tek genişlik/kenar boşluğu kuralı. */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 md:px-8", className)} {...props} />
}
