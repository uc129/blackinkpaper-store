
import { cn } from "@/lib/utils";


export const Paragraph = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm  leading-relaxed", className)} {...props} />
);

export const TextSmall = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
  <small className={cn("text-xs opacity-80", className)} {...props} />
);

export const TextMuted = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn("text-sm text-gray-500", className)} {...props} />
);

export const TextLabel = ({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label className={cn("text-xs font-semibold tracking-wide", className)} {...props} />
);

export const TextDescription = ({ className, ...props }: React.LabelHTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-center font-semibold leading-relaxed breathe-room-sm", className)} {...props} />
);