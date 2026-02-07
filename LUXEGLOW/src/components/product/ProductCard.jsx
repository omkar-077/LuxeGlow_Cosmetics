import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { formatPrice, calculateDiscount } from "@/utils/helpers";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!product.inStock) return;
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
    toast.success(wishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative overflow-hidden bg-card border border-border/30 hover-lift">

          {/* Image */}
          <div className="aspect-[3/4] overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="px-2 py-0.5 text-[10px] tracking-widest uppercase font-body font-semibold luxe-gradient text-primary-foreground">
                New
              </span>
            )}
            {product.isBestseller && (
              <span className="px-2 py-0.5 text-[10px] tracking-widest uppercase font-body font-semibold rose-gradient text-accent-foreground">
                Bestseller
              </span>
            )}
            {product.originalPrice && (
              <span className="px-2 py-0.5 text-[10px] tracking-widest uppercase font-body font-semibold bg-destructive text-destructive-foreground">
                -{calculateDiscount(product.price, product.originalPrice)}%
              </span>
            )}
            {!product.inStock && (
              <span className="px-2 py-0.5 text-[10px] tracking-widest uppercase font-body font-semibold bg-muted text-muted-foreground">
                Sold Out
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleToggleWishlist}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                wishlisted
                  ? "bg-accent text-accent-foreground"
                  : "bg-background/80 backdrop-blur-sm text-foreground hover:bg-accent hover:text-accent-foreground"
              )}
              aria-label="Toggle wishlist"
            >
              <Heart className={cn("w-3.5 h-3.5", wishlisted && "fill-current")} />
            </button>

            {product.inStock && (
              <button
                onClick={handleAddToCart}
                className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                aria-label="Add to cart"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Info */}
          <div className="p-4">
            <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-1">
              {product.category}
            </p>
            <h3 className="font-display text-sm text-foreground mb-2 leading-snug">
              {product.name}
            </h3>

            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-3 h-3",
                    i < Math.floor(product.rating)
                      ? "fill-primary text-primary"
                      : "text-muted-foreground/30"
                  )}
                />
              ))}
              <span className="text-[10px] text-muted-foreground ml-1">
                ({product.reviews})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-body font-semibold text-sm text-foreground">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="font-body text-xs text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
