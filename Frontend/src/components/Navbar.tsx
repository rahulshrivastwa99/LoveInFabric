import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  Heart,
  LogOut,
  Package,
  Truck,
  Sparkles,
  ShieldCheck,
  Tag,
  Mic,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector, useAppDispatch } from "../store";
import { openCart } from "../store/cartSlice";
import { fetchWishlist } from "../store/wishlistSlice";
import { openAuthModal, initiateLogout } from "../store/authSlice";
import SearchDrawer from "./SearchDrawer";
import AuthModal from "./AuthModal";

// Mega Menu Imports
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";

// Module-level constant — moved outside component to satisfy react-hooks/exhaustive-deps
const announcements = [
  {
    text: "Get Upto 15% Cashback via Scratch Card on transaction via MobiKwik UPI with MOV as ₹1499/-. T&C Apply*.",
  },
  {
    text: "Get up to ₹250 cashback on payment via Mobikwik wallet over Rs. 999. T&C Apply*.",
  },
  {
    text: "Get 10% Cashback on Minimum transaction value of ₹999 on your payment via MobiKwik UPI. T&C Apply*.",
  },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // --- ROTATING ANNOUNCEMENTS ---
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // --- SCROLL LOGIC ---
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      setScrolled(currentScrollY > 50);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartItems = useAppSelector((s) => s.cart.items);
  const wishlistItems = useAppSelector((s) => s.wishlist.items);
  const { user } = useAppSelector((s) => s.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalWishlist = wishlistItems.length;

  useEffect(() => {
    if (user) {
      dispatch(fetchWishlist());
    }
  }, [user, dispatch]);

  const navLinks = [
    { to: "/shop", label: "Shop All" },
    { to: "/shop?category=Blankets", label: "Premium Blankets" },
    { to: "/shop?category=Custom Tees", label: "Custom Tees" },
  ];

  const handleLogout = () => {
    dispatch(initiateLogout());
    setProfileOpen(false);
  };

  // --- DYNAMIC COLORS BASED ON SCROLL STATE ---
  const textColorClass = scrolled
    ? "text-foreground"
    : "text-white drop-shadow-sm";
  const iconColorClass = scrolled
    ? "text-foreground/80 hover:text-foreground"
    : "text-white/90 hover:text-white drop-shadow-sm";

  // CHANGED: Set Search Bar to exactly 0.3 transparency (bg-white/30) when at the top
  const searchBarBg = scrolled
    ? "bg-secondary/30 border-border/60 focus-within:bg-background focus-within:border-foreground/50"
    : "bg-white/30 border-white/30 focus-within:bg-white/40 focus-within:border-white/70 backdrop-blur-md shadow-sm";

  const searchIconColor = scrolled ? "text-muted-foreground" : "text-white/90";
  const searchPlaceholderColor = scrolled
    ? "placeholder:text-muted-foreground"
    : "placeholder:text-white/80";

  return (
    <>
      <AuthModal />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b
        ${isVisible ? "translate-y-0" : "-translate-y-full"} 
        ${scrolled ? "bg-background/95 backdrop-blur-md shadow-md border-border/40" : "bg-transparent border-transparent"}`}
      >
        {/* --- ROTATING ANNOUNCEMENT BAR --- */}
        <div className="w-full bg-[#FAF9F6] py-2 overflow-hidden relative border-b border-stone-200">
          <div className="container flex items-center justify-center h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentAnnouncement}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex items-center absolute w-full justify-center px-4"
              >
                <span className="text-stone-800 font-sans text-[10px] md:text-[11px] uppercase tracking-wider font-semibold text-center truncate">
                  {announcements[currentAnnouncement].text}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ======================================= */}
        {/* TIER 1: LOGO, BIG SEARCH BAR, & ICONS   */}
        {/* ======================================= */}
        <div className="container flex items-center justify-between py-4 lg:py-6 gap-8 transition-all duration-300">
          <button
            className={`lg:hidden p-2 -ml-2 mr-2 ${textColorClass}`}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={28} strokeWidth={1.5} />
          </button>

          <Link
            to="/"
            className={`font-serif text-2xl lg:text-4xl tracking-[0.1em] font-bold z-50 flex-shrink-0 transition-colors duration-300 ${textColorClass}`}
          >
            The Lyyn
            <span className="text-xs align-top ml-0.5 tracking-normal font-sans font-light">
              ®
            </span>
          </Link>

          <div
            className={`hidden lg:flex flex-1 max-w-3xl relative border rounded-sm transition-all duration-300 ${searchBarBg}`}
          >
            <Search
              size={20}
              strokeWidth={1.5}
              className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${searchIconColor}`}
            />
            <input
              type="text"
              placeholder="Search The Lyyn"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery.trim()) {
                  navigate(
                    `/shop?keyword=${encodeURIComponent(searchQuery.trim())}`,
                  );
                }
              }}
              className={`w-full pl-12 pr-12 py-3 bg-transparent border-none outline-none text-sm font-sans tracking-wide transition-colors duration-300 ${textColorClass} ${searchPlaceholderColor}`}
            />
            {searchQuery ? (
              <button
                className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${iconColorClass}`}
                onClick={() => setSearchQuery("")}
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            ) : (
              <Mic
                size={20}
                strokeWidth={1.5}
                className={`absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer transition-colors duration-300 ${iconColorClass}`}
              />
            )}
          </div>

          <div className="flex-1 lg:hidden"></div>

          <div className="flex items-center gap-6 lg:gap-8 flex-shrink-0">
            <button
              onClick={() => setSearchOpen(true)}
              className={`lg:hidden hover:scale-110 transition-transform ${textColorClass}`}
            >
              <Search size={24} strokeWidth={1.5} />
            </button>

            <div
              className="relative hidden lg:block"
              onMouseEnter={() => setProfileOpen(true)}
              onMouseLeave={() => setProfileOpen(false)}
            >
              <button
                onClick={() => {
                  if (!user) dispatch(openAuthModal({ mode: "login" }));
                  else navigate("/profile");
                }}
                className={`flex flex-col items-center gap-1.5 group transition-colors duration-300 ${iconColorClass}`}
              >
                <User
                  size={24}
                  strokeWidth={1.2}
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="text-[11px] font-medium font-sans tracking-wide">
                  Account
                </span>
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-1/2 translate-x-1/2 top-full pt-4 w-64 z-50"
                  >
                    {/* CHANGED: Profile Sub-box now uses 0.3 transparency with blur */}
                    <div className="bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl p-2 rounded-sm text-foreground">
                      {user ? (
                        <>
                          <div className="px-5 py-4 border-b border-border/50 bg-white/40 mb-2 rounded-sm">
                            <p className="font-medium text-sm truncate text-foreground tracking-wide font-sans">
                              {user.name}
                            </p>
                            <p className="text-[10px] text-stone-800 truncate uppercase tracking-wider mt-1 font-sans">
                              {user.email}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <Link
                              to="/profile"
                              className="block px-4 py-2 text-xs font-medium uppercase tracking-wider hover:bg-white/50 rounded-sm font-sans"
                              onClick={() => setProfileOpen(false)}
                            >
                              My Profile
                            </Link>
                            <Link
                              to="/orders"
                              className="block px-4 py-2 text-xs font-medium uppercase tracking-wider hover:bg-white/50 rounded-sm font-sans"
                              onClick={() => setProfileOpen(false)}
                            >
                              My Orders
                            </Link>
                            {user.isAdmin && (
                              <Link
                                to="/admin/dashboard"
                                className="block px-4 py-2 text-xs font-medium uppercase tracking-wider hover:bg-white/50 rounded-sm font-sans"
                                onClick={() => setProfileOpen(false)}
                              >
                                Admin Dashboard
                              </Link>
                            )}
                          </div>
                          <div className="border-t border-border/50 mt-2 pt-2">
                            <button
                              onClick={handleLogout}
                              className="w-full text-left px-4 py-2 text-xs font-medium uppercase tracking-wider hover:bg-red-50 text-red-600 flex items-center gap-2 rounded-sm font-sans"
                            >
                              <LogOut size={12} /> Sign Out
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="p-5 text-center">
                          <h3 className="text-sm font-serif mb-1 tracking-wide text-foreground">
                            WELCOME
                          </h3>
                          <p className="text-[10px] text-stone-800 mb-4 leading-relaxed font-sans">
                            Join our community for exclusive access.
                          </p>
                          <div className="space-y-2">
                            <button
                              onClick={() => {
                                dispatch(openAuthModal({ mode: "login" }));
                                setProfileOpen(false);
                              }}
                              className="w-full bg-black text-white text-[10px] font-bold uppercase py-2.5 tracking-[0.2em] font-sans"
                            >
                              Login
                            </button>
                            <button
                              onClick={() => {
                                dispatch(openAuthModal({ mode: "signup" }));
                                setProfileOpen(false);
                              }}
                              className="w-full border border-black text-black text-[10px] font-bold uppercase py-2.5 tracking-[0.2em] font-sans"
                            >
                              Sign Up
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/wishlist"
              className={`flex flex-col items-center gap-1.5 relative group transition-colors duration-300 ${iconColorClass}`}
            >
              <div className="relative">
                <Heart
                  size={24}
                  strokeWidth={1.2}
                  className="group-hover:scale-110 transition-transform"
                />
                {totalWishlist > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-red-600 text-white text-[9px] flex items-center justify-center font-bold rounded-full border-2 border-background">
                    {totalWishlist}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-medium font-sans tracking-wide hidden lg:block">
                Wishlist
              </span>
            </Link>

            <button
              onClick={() => dispatch(openCart())}
              className={`flex flex-col items-center gap-1.5 relative group transition-colors duration-300 ${iconColorClass}`}
            >
              <div className="relative">
                <ShoppingBag
                  size={24}
                  strokeWidth={1.2}
                  className="group-hover:scale-110 transition-transform"
                />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-red-600 text-white text-[9px] flex items-center justify-center font-bold rounded-full border-2 border-background">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-medium font-sans tracking-wide hidden lg:block">
                Cart
              </span>
            </button>

            <Link
              to="/orders"
              className={`flex flex-col items-center gap-1.5 group hidden xl:flex transition-colors duration-300 ${iconColorClass}`}
            >
              <Package
                size={24}
                strokeWidth={1.2}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="text-[11px] font-medium font-sans tracking-wide">
                Track Order
              </span>
            </Link>
          </div>
        </div>

        {/* ======================================= */}
        {/* TIER 2: MEGA NAVIGATION MENU            */}
        {/* ======================================= */}
        <div
          className={`hidden lg:flex border-t relative z-40 transition-all duration-300 ${scrolled ? "border-border/40 bg-background" : "border-white/20 bg-transparent"}`}
        >
          <div className="container py-2">
            <NavigationMenu>
              <NavigationMenuList className="gap-4">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/shop"
                      className={`group relative px-4 py-3 text-sm tracking-[0.15em] font-medium uppercase transition-colors font-sans ${scrolled ? "text-foreground/80 hover:text-foreground" : "text-white/90 hover:text-white drop-shadow-sm"}`}
                    >
                      Shop All
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* MEGA DROPDOWN: PREMIUM BLANKETS */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={`group relative px-4 py-3 text-sm tracking-[0.15em] font-medium uppercase transition-colors font-sans bg-transparent data-[state=open]:bg-transparent ${scrolled ? "text-foreground/80 hover:text-foreground" : "text-white/90 hover:text-white drop-shadow-sm"}`}
                  >
                    Premium Blankets
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {/* CHANGED: Mega Menu Sub-box is now 0.3 transparent with blur */}
                    <div className="flex w-[900px] min-h-[420px] bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl rounded-b-sm text-foreground overflow-hidden">
                      <div className="w-[35%] p-10 flex flex-col justify-start bg-white/50">
                        <ul className="flex flex-col gap-6">
                          <li>
                            <Link
                              to="/shop?category=Blankets&type=Fleece"
                              className="text-sm font-semibold text-stone-800 hover:text-black transition-colors font-sans"
                            >
                              Luxury Fleece
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/shop?category=Blankets&type=Weighted"
                              className="text-sm font-semibold text-stone-800 hover:text-black transition-colors font-sans"
                            >
                              Weighted Blankets
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/shop?category=Blankets&type=Knitted"
                              className="text-sm font-semibold text-stone-800 hover:text-black transition-colors font-sans"
                            >
                              Chunky Knitted
                            </Link>
                          </li>
                          <li className="pt-4 mt-2 border-t border-stone-300">
                            <Link
                              to="/shop?category=Blankets&type=All"
                              className="text-sm font-bold text-black hover:opacity-70 transition-opacity font-sans block"
                            >
                              View All Blankets &rarr;
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="w-[65%] p-8 flex items-center justify-center">
                        <div className="relative w-full h-[320px] rounded-md overflow-hidden group/image shadow-md">
                          <img
                            src="https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?q=80&w=600&auto=format&fit=crop"
                            alt="Premium Blankets"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                            <p className="text-white font-serif text-2xl mb-1 drop-shadow-md">
                              The Winter Collection
                            </p>
                            <p className="text-white/90 text-sm font-sans tracking-wide">
                              Wrap yourself in pure luxury.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* MEGA DROPDOWN: CUSTOM TEES */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={`group relative px-4 py-3 text-sm tracking-[0.15em] font-medium uppercase transition-colors font-sans bg-transparent data-[state=open]:bg-transparent ${scrolled ? "text-foreground/80 hover:text-foreground" : "text-white/90 hover:text-white drop-shadow-sm"}`}
                  >
                    Custom Tees
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {/* CHANGED: Mega Menu Sub-box is now 0.3 transparent with blur */}
                    <div className="flex w-[900px] min-h-[420px] bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl rounded-b-sm text-foreground overflow-hidden">
                      <div className="w-[35%] p-10 flex flex-col justify-start bg-white/50">
                        <ul className="flex flex-col gap-6">
                          <li>
                            <Link
                              to="/shop?category=Custom Tees&type=Men"
                              className="text-sm font-semibold text-stone-800 hover:text-black transition-colors font-sans"
                            >
                              Men's Fits
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/shop?category=Custom Tees&type=Women"
                              className="text-sm font-semibold text-stone-800 hover:text-black transition-colors font-sans"
                            >
                              Women's Fits
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/shop?category=Custom Tees&type=Oversized"
                              className="text-sm font-semibold text-stone-800 hover:text-black transition-colors font-sans"
                            >
                              Oversized Collection
                            </Link>
                          </li>
                          <li className="pt-4 mt-2 border-t border-stone-300">
                            <Link
                              to="/custom-design"
                              className="text-sm font-bold text-blue-800 hover:opacity-70 transition-opacity font-sans block"
                            >
                              Design Your Own &rarr;
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="w-[65%] p-8 flex items-center justify-center">
                        <div className="relative w-full h-[320px] rounded-md overflow-hidden group/image shadow-md">
                          <img
                            src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop"
                            alt="Custom Tees"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                            <p className="text-white font-serif text-2xl mb-1 drop-shadow-md">
                              Wear Your Story
                            </p>
                            <p className="text-white/90 text-sm font-sans tracking-wide">
                              Premium customized fits.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <SearchDrawer
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
        />
      </header>

      {/* --- Mobile Menu Drawer --- */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[90] bg-black/20 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="fixed top-0 left-0 bottom-0 z-[90] w-[85%] max-w-sm bg-background flex flex-col shadow-2xl border-r border-border text-foreground"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-border/50">
                <span className="text-xl tracking-[0.2em] font-bold font-serif">
                  The Lyyn.
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 -mr-2 text-muted-foreground hover:text-foreground hover:rotate-90 transition-all duration-300"
                >
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-8">
                <div className="flex flex-col gap-6">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <Link
                        to={link.to}
                        onClick={() => setMobileOpen(false)}
                        className="text-2xl font-light tracking-wide text-foreground/80 hover:text-foreground transition-colors uppercase block font-sans"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-6"
                  >
                    <Link
                      to="/wishlist"
                      onClick={() => setMobileOpen(false)}
                      className="text-2xl font-light tracking-wide text-foreground/80 hover:text-foreground transition-colors uppercase block flex items-center gap-3 font-sans"
                    >
                      Wishlist{" "}
                      {totalWishlist > 0 && (
                        <span className="text-sm bg-foreground text-background px-2 py-0.5 rounded-full font-bold">
                          {totalWishlist}
                        </span>
                      )}
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setMobileOpen(false)}
                      className="text-2xl font-light tracking-wide text-foreground/80 hover:text-foreground transition-colors uppercase block font-sans"
                    >
                      Track Order
                    </Link>
                  </motion.div>
                </div>
                <div className="w-10 h-px bg-border/50 my-8"></div>
                {user ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col gap-5"
                  >
                    <div className="flex items-center gap-3 mb-4 bg-secondary/30 p-3 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg font-medium border border-border">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-sm font-sans">
                          {user.name}
                        </p>
                        <p className="text-xs text-muted-foreground font-sans">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setMobileOpen(false)}
                      className="text-lg font-medium tracking-widest text-muted-foreground hover:text-foreground uppercase transition-colors font-sans"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setMobileOpen(false)}
                      className="text-lg font-medium tracking-widest text-muted-foreground hover:text-foreground uppercase transition-colors font-sans"
                    >
                      My Orders
                    </Link>
                    {user.isAdmin && (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setMobileOpen(false)}
                        className="text-lg tracking-widest text-blue-600 hover:text-blue-700 uppercase transition-colors font-semibold font-sans"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileOpen(false);
                      }}
                      className="text-lg tracking-widest text-left text-red-500 hover:text-red-600 uppercase transition-colors mt-2 font-sans"
                    >
                      Sign Out
                    </button>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      onClick={() => {
                        dispatch(openAuthModal({ mode: "login" }));
                        setMobileOpen(false);
                      }}
                      className="w-full bg-foreground text-background py-4 text-sm font-bold uppercase tracking-widest hover:bg-foreground/90 transition-all font-sans"
                    >
                      Login
                    </motion.button>
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      onClick={() => {
                        dispatch(openAuthModal({ mode: "signup" }));
                        setMobileOpen(false);
                      }}
                      className="w-full border border-foreground text-foreground py-4 text-sm font-bold uppercase tracking-widest hover:bg-secondary transition-all font-sans"
                    >
                      Sign Up
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
