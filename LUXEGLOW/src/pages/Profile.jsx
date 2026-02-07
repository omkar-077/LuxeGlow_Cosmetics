import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Package, LogOut, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { validateName } from "@/utils/validators";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const [name, setName] = useState(user?.name || "");
  const [saving, setSaving] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const err = validateName(name);
    if (err) {
      toast.error(err);
      return;
    }

    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    updateProfile(name);
    setSaving(false);
    toast.success("Profile updated");
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="section-padding">
      <div className="container-luxe max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="font-display text-3xl md:text-4xl">
                My Account
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Welcome back, {user?.name}
              </p>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground"
            >
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { label: "Cart Items", value: cartCount },
              { label: "Wishlist", value: wishlistCount },
              { label: "Orders", value: 0 },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-card border border-border/30 p-4 text-center"
              >
                <p className="text-2xl font-body font-semibold text-primary">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="bg-card border border-border/30 h-auto p-1 w-full">
              <TabsTrigger
                value="profile"
                className="flex-1 data-[state=active]:bg-muted"
              >
                <User className="w-3.5 h-3.5 mr-1.5" /> Profile
              </TabsTrigger>

              <TabsTrigger
                value="orders"
                className="flex-1 data-[state=active]:bg-muted"
              >
                <Package className="w-3.5 h-3.5 mr-1.5" /> Orders
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <div className="bg-card border border-border/30 p-6">
                <h3 className="font-display text-lg mb-6">
                  Profile Information
                </h3>

                <form
                  onSubmit={handleUpdateProfile}
                  className="space-y-4 max-w-md"
                >
                  <div>
                    <label className="text-xs tracking-widest uppercase text-muted-foreground mb-1.5 block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-transparent border border-border px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs tracking-widest uppercase text-muted-foreground mb-1.5 block">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user?.email || ""}
                      disabled
                      className="w-full bg-muted border border-border px-3 py-2.5 text-sm text-muted-foreground cursor-not-allowed"
                    />
                  </div>

                  <Button
                    variant="luxe"
                    type="submit"
                    disabled={saving}
                  >
                    {saving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </form>
              </div>
            </TabsContent>

            <TabsContent value="orders">
              <div className="bg-card border border-border/30 p-6 text-center py-16">
                <Package className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-display text-lg mb-1">
                  No Orders Yet
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your order history will appear here once you make a purchase.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
