import { X, Minus, Plus, ShoppingBag, Truck, Banknote, RefreshCcw, ShieldCheck, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/store';
import { closeCart, removeFromCart, updateQuantity, addToCart } from '@/store/cartSlice';
import { openAuthModal } from '@/store/authSlice';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CartItem = ({ item }: { item: any }) => {
  const dispatch = useAppDispatch();
  const [selectedSize, setSelectedSize] = useState(item.size);

  // Fetch product details for live stock/size info
  const { data: product } = useQuery({
    queryKey: ['product', item.productId],
    queryFn: async () => {
      const { data } = await axios.get(`${BACKEND_URL}/api/products/${item.productId}`);
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleSizeChange = (newSize: string) => {
      if (newSize === item.size) return;

      // Remove old item
      dispatch(removeFromCart({ 
          productId: item.productId, 
          size: item.size, 
          color: item.color,
          customText: item.customText
      }));

      // Add new item with new size
      dispatch(addToCart({
          ...item,
          size: newSize,
          quantity: item.quantity // Keep same quantity
      }));
      
      setSelectedSize(newSize);
  };

  const availableSizes = product?.sizes || [];
  const currentSizeStock = availableSizes.find((s: any) => s.size === item.size)?.stock || 0;
  
  // Ensure quantity doesn't exceed stock
  useEffect(() => {
      if (product && item.quantity > currentSizeStock && currentSizeStock > 0) {
          dispatch(updateQuantity({
              productId: item.productId,
              size: item.size,
              color: item.color,
              customText: item.customText,
              quantity: currentSizeStock
          }));
      }
  }, [product, currentSizeStock, item.quantity, item.productId, item.size, item.color, dispatch]);


  return (
    <div className="flex gap-4 bg-transparent p-3 rounded-lg border border-transparent shadow-sm hover:bg-secondary/10 transition-colors">
      <div className="w-20 h-24 bg-secondary/20 rounded-md overflow-hidden flex-shrink-0">
        <img src={item.image} alt={item.name} crossOrigin="anonymous" className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-sm text-foreground line-clamp-2">{item.name}</h4>
            {item.customText && (
               <p className="text-xs text-muted-foreground mt-0.5">Customization: "{item.customText}"</p>
            )}
            <button
              onClick={() => dispatch(removeFromCart({ productId: item.productId, size: item.size, color: item.color, customText: item.customText }))}
              className="text-muted-foreground hover:text-red-500 transition-colors p-1"
            >
              <X size={14} />
            </button>
          </div>

          {/* New Selectors Row */}
          <div className="flex items-center gap-3 mt-2">
            {/* Size Dropdown */}
            <div className="relative">
                <select
                    value={item.size}
                    onChange={(e) => handleSizeChange(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    disabled={!product}
                >
                    {availableSizes.map((s: any) => (
                        <option 
                            key={s.size} 
                            value={s.size} 
                            disabled={s.stock === 0}
                        >
                            {s.size} {s.stock === 0 ? '(Out of Stock)' : ''}
                        </option>
                    ))}
                    {!product && <option value={item.size}>{item.size}</option>}
                </select>
                <div className="flex items-center gap-1 border border-border/60 rounded-[4px] px-2 py-1 text-[10px] font-bold uppercase text-foreground bg-secondary/10 shadow-sm whitespace-nowrap">
                    SIZE: {item.size} <ChevronDown size={10} className="text-muted-foreground" />
                </div>
            </div>

            {/* Quantity Dropdown */}
            <div className="relative">
              <select
                value={item.quantity}
                onChange={(e) => dispatch(updateQuantity({ productId: item.productId, size: item.size, color: item.color, customText: item.customText, quantity: Number(e.target.value) }))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              >
                {Array.from({ length: Math.min(10, Math.max(1, currentSizeStock)) }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              <div className="flex items-center gap-1 border border-border/60 rounded-[4px] px-2 py-1 text-[10px] font-bold uppercase text-foreground bg-secondary/10 shadow-sm whitespace-nowrap">
                QTY: {item.quantity} <ChevronDown size={10} className="text-muted-foreground" />
              </div>
            </div>
            
             {currentSizeStock < 5 && currentSizeStock > 0 && (
                <span className="text-[9px] text-red-500 font-medium animate-pulse">
                    Only {currentSizeStock} left!
                </span>
             )}
          </div>
        </div>

        <div className="flex items-center justify-end mt-2">
          <div className="text-right">
            <p className="font-bold text-sm text-foreground">₹{item.price * item.quantity}</p>
            <p className="text-[10px] text-muted-foreground line-through">₹{Math.round(item.price * 1.4) * item.quantity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartDrawer = () => {
  const { items, isOpen } = useAppSelector((s) => s.cart);
  const { isLoggedIn } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Simulated Pricing Logic
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const originalTotal = Math.round(subtotal * 1.4); // Simulating 40% off
  const savings = originalTotal - subtotal;

  const handleCheckout = () => {
    dispatch(closeCart());
    if (!isLoggedIn) {
      dispatch(openAuthModal({ mode: 'login' }));
    } else {
      navigate('/checkout');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
            onClick={() => dispatch(closeCart())}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 z-[90] w-full max-w-md bg-background shadow-2xl flex flex-col h-full border-l border-border"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border shadow-sm relative z-10 bg-background/80 backdrop-blur-md">
              <h2 className="font-serif text-lg tracking-wide text-foreground">MY BAG ({items.length})</h2>
              <button onClick={() => dispatch(closeCart())} className="p-2 hover:bg-secondary rounded-full transition-colors text-foreground">
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto bg-background pb-32">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full space-y-4 p-8">
                  <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center text-muted-foreground">
                    <ShoppingBag size={24} />
                  </div>
                  <p className="text-muted-foreground font-medium">Your bag is empty</p>
                  <button 
                    onClick={() => dispatch(closeCart())}
                    className="text-primary font-medium underline underline-offset-4 hover:text-primary/80 transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  
                  {/* Free Delivery Banner */}
                  <div className="bg-green-500/10 text-green-600 px-4 py-3 rounded-md text-sm font-medium text-center border border-green-500/20">
                    Yayyy! You get <span className="font-bold">FREE delivery</span> on this order
                  </div>

                  {/* Cart Items */}
                  <div className="space-y-4">
                    {items.map((item) => (
                      <CartItem key={`${item.productId}-${item.size}-${item.color}`} item={item} />
                    ))}
                  </div>

                  {/* Trust Badges */}
                  <div className="bg-secondary/5 p-4 rounded-lg border border-border/50 shadow-sm mt-4">
                    <div className="grid grid-cols-3 gap-2 text-center divide-x divide-border/50">
                        <div className="flex flex-col items-center gap-2 px-1">
                            <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-foreground">
                                <Banknote size={16} />
                            </div>
                            <span className="text-[10px] uppercase font-bold text-muted-foreground leading-tight">Cash on<br/>Delivery</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 px-1">
                            <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-foreground">
                                <Truck size={16} />
                            </div>
                            <span className="text-[10px] uppercase font-bold text-muted-foreground leading-tight">Free Shipping<br/>On All Orders</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 px-1">
                            <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-foreground">
                                <RefreshCcw size={16} />
                            </div>
                            <span className="text-[10px] uppercase font-bold text-muted-foreground leading-tight">Easy<br/>Returns</span>
                        </div>
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* Sticky Footer */}
            {items.length > 0 && (
              <div className="absolute bottom-0 left-0 right-0 bg-background shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-20 border-t border-border">
                 {/* Savings Strip */}
                 <div className="bg-green-500/10 text-green-600 py-2 text-center text-xs font-bold flex items-center justify-center gap-2">
                    <ShieldCheck size={14} className="text-green-600" />
                    You saved ₹{savings.toLocaleString()} on this order
                 </div>
                 
                 <div className="p-4 flex gap-4 items-center">
                    <div className="flex-1">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold font-serif text-foreground">₹{subtotal.toLocaleString()}</span>
                            <span className="text-xs text-muted-foreground line-through">₹{originalTotal.toLocaleString()}</span>
                        </div>
                    </div>
                    <button
                        onClick={handleCheckout}
                        className="flex-1 bg-primary hover:bg-primary/90 text-white font-body font-medium tracking-widest py-3 px-6 rounded-md shadow-lg uppercase text-xs transition-all luxury-button"
                    >
                        Proceed to Buy
                    </button>
                 </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
