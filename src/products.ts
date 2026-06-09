import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'marmita-dia',
    name: 'Marmita Executiva Parmeggiana',
    description: 'Panqueca de carne moída com molho sugo, queijo gratinado, arroz, feijão e salada',
    price: 29.90,
    category: 'marmita',
    featured: true,
    image: '/src/assets/images/marmita_parmeggiana_1780442595203.png',
    sideDishes: 'arroz, feijão e salada'
  },
  {
    id: 'panqueca-carne',
    name: 'Panqueca de Carne Moída',
    description: 'Acompanhamentos: arroz e molho rosê',
    price: 22.90,
    category: 'panqueca',
    sideDishes: 'arroz, molho rosê'
  },
  {
    id: 'panqueca-frango',
    name: 'Panqueca de Frango com Catupiry',
    description: 'Acompanhamentos: arroz e molho branco',
    price: 24.90,
    category: 'panqueca',
    sideDishes: 'arroz, molho branco'
  },
  {
    id: 'panqueca-queijo',
    name: 'Panqueca de Queijo e Presunto',
    description: 'Acompanhamentos: arroz e molho sugo',
    price: 21.90,
    category: 'panqueca',
    sideDishes: 'arroz, molho sugo'
  },
  {
    id: 'panqueca-veg',
    name: 'Panqueca Vegetariana',
    description: 'Acompanhamentos: arroz integral, legumes salteados',
    price: 23.90,
    category: 'panqueca',
    sideDishes: 'arroz integral, legumes salteados'
  },
  {
    id: 'panqueca-integral',
    name: 'Panqueca Integral de Espinafre',
    description: 'Acompanhamentos: quinoa e molho de ervas',
    price: 24.90,
    category: 'panqueca',
    sideDishes: 'quinoa, molho de ervas'
  },
  {
    id: 'parmeggiana-frango',
    name: 'Parmeggiana de Frango',
    description: 'Acompanhamentos: arroz, fritas e queijo gratinado',
    price: 32.90,
    category: 'parmeggiana',
    sideDishes: 'arroz, fritas, queijo gratinado'
  },
  {
    id: 'parmeggiana-carne',
    name: 'Parmeggiana de Carne',
    description: 'Acompanhamentos: arroz, fritas, queijo gratinado e molho especial',
    price: 36.90,
    category: 'parmeggiana',
    sideDishes: 'arroz, fritas, queijo gratinado'
  },
  {
    id: 'strogonoff-frango',
    name: 'Strogonoff de Frango',
    description: 'Acompanhamentos: arroz e batata palha crocante',
    price: 26.90,
    category: 'strogonoff',
    sideDishes: 'arroz, batata palha'
  },
  {
    id: 'strogonoff-carne',
    name: 'Strogonoff de Carne',
    description: 'Acompanhamentos: arroz e batata palha crocante',
    price: 29.90,
    category: 'strogonoff',
    sideDishes: 'arroz, batata palha'
  },
  {
    id: 'coca-cola-lata',
    name: 'Coca-Cola Lata 350ml',
    description: 'Refrigerante gelado',
    price: 6.00,
    category: 'bebida'
  },
  {
    id: 'guarana-lata',
    name: 'Guaraná Antarctica Lata 350ml',
    description: 'Refrigerante gelado',
    price: 6.00,
    category: 'bebida'
  },
  {
    id: 'fanta-laranja-lata',
    name: 'Fanta Laranja Lata 350ml',
    description: 'Refrigerante gelado',
    price: 6.00,
    category: 'bebida'
  },
  {
    id: 'suco-uva',
    name: 'Suco de Uva 300ml',
    description: 'Suco natural gelado',
    price: 8.00,
    category: 'bebida'
  },
  {
    id: 'agua-mineral',
    name: 'Água Mineral 500ml',
    description: 'Com ou sem gás',
    price: 4.00,
    category: 'bebida'
  }
];
