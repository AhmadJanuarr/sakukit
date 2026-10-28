import { cn } from "@/shared/utils/class-names";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Badge } from "./Badge";
import { IconType } from "react-icons";

type CardProps = {
  children: ReactNode;
  href?: string;
  className?: string;
};

export const Card = ({ children, href, className }: CardProps) => {
  const containerClasses = cn(
    "card-default group relative  z-10 flex w-full flex-col rounded-xl border border-gray-100 bg-white p-3",
    className,
  );

  if (href) {
    return (
      <Link to={href} className={containerClasses}>
        {children}
      </Link>
    );
  }
  return <div className={containerClasses}>{children}</div>;
};

export const CardContainer = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("rounded-xl group-hover:bg-blue-50")}>{children}</div>
);

export const CardHeader = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("flex h-52 flex-col gap-3 p-5", className)}>{children}</div>
);

export const CardTopBar = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("mb-4 flex w-full items-start justify-between", className)}>{children}</div>
);

export const CardHeaderTop = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("flex w-full items-center justify-between", className)}>{children}</div>
);

export const CardIcon = ({ icon: Icon, className }: { icon?: IconType; className?: string }) => {
  if (!Icon) return null;

  return (
    <div
      className={cn(
        "tool-icon group-hover:bg-action-primary/20 group-hover:border-action-primary/40 flex size-12 items-center justify-center rounded-lg",
        className,
      )}
    >
      <Icon className="text-action-primary group-hover:text-primary-foreground size-8 transition-colors duration-300" />
    </div>
  );
};

export const CardBadge = ({ children }: { children: ReactNode }) => {
  if (!children) return null;
  return <Badge>{children}</Badge>;
};

export const CardCategory = ({ text, className }: { text: string; className?: string }) => (
  <div className="flex items-center py-1">
    <span
      className={cn(
        "bg-action-primary/10 border-action-primary/20 group-hover:bg-action-primary flex items-center justify-center rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-300 group-hover:text-white",
        className,
      )}
    >
      {text}
    </span>
  </div>
);

export const CardTitle = ({ children, className }: { children: ReactNode; className?: string }) => (
  <h2 className={cn("group-hover:text-action-primary text-2xl font-semibold", className)}>{children}</h2>
);

export const CardDescription = ({ children, className }: { children: ReactNode; className?: string }) => (
  <p className={cn("text-sm leading-relaxed text-gray-600", className)}>{children}</p>
);

export const CardContent = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("flex flex-col flex-wrap gap-2 pt-2", className)}>{children}</div>
);

export const CardFooter = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("mt-auto flex w-full items-center justify-end p-5", className)}>{children}</div>
);
