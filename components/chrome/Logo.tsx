import Image from "next/image";
import { cn } from "@/lib/utils";

/** Full ChanceConnect logo (mark + wordmark + tagline). Sized by height. */
export function Logo({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/logo.png"
      alt="ChanceConnect"
      width={240}
      height={58}
      priority={priority}
      className={cn("h-11 w-auto sm:h-12", className)}
    />
  );
}
