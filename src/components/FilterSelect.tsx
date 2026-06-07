import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function FilterSelect({
  value,
  options,
  labels,
  onChange,
  icon: Icon,
  ariaLabel,
}: {
  value: string;
  options: string[];
  labels?: Record<string, string>;
  onChange: (value: string) => void;
  icon?: LucideIcon;
  ariaLabel: string;
}) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onChange}>
      <SelectPrimitive.Trigger
        aria-label={ariaLabel}
        className="flex h-11 w-full items-center justify-between gap-2 rounded-lg border border-white/15 bg-navy-deep px-3.5 text-sm font-medium text-cream transition-colors hover:border-gold/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/40 data-[state=open]:border-gold"
      >
        <span className="flex items-center gap-2 truncate">
          {Icon && <Icon className="h-4 w-4 shrink-0 text-gold/80" />}
          <SelectPrimitive.Value />
        </span>
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="h-4 w-4 shrink-0 text-cream/50 transition-transform data-[state=open]:rotate-180" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={6}
          className="z-50 max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg border border-white/10 bg-navy-card shadow-2xl shadow-black/40"
        >
          <SelectPrimitive.Viewport className="p-1.5">
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option}
                value={option}
                className="relative flex cursor-pointer select-none items-center justify-between rounded-md px-3 py-2 text-sm text-cream/80 outline-none transition-colors data-[highlighted]:bg-white/5 data-[highlighted]:text-cream data-[state=checked]:font-semibold data-[state=checked]:text-gold"
              >
                <SelectPrimitive.ItemText>{labels?.[option] ?? option}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator>
                  <Check className="h-4 w-4 text-gold" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
