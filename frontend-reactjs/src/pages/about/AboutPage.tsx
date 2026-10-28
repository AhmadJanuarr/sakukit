import { PageHeader } from "@/shared/components/ui/PageHeader";

export default function AboutPage() {
  return (
    <section className="mx-auto min-h-screen w-full pt-10 pb-20 2xl:max-w-7xl">
      <PageHeader
        title="Mengenal Lebih"
        subTitle="MadLabs Tools?"
        description="Kenali lebih jauh tentang MadLabs Tools, platform digital yang kami bangun untuk mempermudah alur kerja Anda sehari-hari."
      />
      <div>Hello worlds</div>
    </section>
  );
}
