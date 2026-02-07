import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/helpers";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="section-padding container-luxe text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="font-display text-2xl mb-2">Your Cart is Empty</h1>
          <p className="text-sm text-muted-foreground mb-6">Discover our luxurious collection and add something special.</p>
          <Button variant="luxe" asChild>
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-luxe">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="font-display text-3xl md:text-4xl">Shopping Cart</h1>
              <p className="text-sm text-muted-foreground mt-1">{cartCount} item{cartCount !== 1 ? "s" : ""}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => { clearCart(); toast.success("Cart cleared"); }} className="text-muted-foreground">
              Clear All
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-4 md:gap-6 bg-card border border-border/30 p-4"
                >
                  <Link to={`/product/${item.id}`} className="w-20 h-24 md:w-24 md:h-32 flex-shrink-0 overflow-hidden bg-muted">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link to={`/product/${item.id}`} className="font-display text-sm hover:text-primary transition-colors">
                        {item.name}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.category}</p>
                    </div>
                    <div className="flex items-end justify-between">
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-body">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-body font-semibold text-sm">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => { removeFromCart(item.id); toast.success("Removed from cart"); }}
                    className="text-muted-foreground hover:text-foreground transition-colors self-start"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-card border border-border/30 p-6 h-fit sticky top-24">
              <h3 className="font-display text-lg mb-6">Order Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-primary text-xs tracking-widest uppercase">Free</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-body font-semibold">Total</span>
                  <span className="font-body font-semibold text-lg">{formatPrice(cartTotal)}</span>
                </div>
              </div>
              <Button variant="luxe" size="lg" className="w-full" onClick={() => toast.success("Checkout coming soon!")}>
                Checkout <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Link to="/shop" className="block text-center text-xs text-muted-foreground mt-4 hover:text-foreground transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;
