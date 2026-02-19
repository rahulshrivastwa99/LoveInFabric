import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store";
import { addToCart, openCart } from "@/store/cartSlice";
import { addToWishlist, removeFromWishlist } from "@/store/wishlistSlice";
import { Heart, Plus } from "lucide-react";
import { toast } from "sonner";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [hovered, setHovered] = useState(false);
  const dispatch = useAppDispatch();

  // Wishlist Logic
  const wishlistItems = useAppSelector((s) => s.wishlist.items);
  const isWishlisted = wishlistItems.some((item) => item._id === product._id);
  const { user } = useAppSelector((state) => state.auth);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product page
    e.stopPropagation();

    if (!user) {
      toast.error("Please login to use wishlist");
      return;
    }
    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Basic validation to prevent errors
    if (
      !product.sizes?.length ||
      !product.colors?.length ||
      !product.images?.length
    ) {
      toast.error("Select options on details page");
      return;
    }

    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        // Default to first available options for Quick Add
        size: product.sizes[0]?.size || "One Size",
        color: product.colors[0].name,
        image: product.images[0],
      }),
    );
    toast.success("Added to bag");
    dispatch(openCart());
  };

  return (
    <Link to={`/product/${product._id}`} className="group block">
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="glass-panel p-4 hover:-translate-y-1 transition-transform duration-300"
      >
        {/* --- IMAGE CONTAINER --- */}
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary/20 mb-4 rounded-xl">
          {/* Category Tag (Optional - visual polish) */}
          {product.category && (
            <span className="absolute top-2 left-2 z-10 bg-background/90 backdrop-blur-md px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-primary shadow-sm">
              {product.category}
            </span>
          )}

          {/* Wishlist Button (Top Right) */}
          <button
            onClick={handleToggleWishlist}
            className="absolute top-2 right-2 z-10 p-2 bg-background/80 backdrop-blur-md rounded-full hover:bg-primary hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0 shadow-sm"
          >
            <Heart
              size={16}
              className={`transition-colors ${isWishlisted ? "fill-red-500 text-red-500" : "currentColor"}`}
            />
          </button>

          {/* Product Image (Swap Logic) */}
          <img
            src={
              product.images && product.images.length > 0
                ? hovered && product.images[1]
                  ? product.images[1]
                  : product.images[0]
                : "/placeholder.png"
            }
            alt={product.name}
            crossOrigin="anonymous"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Quick Add Button (Slide Up) */}
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md text-primary py-3 font-bold uppercase text-[10px] md:text-xs tracking-[0.2em] translate-y-[120%] group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2 hover:bg-primary hover:text-white border border-white/20 rounded-full shadow-lg luxury-button"
          >
            <Plus size={14} /> Quick Add
          </button>
        </div>

        {/* --- INFO SECTION --- */}
        <div className="space-y-1">
          <h3 className="font-serif text-base text-foreground group-hover:text-primary transition-colors truncate">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-foreground/80 tracking-wider">
              ₹{product.price?.toLocaleString()}
            </span>
            {/* Optional: Show strikethrough price if you have 'originalPrice' in data */}
            {/* <span className="text-[10px] text-muted-foreground line-through">₹2,999</span> */}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
