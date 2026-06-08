/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'marmita' | 'panqueca' | 'parmeggiana' | 'strogonoff' | 'bebida';
  image?: string;
  featured?: boolean;
  sideDishes?: string;
}

export interface CartItem extends Product {
  quantity: number;
  observations?: string;
  cartId: string; // Unique ID for items in cart (to allow same product with different observations)
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customer: {
    name: string;
    phone: string;
    address: string;
    number: string;
    complement?: string;
  };
  paymentMethod: 'dinheiro' | 'pix' | 'cartao';
}
