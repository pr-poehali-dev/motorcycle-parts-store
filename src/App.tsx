import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import AboutPage from './pages/AboutPage';
import ContactsPage from './pages/ContactsPage';
import Navigation from './components/Navigation';
import CartSidebar from './components/CartSidebar';

const queryClient = new QueryClient();

export type Page = 'home' | 'catalog' | 'product' | 'cart' | 'about' | 'contacts';

export interface CartItem {
  id: number;
  name: string;
  partNumber: string;
  price: number;
  quantity: number;
  image: string;
  brand: string;
}

export interface Product {
  id: number;
  name: string;
  partNumber: string;
  brand: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  compatibility: string[];
  inStock: boolean;
  specs: Record<string, string>;
  description: string;
  rating: number;
  reviews: number;
}

function AppInner() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const navigate = (page: Page, product?: Product) => {
    setCurrentPage(page);
    if (product) setSelectedProduct(product);
    window.scrollTo(0, 0);
  };

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        partNumber: product.partNumber,
        price: product.price,
        quantity: 1,
        image: product.image,
        brand: product.brand,
      }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: number, qty: number) => {
    if (qty <= 0) return removeFromCart(id);
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        currentPage={currentPage}
        navigate={navigate}
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
      />

      {currentPage === 'home' && (
        <HomePage navigate={navigate} addToCart={addToCart} />
      )}
      {currentPage === 'catalog' && (
        <CatalogPage navigate={navigate} addToCart={addToCart} />
      )}
      {currentPage === 'product' && selectedProduct && (
        <ProductPage product={selectedProduct} navigate={navigate} addToCart={addToCart} />
      )}
      {currentPage === 'cart' && (
        <CartPage
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          navigate={navigate}
        />
      )}
      {currentPage === 'about' && <AboutPage navigate={navigate} />}
      {currentPage === 'contacts' && <ContactsPage />}

      <CartSidebar
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        navigate={navigate}
      />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppInner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
