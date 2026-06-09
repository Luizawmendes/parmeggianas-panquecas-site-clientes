import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, Trash2, MessageSquare, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (cartId: string) => void;
  onUpdateObs: (cartId: string, obs: string) => void;
  onConfirm: () => void;
}

export function CartDrawer({ isOpen, onClose, items, onRemove, onUpdateObs, onConfirm }: CartDrawerProps) {
  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white text-gray-900 z-[101] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-bottom border-gray-100 flex items-center justify-between bg-brand-tomato text-white">
              <div className="flex items-center gap-3">
                <ShoppingCart size={24} />
                <h2 className="font-display font-black text-xl md:text-2xl tracking-tight">MEU CARRINHO</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                id="close-cart-btn"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                    <ShoppingCart size={40} className="opacity-20" />
                  </div>
                  <p className="font-display font-bold">Seu carrinho está vazio</p>
                  <button
                    onClick={onClose}
                    className="text-brand-tomato font-bold underline"
                  >
                    Voltar ao cardápio
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.cartId} className="flex flex-col gap-3 group border-b border-gray-100 pb-6 last:border-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-grow">
                        <h4 className="font-display font-extrabold text-brand-tomato leading-tight">
                          {item.name}
                        </h4>
                        <span className="text-xl font-display font-black text-gray-500">
                          {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                      </div>
                      <button
                        onClick={() => onRemove(item.cartId)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        id={`remove-${item.cartId}`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="relative">
                      <MessageSquare size={14} className="absolute top-3 left-3 text-gray-400" />
                      <textarea
                        placeholder="Observações (ex: sem cebola, ponto da carne...)"
                        value={item.observations || ''}
                        onChange={(e) => onUpdateObs(item.cartId, e.target.value)}
                        className="w-full text-sm bg-gray-50 border border-gray-200 rounded-xl p-2 pl-9 focus:ring-2 focus:ring-brand-tomato/20 focus:border-brand-tomato outline-none min-h-[60px] resize-none transition-all"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 font-bold uppercase tracking-widest text-xs">Total do Pedido</span>
                <span className="text-3xl font-display font-black text-brand-tomato">
                  {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>

              <button
                disabled={items.length === 0}
                onClick={onConfirm}
                className="w-full bg-brand-green text-white py-4 rounded-2xl flex items-center justify-center gap-3 font-display font-extrabold text-lg shadow-xl shadow-brand-green/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 disabled:shadow-none"
                id="finish-order-btn"
              >
                FINALIZAR PEDIDO
                <ArrowRight size={20} strokeWidth={3} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
