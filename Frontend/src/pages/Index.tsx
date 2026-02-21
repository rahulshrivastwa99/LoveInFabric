import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// --- STRICTLY USING ONLY AVAILABLE ASSETS ---
import categoryMen from "@/assets/blanket 1.jpg";
import categoryWomen from "@/assets/Gemini_Generated_Image_pde47vpde47vpde4.jpg";
// Replaced missing accessories image with after-happy so it doesn't crash
import categoryAccessories from "@/assets/after-happy.jpg";

// Using your actual before and after images!
import sadBeforeImage from "@/assets/before-sad.jpg";
import happyAfterImage from "@/assets/after-happy.jpg";

import { useAppDispatch, useAppSelector } from "@/store";
import { fetchProducts } from "@/store/productSlice";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import HeroCarousel from "@/components/HeroCarousel";

const categories = [
  {
    label: "Premium Blankets",
    image: categoryMen,
    to: "/shop?category=Blankets",
  },
  {
    label: "Custom Tees",
    image: categoryWomen,
    to: "/shop?category=Custom Tees",
  },
  {
    label: "Accessories",
    image: categoryAccessories,
    to: "/shop?category=accessories",
  },
];

const Index = () => {
  const dispatch = useAppDispatch();
  const {
    items: products,
    status,
    pages,
  } = useAppSelector((state) => state.products);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts({ pageNumber: page }));
  }, [page, dispatch]);

  const safeProducts = Array.isArray(products) ? products : [];

  const bestSellers = safeProducts
    .filter((p: any) => p.isBestSeller)
    .slice(0, 8);
  const newArrivals = safeProducts.slice(0, 8);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center font-serif uppercase tracking-widest animate-pulse">
        Loading LoveInFabric Collection...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main>
        {/* --- HERO CAROUSEL --- */}
        <HeroCarousel />

        {/* How Customization Works */}
        <section className="py-20 bg-secondary/30">
          <div className="container text-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold mb-4 block">
              Process
            </span>
            <h2 className="font-serif text-3xl md:text-4xl mb-16">
              How Customization Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Choose Your Base",
                  desc: "Select from our premium blankets or heavy-weight tees.",
                },
                {
                  step: "02",
                  title: "Customize It",
                  desc: "Add your name, a special date, or a meaningful phrase.",
                },
                {
                  step: "03",
                  title: "We Craft & Ship",
                  desc: "Each piece is printed to order and shipped with care.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="space-y-4"
                >
                  <span className="font-serif text-6xl text-foreground/10 block">
                    {item.step}
                  </span>
                  <h3 className="font-serif text-xl">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="container py-12 lg:py-20">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif text-2xl lg:text-3xl text-center mb-12 lg:mb-16"
          >
            Shop by Category
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {categories.map((cat) => (
              <Link key={cat.label} to={cat.to}>
                <motion.div
                  className="relative aspect-[3/4] overflow-hidden group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="w-full h-full object-cover image-zoom group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/30 transition-colors duration-500" />
                  <div className="absolute inset-0 flex items-end p-8">
                    <h3 className="font-serif text-2xl text-primary-foreground tracking-wider text-white">
                      {cat.label}
                    </h3>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Collection: Premium Blankets */}
        <section className="py-20 bg-stone-900 text-white relative overflow-hidden">
          <div className="container relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <span className="text-xs uppercase tracking-[0.3em] text-white/60">
                The Comfort Edit
              </span>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                Premium Blankets <br /> for Every Home.
              </h2>
              <p className="text-white/70 leading-relaxed font-light max-w-md">
                Experience the softest touch with our curated range of blankets.
                Designed for warmth, style, and those perfect cozy evenings.
              </p>
              <Link
                to="/shop?category=Blankets"
                className="inline-block border-b border-white pb-1 uppercase tracking-widest text-xs font-bold pt-4 hover:opacity-70 transition-opacity"
              >
                Shop Blankets
              </Link>
            </div>
            <div className="md:w-1/2">
              <div className="aspect-square bg-white/5 border border-white/10 rounded-sm overflow-hidden p-4 rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src={categoryMen}
                  alt="Blanket Collection"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Collection: Custom Tees */}
        <section className="py-20">
          <div className="container flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="md:w-1/2 space-y-6 md:pl-10">
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Express Yourself
              </span>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                Wear Your Vibe. <br /> Custom Tees.
              </h2>
              <p className="text-muted-foreground leading-relaxed font-light max-w-md">
                Make it truly yours. Add custom text to our premium cotton tees.
                Perfect for gifts, events, or just speaking your mind.
              </p>
              <Link
                to="/shop?category=Custom Tees"
                className="inline-block border-b border-foreground pb-1 uppercase tracking-widest text-xs font-bold pt-4 hover:opacity-70 transition-opacity"
              >
                Create Your Tee
              </Link>
            </div>
            <div className="md:w-1/2">
              <div className="aspect-[4/3] bg-secondary border border-border rounded-sm overflow-hidden p-4 -rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src={categoryWomen}
                  alt="Custom Tees"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- BEFORE & AFTER SLIDER --- */}
        <BeforeAfterSlider
          beforeImage={sadBeforeImage}
          afterImage={happyAfterImage}
        />

        {/* Best Sellers */}
        <section className="bg-secondary py-12 lg:py-20">
          <div className="container">
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-serif text-2xl lg:text-3xl">Best Sellers</h2>
              <Link
                to="/shop"
                className="luxury-button text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                View All <ArrowRight size={12} />
              </Link>
            </div>
            {bestSellers.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                {bestSellers.map((p: any) => (
                  <ProductCard key={p._id || p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                <p>No best sellers available right now.</p>
              </div>
            )}
          </div>
        </section>

        {/* New Arrivals */}
        <section className="container py-12 lg:py-20">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-serif text-2xl lg:text-3xl">New Arrivals</h2>
            <Link
              to="/shop"
              className="luxury-button text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              View All <ArrowRight size={12} />
            </Link>
          </div>
          {newArrivals.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
              {newArrivals.map((p: any) => (
                <ProductCard key={p._id || p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              <p>New arrivals coming soon.</p>
            </div>
          )}
        </section>

        {/* All Collection with Pagination */}
        <section className="container pb-12">
          <h2 className="font-serif text-2xl lg:text-3xl mb-12 text-center">
            Our Collection
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {safeProducts.map((p: any) => (
              <ProductCard key={p._id || p.id} product={p} />
            ))}
          </div>

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex justify-center mt-12 gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="p-2 border border-border rounded-md disabled:opacity-50 hover:bg-secondary/50 transition-colors"
                aria-label="Previous Page"
              >
                <ArrowRight size={16} className="rotate-180" />
              </button>
              {[...Array(pages).keys()].map((x) => (
                <button
                  key={x + 1}
                  onClick={() => setPage(x + 1)}
                  className={`w-8 h-8 flex items-center justify-center rounded-md text-sm transition-colors ${
                    page === x + 1
                      ? "bg-primary text-primary-foreground font-medium"
                      : "hover:bg-secondary/50 border border-border"
                  }`}
                >
                  {x + 1}
                </button>
              ))}
              <button
                disabled={page === pages}
                onClick={() => setPage((p) => Math.min(pages, p + 1))}
                className="p-2 border border-border rounded-md disabled:opacity-50 hover:bg-secondary/50 transition-colors"
                aria-label="Next Page"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </section>

        {/* Mission / Philosophy */}
        <section className="container pb-20 lg:pb-32 pt-4">
          <div className="max-w-4xl mx-auto text-center border-t border-border pt-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="luxury-button text-muted-foreground mb-8 text-xs lg:text-sm tracking-[0.3em]"
            >
              OUR PHILOSOPHY
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-3xl lg:text-5xl leading-tight mb-10 text-foreground"
            >
              "True luxury lies not in excess, but in the absence of the
              unnecessary. We craft timeless silhouettes for the modern soul."
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/about"
                className="inline-block border-b border-foreground pb-1 font-medium text-sm hover:text-black/70 transition-colors uppercase tracking-widest"
              >
                Discover Our Story
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Index;
