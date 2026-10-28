import { TOOLS_CATALOG } from "@/constants/tools-catalog";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/Card";
import { IconBox } from "@/shared/components/ui/IconBox";
import { cn } from "@/shared/utils/class-names";
import { useMemo, useState } from "react";
import { LuClock3, LuFileCog, LuSearch } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function AllToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>("all");

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(TOOLS_CATALOG.map((tool) => tool.category))];
    return ["all", ...uniqueCategories];
  }, []);

  const filteredTools = useMemo(() => {
    if (selectedCategory === "all") {
      return TOOLS_CATALOG;
    }

    return TOOLS_CATALOG.filter((tool) => tool.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section className="size-full overflow-x-hidden">
      <div className="bg-base-primary border-line-strong flex flex-col gap-2 border-b px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:py-2">
        <div className="-mx-3 flex min-w-0 gap-2 overflow-x-auto px-3 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <Button
                key={category}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="shrink-0 rounded-md text-xs font-medium transition-all md:text-sm"
              >
                {category === "all" ? "Semua Alat" : category}
              </Button>
            );
          })}
        </div>
        <Button variant="outline" className="w-full shrink-0 sm:w-auto" aria-label="Cari alat">
          <LuSearch aria-hidden="true" />
          <span className="sm:hidden">Cari alat</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 sm:gap-4 sm:p-4 lg:grid-cols-3 xl:grid-cols-4">
        {filteredTools.map((tool) => {
          if (!tool.href) return null;
          const ToolIcon = tool.icon ?? LuFileCog;
          const isAvailable = tool.availability.isActive;

          return (
            <Card
              className={cn("rounded-lg", isAvailable ? undefined : "border-amber-500/30 bg-amber-500/3")}
              key={tool.title}
            >
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <IconBox icon={ToolIcon} palette={tool.palette} />
                  {!isAvailable && (
                    <Badge
                      variant="outline"
                      className="h-7 max-w-[calc(100%-3.5rem)] gap-1.5 rounded-md border-amber-500/30 bg-amber-500/10 px-2.5 font-semibold text-amber-700"
                    >
                      <LuClock3 aria-hidden="true" />
                      <span className="truncate">{tool.availability.label}</span>
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="h-auto min-h-16 px-4 sm:px-6">
                <CardTitle className="text-base sm:text-lg">{tool.title}</CardTitle>
                <CardDescription className="line-clamp-2">{tool.description}</CardDescription>
              </CardContent>
              <CardFooter className="justify-end p-4 pt-2 sm:p-6 sm:pt-2">
                {isAvailable ? (
                  <Link to={tool.href} className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full">
                      Coba sekarang
                    </Button>
                  </Link>
                ) : (
                  <Button variant="outline" className="w-full sm:w-auto" disabled>
                    <LuClock3 aria-hidden="true" />
                    Belum tersedia
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
