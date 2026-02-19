import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// --- FIXED IMPORTS ---
// We use 'hero.jpg' for Men because 'category-men.jpg' is missing/deleted
// ✅ ISKI JAGAH YE LIKHO (Apni public picsart images use karo):
const categoryMen = "/images/Picsart_26-02-13_09-57-34-515.jpg"; // Blanket ki pic
const categoryWomen = "/images/Picsart_26-02-13_09-56-10-499.jpg"; // Custom Tee ki pic
const categoryAccessories = "/images/Picsart_26-02-13_10-22-18-512.jpg";

import { useAppDispatch, useAppSelector } from "@/store";
import { fetchProducts } from "@/store/productSlice";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";

const categories = [
  { label: "Premium Blankets", image: categoryMen, to: "/shop?category=Blankets" }, // Using existing img until new asset provided
  { label: "Custom Tees", image: categoryWomen, to: "/shop?category=Custom Tees" }, // Using existing img until new asset provided
  {
    label: "Accessories",
    image: categoryAccessories,
    to: "/shop?category=accessories",
  },
];

const Index = () => {
  const dispatch = useAppDispatch();
  // Get pagination info from store
  const {
    items: products,
    status,
    pages,
  } = useAppSelector((state) => state.products);

  // Local state to drive the effect
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Always fetch when page changes
    dispatch(fetchProducts({ pageNumber: page }));
  }, [page, dispatch]);

  // Safety check to prevent crashes
  const safeProducts = Array.isArray(products) ? products : [];

  // Filter Logic
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

      <main className="overflow-hidden">
        {/* --- HERO SECTION --- */}
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-white to-secondary/30">
             {/* Decorative Background Elements */}
             <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                 <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary/10 blur-3xl animate-float" />
                 <div className="absolute bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-secondary/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
             </div>

             <div className="relative z-10 container flex flex-col items-center justify-center text-center space-y-8 px-4">
                 <motion.h1 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="font-serif text-5xl md:text-7xl lg:text-9xl leading-[0.9] text-gradient tracking-tight"
                 >
                     Cozy Blankets & <br /> Custom Fits
                 </motion.h1>
                 
                 <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="font-body text-lg md:text-2xl font-light tracking-wide max-w-2xl text-muted-foreground"
                 >
                     Wrap yourself in love with our premium blankets, or express yourself with our customizable tees.
                 </motion.p>
                 
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-6 mt-4"
                 >
                     <Link 
                        to="/shop?category=Blankets" 
                        className="luxury-button animate-pulse-glow flex items-center gap-3 px-10 py-4 text-sm"
                     >
                         Shop Blankets <ArrowRight size={16} />
                     </Link>
                     <Link 
                        to="/shop?category=Custom Tees" 
                        className="glass-panel text-primary px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/80 transition-all border border-primary/20 hover:border-primary/50"
                     >
                         Design Your Tee
                     </Link>
                 </motion.div>
             </div>
             
             {/* Scroll Indicator */}
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground"
             >
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-muted-foreground to-transparent" />
             </motion.div>
        </section>

        {/* --- HOW IT WORKS (Process) --- */}
        <section className="py-24 bg-white relative">
             <div className="container text-center max-w-6xl">
                 <span className="text-[10px] uppercase tracking-[0.4em] text-primary/80 font-bold mb-6 block">The Process</span>
                 <h2 className="font-serif text-4xl md:text-5xl mb-20 text-foreground">How Customization Works</h2>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
                     {[
                         { step: "01", title: "Choose Your Base", desc: "Select from our premium blankets or heavy-weight tees." },
                         { step: "02", title: "Customize It", desc: "Add your name, a special date, or a meaningful phrase." },
                         { step: "03", title: "We Craft & Ship", desc: "Each piece is printed to order and shipped with care." }
                     ].map((item, idx) => (
                         <motion.div 
                             key={idx}
                             initial={{ opacity: 0, y: 40 }}
                             whileInView={{ opacity: 1, y: 0 }}
                             viewport={{ once: true, margin: "-100px" }}
                             transition={{ delay: idx * 0.2, duration: 0.6 }}
                             className="group relative"
                         >
                             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-secondary/20 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />
                             <span className="font-serif text-8xl text-foreground/5 block mb-4 transition-transform duration-500 group-hover:-translate-y-2">{item.step}</span>
                             <h3 className="font-serif text-2xl mb-4 relative z-10">{item.title}</h3>
                             <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto relative z-10">{item.desc}</p>
                         </motion.div>
                     ))}
                 </div>
             </div>
        </section>

        {/* --- CATEGORIES --- */}
        <section className="container py-24">
           {/* Section Header */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-center mb-16"
           >
             <h2 className="font-serif text-4xl lg:text-5xl text-foreground">Curated Categories</h2>
           </motion.div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 min-h-[600px]">
             {categories.map((cat, idx) => (
               <Link key={cat.label} to={cat.to} className={`relative overflow-hidden group rounded-2xl ${idx === 1 ? 'md:mt-12 md:-mb-12' : ''}`}>
                 <motion.div
                   className="w-full h-full relative"
                   initial={{ opacity: 0, scale: 0.95 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.6, delay: idx * 0.1 }}
                 >
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />
                   <img
                     src={cat.image}
                     alt={cat.label}
                     className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                   />
                   
                   {/* Glass Overlay Content */}
                   <div className="absolute bottom-8 left-8 right-8 z-20">
                     <div className="glass-panel px-6 py-5 flex items-center justify-between group-hover:translate-y-[-5px] transition-transform duration-300">
                        <h3 className="font-serif text-xl tracking-wide text-foreground">
                          {cat.label}
                        </h3>
                        <ArrowRight size={18} className="text-primary -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                     </div>
                   </div>
                 </motion.div>
               </Link>
             ))}
           </div>
        </section>

        {/* --- FEATURED: BLANKETS --- */}
        <section className="py-32 bg-stone-900 text-white relative overflow-hidden">
             {/* Background Pattern/Texture */}
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed" />
             
             <div className="container relative z-10 flex flex-col md:flex-row items-center gap-16 lg:gap-24">
                 <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="md:w-1/2 space-y-8"
                 >
                     <span className="text-xs uppercase tracking-[0.3em] text-white/60 pl-1 border-l-2 border-primary">The Comfort Edit</span>
                     <h2 className="font-serif text-5xl md:text-6xl leading-tight">Premium Blankets <br/> for Every Home.</h2>
                     <p className="text-white/70 leading-relaxed font-light text-lg max-w-md">
                        Experience the softest touch with our curated range of blankets. 
                        Designed for warmth, style, and those perfect cozy evenings.
                     </p>
                     <Link to="/shop?category=Blankets" className="inline-flex items-center gap-2 border-b border-primary pb-1 uppercase tracking-widest text-xs font-bold pt-4 hover:text-primary transition-colors">
                        Shop Collection <ArrowRight size={14} />
                     </Link>
                 </motion.div>
                 
                 <motion.div 
                    className="md:w-1/2 relative"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                 >
                    <div className="relative aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden shadow-2xl">
                        <img src={categoryMen} alt="Blanket Collection" className="w-full h-full object-cover animate-float" />
                        
                        {/* Floating Badge */}
                        <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-full animate-pulse-glow">
                             <div className="text-center leading-none">
                                 <span className="block text-xs uppercase tracking-widest mb-1">From</span>
                                 <span className="font-serif text-xl font-bold">₹999</span>
                             </div>
                        </div>
                    </div>
                    {/* Decorative Element */}
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10" />
                 </motion.div>
             </div>
        </section>

        {/* --- BEST SELLERS --- */}
        <section className="py-24 bg-background">
          <div className="container">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
              <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold mb-3 block">Customer Favorites</span>
                  <h2 className="font-serif text-4xl lg:text-5xl">Best Sellers</h2>
              </div>
              <Link
                to="/shop"
                className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1"
              >
                View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            {bestSellers.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
                {bestSellers.map((p: any) => (
                  <ProductCard key={p._id || p.id} product={p} />
                ))}
              </div>
            ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
                    {/* Fallback View if no best sellers defined yet */}
                     {[...Array(4)].map((_, i) => (
                         <div key={i} className="animate-pulse">
                             <div className="bg-gray-200 aspect-[3/4] rounded-xl mb-4"></div>
                             <div className="h-4 bg-gray-200 w-3/4 mb-2 rounded"></div>
                             <div className="h-4 bg-gray-200 w-1/4 rounded"></div>
                         </div>
                     ))}
                </div>
            )}
          </div>
        </section>

        {/* --- FEATURED: CUSTOM TEES --- */}
        <section className="py-32 bg-secondary/20 relative">
             <div className="container flex flex-col md:flex-row-reverse items-center gap-16 lg:gap-24">
                 <motion.div 
                    className="md:w-1/2 space-y-8 md:pl-10"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                 >
                     <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground pl-1 border-l-2 border-primary">Express Yourself</span>
                     <h2 className="font-serif text-5xl md:text-6xl leading-tight">Wear Your Vibe. <br/> Custom Tees.</h2>
                     <p className="text-muted-foreground leading-relaxed font-light text-lg max-w-md">
                        Make it truly yours. Add custom text to our premium cotton tees. 
                        Perfect for gifts, events, or just speaking your mind.
                     </p>
                     
                     <div className="flex flex-col gap-4 pt-4">
                         <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-primary font-serif font-bold">1</div>
                             <p className="text-sm font-medium">Pick your favorite color</p>
                         </div>
                         <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-primary font-serif font-bold">2</div>
                             <p className="text-sm font-medium">Add your custom text</p>
                         </div>
                         <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-primary font-serif font-bold">3</div>
                             <p className="text-sm font-medium">Wear it with pride</p>
                         </div>
                     </div>

                     <Link to="/shop?category=Custom Tees" className="mt-8 inline-block bg-primary text-white px-8 py-3 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30">
                        Start Designing
                     </Link>
                 </motion.div>
                 
                 <motion.div 
                    className="md:w-1/2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                 >
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
                        <img src={categoryWomen} alt="Custom Tees" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        
                        {/* Interactive Float Element */}
                        <div className="absolute bottom-10 left-10 right-10 glass-panel p-6 animate-float" style={{ animationDuration: "6s" }}>
                            <div className="flex items-center gap-4">
                                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-2/3 animate-pulse"></div>
                                </div>
                                <span className="text-xs font-bold uppercase whitespace-nowrap">Customizing...</span>
                            </div>
                        </div>
                    </div>
                 </motion.div>
             </div>
        </section>

        {/* --- MISSION / PHILOSOPHY --- */}
        <section className="py-32 bg-stone-900 text-white text-center">
            <div className="container max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-2xl font-serif italic text-primary/80 mb-6 block">Our Philosophy</span>
                    <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-8">
                        "Fabric is not just material. <br/> It's a feeling, a memory, a hug."
                    </h2>
                    <p className="text-xl text-white/60 font-light leading-relaxed mb-12">
                        At LoveInFabric, we believe in creating pieces that bring warmth and personality into your life. 
                        Every stitch is intentional, every fabric chosen for comfort.
                    </p>
                    <img src="/signature.png" alt="LoveInFabric" className="h-12 mx-auto opacity-50 invert" />
                </motion.div>
            </div>
        </section>

        {/* --- ALL COLLECTION --- */}
        <section className="container py-24">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl mb-4 text-foreground">
                Explore The Collection
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
                Discover our full range of premium blankets, tees, and accessories.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {safeProducts.map((p: any) => (
              <ProductCard key={p._id || p.id} product={p} />
            ))}
          </div>

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex justify-center mt-16 gap-3">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="w-10 h-10 flex items-center justify-center border border-border rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-current"
                aria-label="Previous Page"
              >
                <ArrowRight size={16} className="rotate-180" />
              </button>
              {[...Array(pages).keys()].map((x) => (
                <button
                  key={x + 1}
                  onClick={() => setPage(x + 1)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all ${
                    page === x + 1
                      ? "bg-primary text-white shadow-lg scale-110"
                      : "bg-transparent text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {x + 1}
                </button>
              ))}
              <button
                disabled={page === pages}
                onClick={() => setPage((p) => Math.min(pages, p + 1))}
                className="w-10 h-10 flex items-center justify-center border border-border rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-current"
                aria-label="Next Page"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Index;
