import { cn } from "@/shared/utils/class-names";
import { HTMLAttributes } from "react";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={cn("bg-line-strong/20 animate-pulse rounded-xs", className)} {...props} />;
}
