"use client";

import { useState } from "react";
import { FAQ_DATA } from "@/constants/faq";
import { buttonVariants } from "@/shared/components/ui/Button";
import { cn } from "@/shared/utils/class-names";
import { Link } from "react-router-dom";
import { PageHeader } from "@/shared/components/ui/PageHeader";
import { LuChevronRight, LuChevronUp } from "react-icons/lu";

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>(FAQ_DATA[0].id);
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setOpenId(null);
  };

  const currentCategoryData = FAQ_DATA.find((cat) => cat.id === activeCategory);

  return (
    <section className="mx-auto min-h-screen w-full max-w-5xl pt-10 pb-20 2xl:max-w-7xl">
      <PageHeader
        title="Ada Pertanyaan?"
        subTitle="Cek Di Sini!"
        description="Punya pertanyaan seputar Mad Labs Toolkits? Temukan jawabannya di bawah ini. Jika tidak menemukan yang Anda
        cari, jangan ragu untuk menghubungi kami."
      />
      <div className="relative z-10 flex flex-col items-center gap-10 px-6 xl:px-0">
        <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-start">
          <div className="flex w-full flex-row gap-2 overflow-x-auto pb-2 lg:w-1/3 lg:flex-col lg:overflow-visible lg:pb-0">
            {FAQ_DATA.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={cn(
                    "flex shrink-0 cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-left lg:w-full",
                    isActive && "bg-card-primary",
                  )}
                >
                  <span>{category.title}</span>
                  <LuChevronRight
                    className={cn(
                      "hidden size-4 transition-transform lg:block",
                      isActive ? "text-action-primary translate-x-0 opacity-100" : "-translate-x-2 opacity-0",
                    )}
                  />
                </button>
              );
            })}
          </div>

          <div className="relative flex w-full flex-col gap-10 lg:h-175 lg:gap-0">
            <div className="flex w-full flex-col text-left">
              {currentCategoryData?.faqs.map((faq) => (
                <button
                  key={faq.id}
                  onClick={() => toggleAccordion(faq.id)}
                  className={cn(
                    "border-line-light cursor-pointer overflow-hidden border-b px-4 py-5 text-left transition-all duration-300",
                    openId === faq.id && "bg-base-secondary",
                  )}
                >
                  <div className="flex w-full items-center justify-between text-left focus:outline-none">
                    <h5 className="pr-4 font-medium">{faq.question}</h5>
                    <LuChevronUp
                      className={cn(
                        `text-action-primary size-5 min-h-5 min-w-5 shrink-0 transition-transform duration-300`,
                        openId === faq.id && "rotate-180",
                      )}
                    />
                  </div>
                  <div
                    className={cn(
                      "grid text-left transition-all duration-300 ease-in-out sm:max-w-[90%]",
                      openId === faq.id ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="text-muted-foreground py-2">{faq.answer}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="card-default flex w-full flex-col items-start justify-between gap-6 px-6 py-8 text-start sm:flex-row sm:items-center lg:absolute lg:bottom-0 lg:py-10">
              <div className="flex flex-col gap-2">
                <h3 className="text-action-primary text-xl sm:text-2xl">Masih ada pertanyaan?</h3>
                <p>Tolong hubungi kami via discord atau email, kami akan segera menanggapi pertanyaan Anda.</p>
              </div>
              <div className="w-full shrink-0 sm:w-auto">
                <Link
                  to="https://wa.me/628930507889?text=Halo%20kak%20saya%20punya%20pertanyaan%20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "outline" }), "w-full sm:w-auto")}
                >
                  Kontak Kami
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
