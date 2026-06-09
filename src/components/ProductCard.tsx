import React from 'react';
import { motion } from 'motion/react';
import { Plus, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
  key?: React.Key;
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  const isFeatured = product.featured;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative bg-white rounded-3xl overflow-hidden shadow-xl flex flex-col h-full border-4 ${
        isFeatured ? 'border-brand-gold' : 'border-transparent'
      }`}
    >
      {isFeatured && (
        <div className="absolute top-4 right-4 bg-brand-gold text-brand-tomato font-bold px-4 py-1 rounded-full text-xs uppercase tracking-wider z-10 shadow-sm">
          Marmita do Dia
        </div>
      )}

      <div className="relative h-48 bg-gray-100 overflow-hidden group">
        <div className="absolute inset-0 bg-brand-tomato/10 group-hover:bg-brand-tomato/20 transition-colors pointer-events-none z-10" />
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
              {/* Placeholder for food images if they were available */}
              <div className="text-brand-tomato/40 flex flex-col items-center">
                  <ShoppingBag size={48} strokeWidth={1.5} />
                  <span className="text-[10px] mt-2 font-display uppercase tracking-widest font-bold opacity-60">Delícia Fresquinha</span>
              </div>
          </div>
        )}
      </div>

      <div className="p-3 md:p-6 flex flex-col flex-grow">
        <h3 className="font-display font-extrabold text-base md:text-2xl text-brand-tomato leading-tight mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-[10px] md:text-sm mb-4 flex-grow italic line-clamp-2 md:line-clamp-none">
          {product.description}
        </p>

        <div className="mt-auto pt-2 md:pt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-gray-400 text-[8px] md:text-[10px] uppercase font-bold tracking-tighter">A partir de</span>
            <span className="text-lg md:text-2xl font-display font-black text-brand-tomato">
              {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAdd(product)}
            className="w-full md:w-auto bg-brand-green text-white p-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl flex items-center justify-center gap-1 md:gap-2 font-display font-bold text-xs md:text-base shadow-lg shadow-brand-green/30 min-h-[36px] md:min-h-[44px]"
          >
            <Plus className="w-4 h-4 md:w-5 md:h-5" strokeWidth={3} />
            <span className="md:inline block">QUERO</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
