import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Search, Heart, ShoppingBag, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border/50">
      <nav className="container-luxe flex items-center justify-between h-16 md:h-20">

        {/* Mobile menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button className="md:hidden p-2 text-foreground" aria-label="Menu">
              <Menu className="w-5 h-5" />
            </button>
          </SheetTrigger>

          <SheetContent side="left" className="bg-background border-border w-72">
            <div className="flex flex-col gap-6 mt-8">
              <Link
                to="/"
                className="font-display text-xl tracking-widest text-primary"
                onClick={() => setMobileOpen(false)}
              >
                LUXEGLOW
              </Link>

              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "text-sm tracking-wide transition-colors",
                    pathname === link.to
                      ? "text-primary"
                      : "text-foreground/70 hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {isAuthenticated && (
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="text-sm tracking-wide text-foreground/70 hover:text-foreground text-left flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              )}
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link
          to="/"
          className="font-display text-lg md:text-xl tracking-[0.3em] text-primary"
        >
          LUXEGLOW
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "text-xs tracking-widest uppercase transition-colors relative pb-1",
                pathname === link.to
                  ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-primary"
                  : "text-foreground/60 hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-1 md:gap-3">

          {/* Search */}
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search…"
                className="w-28 md:w-40 bg-transparent border-b border-primary/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary py-1"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-2 text-foreground/60"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-foreground/60 hover:text-foreground transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="p-2 text-foreground/60 hover:text-foreground transition-colors relative"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] font-body font-semibold luxe-gradient text-primary-foreground rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="p-2 text-foreground/60 hover:text-foreground transition-colors relative"
            aria-label="Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] font-body font-semibold luxe-gradient text-primary-foreground rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User */}
          {isAuthenticated ? (
            <Link
              to="/profile"
              className="p-2 text-foreground/60 hover:text-foreground transition-colors"
              aria-label="Profile"
            >
              <User className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              to="/login"
              className="p-2 text-foreground/60 hover:text-foreground transition-colors"
              aria-label="Login"
            >
              <User className="w-4 h-4" />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
