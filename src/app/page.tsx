import AboutSection from "@/components/About";
import HeroSection from "@/components/HeroSection";
import BrandStorySection from "@/components/BrandStory";
import HowItWorks from "@/components/HowToSip";
import CollectionDiscovery from "@/components/ProductCarousel";
import FeatureStrip from "@/components/FeatureStrip";
import SingleOrigins from "@/components/SingleOrigins";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import { getProducts } from "@/lib/getProducts";
import UpcomingProduct from "@/components/UpcomingProduct";


export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getProducts()

  return (
    <main className="min-h-screen bg-bg-light">
      <HeroSection />
      {/* HERO SUBTEXT */}
      <BrandStorySection />
      <FeatureStrip />
      <AboutSection />
      <CollectionDiscovery products={products} />
      <SingleOrigins />
      <WhyChoose />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <UpcomingProduct />
      <FinalCTA />
    </main>
  )
}
