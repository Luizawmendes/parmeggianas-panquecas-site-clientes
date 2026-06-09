/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Phone } from 'lucide-react';
import { PRODUCTS } from './products';
import { CartItem, Product } from './types';
import { ProductCard } from './components/ProductCard';
import { MenuListItem } from './components/MenuListItem';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ChevronDown, ChevronUp } from 'lucide-react';

const logoImg = '/src/assets/images/WhatsApp Image 2026-06-02 at 20.08.58.jpeg';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>('parmeggiana');

  const addToCart = (product: Product) => {
    const newItem: CartItem = {
      ...product,
      quantity: 1,
      cartId: Math.random().toString(36).substr(2, 9)
    };
    setCartItems(prev => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId: string) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateObservations = (cartId: string, obs: string) => {
    setCartItems(prev => prev.map(item =>
      item.cartId === cartId ? { ...item, observations: obs } : item
    ));
  };

  const featuredProduct = useMemo(() => PRODUCTS.find(p => p.featured), []);

  const categories = [
    { id: 'parmeggiana', name: 'Parmeggianas' },
    { id: 'panqueca', name: 'Panquecas' },
    { id: 'strogonoff', name: 'Strogonoff' },
    { id: 'bebida', name: 'Bebidas' },
  ];

  const getProductsByCategory = (cat: string) => 
    PRODUCTS.filter(p => p.category === cat && !p.featured);

  return (
    <div className="min-h-screen bg-brand-tomato relative pb-20">
      {/* Header */}
      <header className="pt-6 pb-4 sm:pt-12 sm:pb-8 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 sm:mb-6 flex justify-center"
          >
            <img 
              src={logoImg} 
              alt="P&P Logo" 
              referrerPolicy="no-referrer"
              className="w-32 h-32 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 object-contain hover:scale-[1.05] transition-transform duration-300 rounded-full bg-white p-1" 
              id="header-logo"
            />
          </motion.div>

          {/* Removed phone number below logo as per user request */}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 space-y-8 sm:space-y-12">
        {/* Marmita do Dia Section */}
        {featuredProduct && (
          <section className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="font-display font-black text-xl sm:text-2xl md:text-4xl uppercase tracking-tighter text-white">
                Marmita do Dia
              </h2>
              <div className="h-1 flex-grow bg-brand-gold/30 rounded-full" />
            </div>
            <div className="w-full">
               <ProductCard product={featuredProduct} onAdd={addToCart} />
            </div>
          </section>
        )}

        {/* Menu Categories Section */}
        <section className="space-y-4 sm:space-y-6">
          <div className="flex items-center gap-4">
             <h2 className="font-bubbly text-2xl sm:text-3xl md:text-5xl text-white drop-shadow-lg lowercase">
                Parmeggianas e Panquecas Tradicionais
             </h2>
             <div className="h-1 flex-grow bg-white/20 rounded-full" />
          </div>

          <div className="space-y-3 sm:space-y-4">
            {categories.map((cat) => (
              <div key={cat.id} className="w-full">
                <button
                  onClick={() => setOpenCategory(openCategory === cat.id ? null : cat.id)}
                  className={`w-full flex items-center justify-between p-4 sm:p-6 rounded-2xl sm:rounded-3xl font-display font-black text-lg sm:text-xl md:text-3xl uppercase tracking-tighter transition-all ${
                    openCategory === cat.id 
                    ? 'bg-white text-brand-tomato shadow-2xl' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <span className="flex items-center gap-4">
                    {cat.name}
                  </span>
                  {openCategory === cat.id ? <ChevronUp size={24} className="sm:w-8 sm:h-8" /> : <ChevronDown size={24} className="sm:w-8 sm:h-8" />}
                </button>

                {openCategory === cat.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="overflow-hidden mt-3 sm:mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4"
                  >
                    {getProductsByCategory(cat.id).map(product => (
                      <MenuListItem key={product.id} product={product} onAdd={addToCart} />
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Cart Launcher (Mobile/Desktop Toggle) */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-32 h-14 md:h-16 px-6 md:px-8 bg-white text-brand-tomato rounded-full flex items-center gap-3 shadow-2xl z-40 border-4 border-brand-tomato group"
        id="cart-launcher"
      >
        <div className="relative">
          <ShoppingCart size={24} strokeWidth={3} />
          {cartItems.length > 0 && (
            <span className="absolute -top-3 -right-3 w-6 h-6 bg-brand-green text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">
              {cartItems.length}
            </span>
          )}
        </div>
        <span className="font-display font-black text-sm md:text-lg tracking-tight">VER CARRINHO</span>
      </motion.button>

      {/* WhatsApp Floating Icon */}
      <WhatsAppButton />

      {/* Components Overlay */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateObs={updateObservations}
        onConfirm={() => {
            setIsCartOpen(false);
            setTimeout(() => setIsCheckoutOpen(true), 300);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        total={cartItems.reduce((acc, item) => acc + item.price, 0)}
        onClose={() => setIsCheckoutOpen(false)}
        onSubmit={(data) => {
            const cartTotal = cartItems.reduce((acc, item) => acc + item.price, 0);
            const deliveryFee = data.deliveryType === 'entrega' ? 9 : 0;
            const finalTotal = cartTotal + deliveryFee;

            const itemsList = cartItems.map(item => 
              `*${item.name}* - ${item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}${item.observations ? `\n   _Observação: ${item.observations}_` : ''}`
            ).join('\n\n');

            const addressInfo = data.deliveryType === 'entrega' 
              ? `*Endereço de Entrega:*\n${data.address}, ${data.number}${data.complement ? `\nComp: ${data.complement}` : ''}`
              : `*Retirada no Local*`;

            const message = `*NOVO PEDIDO - #${data.orderId}*\n\n` +
              `*Cliente:* ${data.name}\n` +
              `*WhatsApp:* ${data.phone}\n` +
              `*Pagamento:* ${data.payment.toUpperCase()}\n\n` +
              `*Itens:*\n${itemsList}\n\n` +
              `${addressInfo}\n\n` +
              `---------------------------\n` +
              `Subtotal: ${cartTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\n` +
              (data.deliveryType === 'entrega' ? `Entrega: R$ 9,00\n` : '') +
              `*TOTAL: ${finalTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}*`;

            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/5514997140152?text=${encodedMessage}`, '_blank');
            
            setCartItems([]);
        }}
      />
    </div>
  );
}

