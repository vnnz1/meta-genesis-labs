import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { Cursor } from "@/components/site/Cursor";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Services } from "@/components/site/Services";
import { AIRevenueEngine } from "@/components/site/AIRevenueEngine";
import { Cases } from "@/components/site/Cases";
import { Testimonials } from "@/components/site/Testimonials";
import { Process } from "@/components/site/Process";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { ScrollBlur } from "@/components/site/ScrollBlur";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MetaForge — Infraestrutura digital de próxima geração" },
      {
        name: "description",
        content:
          "Sistemas, plataformas, automações e IA para empresas que pretendem liderar seus mercados.",
      },
      { property: "og:title", content: "MetaForge — Infraestrutura digital de próxima geração" },
      {
        property: "og:description",
        content:
          "Sistemas, plataformas, automações e IA para empresas que pretendem liderar seus mercados.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-ink text-bone antialiased">
      <SmoothScroll />
      <Cursor />
      <ScrollBlur />
      <Nav />
      <main>
        <Hero />
        <div className="scroll-blur"><Reveal variant="blur"><Marquee /></Reveal></div>
        <div className="scroll-blur"><Reveal variant="scale"><AIRevenueEngine /></Reveal></div>
        <div className="scroll-blur"><Reveal variant="blur"><Services /></Reveal></div>
        <div className="scroll-blur"><Reveal variant="scale"><Cases /></Reveal></div>
        <div className="scroll-blur"><Reveal variant="blur"><Testimonials /></Reveal></div>
        <div className="scroll-blur"><Reveal variant="blur"><Process /></Reveal></div>
        <div className="scroll-blur"><Reveal variant="scale"><CTA /></Reveal></div>
      </main>
      <div className="scroll-blur"><Reveal variant="blur"><Footer /></Reveal></div>
    </div>
  );
}
