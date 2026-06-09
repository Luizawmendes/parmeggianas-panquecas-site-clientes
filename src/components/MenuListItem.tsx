import React from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { Product } from '../types';

interface MenuListItemProps {
  product: Product;
  onAdd: (product: Product) => void;
  key?: React.Key;
}

export function MenuListItem({ product, onAdd }: MenuListItemProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-2xl p-4 flex items-center justify-between gap-4 shadow-sm border border-gray-100"
    >
      <div className="flex-grow">
        <h4 className="font-display font-bold text-brand-tomato text-lg leading-tight uppercase">
          {product.name}
        </h4>
        <p className="text-gray-500 text-xs md:text-sm italic mt-1 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-2 text-brand-tomato font-black font-display tracking-tight">
           {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </div>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onAdd(product)}
        className="bg-brand-green text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-brand-green/20 shrink-0"
      >
        <Plus size={24} strokeWidth={3} />
      </motion.button>
    </motion.div>
  );
}
