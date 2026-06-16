import { getProductBySlug, getProducts } from "@/lib/getProducts"
import { notFound } from "next/navigation"
import Image from "next/image"
import { FaStar, FaLeaf } from "react-icons/fa"
import { Truck, RotateCcw, ShieldCheck, Award, MapPin, Droplets } from "lucide-react"
import ReviewCard from "./ReviewCard";
import reviewsData from "@/lib/reviewsData";
import ProductActions from "./ProductActions";
import ProductGallery from "./ProductGallery"

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ weight?: string }>
}) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;

  // 1. Fetch data from DB
  const rawProduct = await getProductBySlug(resolvedParams.slug);
  if (!rawProduct) notFound();

  // Serialize to plain JSON for Client Components
  const product = JSON.parse(JSON.stringify(rawProduct));
  const allProducts = JSON.parse(JSON.stringify(await getProducts()));

  const isPackage = product.productType === "PACKAGE";
  const hasVariants = product.variants && product.variants.length > 0;

  // 2. Logic: Determine active data source
  // If Single Product (has variants): use selected weight from URL or first variant
  // If Package: use top-level fields
  const activeVariant = hasVariants
    ? (product.variants.find((v: any) => v.weight === resolvedSearch.weight) || product.variants[0])
    : null;

  const displayPrice = activeVariant ? activeVariant.sellingPrice : product.sellingPrice;
  const displayMrp = activeVariant ? activeVariant.mrp : product.mrp;
  const displayWeight = activeVariant ? activeVariant.weight : `${product.weight}g`;
  const displayStock = activeVariant ? activeVariant.stockQuantity : product.stockQuantity;

  const listify = (str: string) => str ? str.split('\n').filter(line => line.trim() !== '') : [];

  return (
    <div className="min-h-screen bg-[#052c22] text-[#FDFCF8] font-sans">
      <main className="max-w-[1400px] mx-auto px-6 lg:px-20 pt-32 pb-32">

        {/* TOP SECTION: IMAGE & ACTIONS */}
        <div className="grid lg:grid-cols-12 gap-16 xl:gap-24">

          {/* LEFT: IMAGE GALLERY */}
          <div className="lg:col-span-7">
            {/* <div className="relative aspect-[4/3] w-full rounded-[2rem] bg-white overflow-hidden flex items-center justify-center shadow-2xl">
              <Image
                src={product.images?.[0] || "/placeholder.png"}
                alt={product.name}
                width={1000}
                height={1000}
                className="relative z-10 object-contain p-8 w-full h-full hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute top-10 left-10">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] bg-[#d4af37] text-[#052c22] px-4 py-2 rounded-sm">
                  {isPackage ? "Signature Set" : `${product.purityPercentage || 100}% Pure`}
                </span>
              </div>
            </div> */}

            <ProductGallery images={product.images || []} name={product.name} />
          </div>

          {/* RIGHT: CONTENT SECTION */}
          <div className="lg:col-span-5">
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#d4af37]"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#d4af37]">
                  {isPackage ? "The Complete Ritual" : product.floralSource || "Pure Monofloral"}
                </span>
              </div>
              <h1 className="text-5xl font-serif leading-tight mb-4">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex text-[#d4af37] gap-1">
                  {[...Array(5)].map((_, i) => <FaStar key={i} className="w-3 h-3 fill-current" />)}
                </div>
                <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Premium Grade</span>
              </div>
            </header>

            <div className="mb-10">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-4xl font-light">₹{displayPrice.toLocaleString()}</span>
                {displayMrp > displayPrice && (
                  <span className="text-xl text-white/20 line-through">₹{displayMrp.toLocaleString()}</span>
                )}
              </div>
              <p className="text-white/70 font-light leading-relaxed italic text-lg">&quot;{product.shortDescription}&quot;</p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-6 mb-10 p-6 bg-white/5 rounded-xl border border-white/10">
              <div className="space-y-1">
                <p className="text-[10px] uppercase text-[#d4af37] font-bold tracking-tighter">Harvest Region</p>
                <p className="text-sm flex items-center gap-2"><MapPin size={14} /> {product.harvestRegion}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase text-[#d4af37] font-bold tracking-tighter">Floral Source</p>
                <p className="text-sm flex items-center gap-2"><Droplets size={14} /> {product.floralSource}</p>
              </div>
            </div>

            {/* REAL Product Actions - Handles variant switching and quantity */}
            <ProductActions
              product={product}
              activeVariant={activeVariant}
              displayWeight={displayWeight}
              displayPrice={displayPrice}
              displayStock={displayStock}
            />



            {/* Standard Trust Badges */}
            <div className="grid grid-cols-2 gap-6 mt-12">
              {[{ icon: <ShieldCheck size={18} />, text: "100% Natural" }, { icon: <Award size={18} />, text: "Lab Tested" }, { icon: <Truck size={18} />, text: "Free Shipping" }, { icon: <RotateCcw size={18} />, text: "Pure Quality" }].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-[#d4af37]">{item.icon}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: BUNDLE CONTENTS (Only for Packages) */}
        {isPackage && (
          <div className="mt-40 border-t border-white/10 pt-24">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-serif text-[#d4af37]">Inside the Collection</h2>
              <p className="mt-4 text-white/40 uppercase tracking-widest text-xs font-bold">Varieties included in this treasury</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {allProducts.filter((p: any) => p.productType === "SINGLE").slice(0, 12).map((honey: any) => (
                <div key={honey._id} className="group flex flex-col items-center text-center space-y-4">
                  <div className="w-24 h-24 bg-white rounded-full p-4 flex items-center justify-center transition-transform group-hover:scale-110 shadow-xl overflow-hidden">
                    <Image src={honey.images?.[0] || "/placeholder.png"} alt={honey.name} width={100} height={100} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/80">{honey.name.replace('Aronutra ', '')}</p>
                    <p className="text-[9px] text-[#d4af37] font-bold">50G JAR</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LOWER SECTION: BENEFITS & USAGE (Always visible) */}
        <div className="mt-32 grid md:grid-cols-3 gap-16 border-t border-white/10 pt-20">
          <div>
            <h3 className="text-[#d4af37] font-serif text-2xl mb-6">Health Benefits</h3>
            <ul className="space-y-4">
              {listify(product.benefits).map((benefit: string, i: number) => (
                <li key={i} className="flex gap-3 text-sm text-white/70 leading-relaxed">
                  <FaLeaf className="text-[#d4af37] mt-1 shrink-0" size={12} />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[#d4af37] font-medium text-2xl mb-6">Usage & Purity</h3>
            <div className="space-y-8">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 mb-3">Ingredients</p>
                <p className="text-sm text-white/70">{product.ingredients || "100% Pure Honey"}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 mb-3">Usage Instructions</p>
                <p className="text-sm text-white/70 leading-relaxed whitespace-pre-line">{product.usageInstructions}</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-[#d4af37] font-serif text-2xl mb-6">Storage</h3>
            <p className="text-sm text-white/70 mb-8 leading-relaxed italic">{product.storageInstructions}</p>
            <div className="bg-[#d4af37]/10 p-6 rounded-lg border border-[#d4af37]/20">
              <p className="text-[#d4af37] text-xs font-bold uppercase mb-2">Certification</p>
              <p className="text-sm text-white/60">{product.certification || "Lab tested for 100% purity. No added sugar or preservatives."}</p>
            </div>
          </div>
        </div>

        {/* REVIEWS SECTION */}
        <section className="mt-48 pt-24 border-t border-white/5">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-serif text-white">Customer Reviews</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviewsData.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}