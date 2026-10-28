import { cn } from "@/shared/utils/class-names";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  rel?: string;
  label?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  type?: "button" | "submit" | "reset";
  variant?: "default" | "contained" | "outline" | "ghost";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", className, href, target, rel, type, disabled, label, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-300 disabled:pointer-events-none disabled:opacity-50 px-5 py-3 gap-3";
    const variants = {
      default: "text-base-primary hover:bg-action-primary/80 cursor-pointer bg-action-primary hover:text-ink-primary",
      contained:
        "bg-base-secondary text-ink-primary cursor-pointer hover:bg-action-primary hover:text-ink-secondary border hover:border-ink-secondary border-action-primary",
      outline:
        "border border-line-light bg-base-primary   hover:bg-action-primary/80 cursor-pointer  hover:text-base-primary",
      ghost: "bg-transparent text-ink-secondary cursor-pointer underline underline-offset-4 hover:text-ink-primary ",
    };

    const combinedClassName = cn(baseStyles, variants[variant], className);

    if (href) {
      const linkClasses = cn(combinedClassName, disabled && "pointer-events-none opacity-50 cursor-not-allowed");
      return (
        <a
          href={disabled ? undefined : href}
          className={linkClasses}
          target={target}
          rel={target === "_blank" ? rel || "noopener noreferrer" : rel}
          aria-disabled={disabled}
        >
          {props.children}
        </a>
      );
    }

    if (label) {
      return (
        <label htmlFor={label} className={combinedClassName}>
          {props.children}
        </label>
      );
    }

    return (
      <button className={combinedClassName} ref={ref} type={type} disabled={disabled} {...props}>
        {props.children}
      </button>
    );
  },
);
