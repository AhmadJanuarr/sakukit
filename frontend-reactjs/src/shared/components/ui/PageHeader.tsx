import { cn } from "@/shared/utils/class-names";

interface PageHeaderProps {
  title: string;
  subTitle?: string;
  description: string;
  className?: string;
}

export const PageHeader = ({ title, subTitle, description, className }: PageHeaderProps) => {
  return (
    <div className={cn("mx-auto flex flex-col gap-5 px-6 pb-10 xl:px-0", className)}>
      <h1 className="max-w-lg text-4xl font-medium capitalize md:text-5xl">
        {title} {subTitle && <span className="text-action-primary">{subTitle}</span>}
      </h1>
      <p className="max-w-3xl">{description}</p>
    </div>
  );
};
