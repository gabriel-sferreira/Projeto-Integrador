import { Product, Category } from '../types';

export const categories: Category[] = [
  {
    id: 1,
    name: 'Eletrônicos',
    slug: 'eletronicos',
    image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 2,
    name: 'Moda',
    slug: 'moda',
    image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 3,
    name: 'Casa & Decoração',
    slug: 'casa-decoracao',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 4,
    name: 'Esportes',
    slug: 'esportes',
    image: 'https://images.pexels.com/photos/4761352/pexels-photo-4761352.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Smartphone XR Pro',
    price: 2499.90,
    oldPrice: 2999.90,
    description: 'Smartphone de última geração com câmera de alta resolução, processador potente e bateria de longa duração. Ideal para quem busca desempenho e qualidade em um único aparelho. Disponível em várias cores e com 128GB de armazenamento interno.',
    shortDescription: 'Smartphone com câmera profissional, 8GB RAM e 128GB de armazenamento.',
    images: [
      'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'Eletrônicos',
    tags: ['smartphone', 'tecnologia', 'câmera'],
    rating: 4.8,
    stock: 25,
    featured: true,
    sale: true
  },
  {
    id: 2,
    name: 'Notebook UltraSlim',
    price: 4999.90,
    description: 'Notebook leve e potente para trabalho e entretenimento. Com processador de última geração, SSD rápido e tela de alta definição. Perfeito para profissionais que precisam de mobilidade sem abrir mão do desempenho.',
    shortDescription: 'Notebook ultrafino com processador Intel i7, 16GB RAM e SSD de 512GB.',
    images: [
      'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'Eletrônicos',
    tags: ['notebook', 'computador', 'trabalho'],
    rating: 4.7,
    stock: 12,
    featured: true
  },
  {
    id: 3,
    name: 'Tênis Running Flex',
    price: 349.90,
    oldPrice: 429.90,
    description: 'Tênis para corrida com tecnologia de amortecimento avançada, material respirável e solado flexível para maior conforto durante os treinos. Desenvolvido para corridas de longa distância e treinos intensos.',
    shortDescription: 'Tênis esportivo com amortecimento e suporte para corridas.',
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'Esportes',
    tags: ['tênis', 'corrida', 'esporte'],
    rating: 4.5,
    stock: 30,
    sale: true
  },
  {
    id: 4,
    name: 'Camiseta Básica Premium',
    price: 89.90,
    description: 'Camiseta de algodão premium com corte moderno e acabamento de qualidade. Disponível em diversas cores e tamanhos. Tecido macio e durável para uso diário com estilo e conforto.',
    shortDescription: 'Camiseta de algodão de alta qualidade com corte moderno.',
    images: [
      'https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/4210863/pexels-photo-4210863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'Moda',
    tags: ['camiseta', 'roupa', 'casual'],
    rating: 4.3,
    stock: 45,
    new: true
  },
  {
    id: 5,
    name: 'Poltrona Decorativa Confort',
    price: 799.90,
    oldPrice: 999.90,
    description: 'Poltrona decorativa com design moderno e acabamento premium. Estrutura resistente em madeira maciça e estofado macio em tecido premium. Perfeita para complementar a decoração da sua sala com estilo e conforto.',
    shortDescription: 'Poltrona de design moderno com tecido premium e conforto excepcional.',
    images: [
      'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'Casa & Decoração',
    tags: ['poltrona', 'móveis', 'decoração', 'sala'],
    rating: 4.6,
    stock: 8,
    featured: true,
    sale: true
  },
  {
    id: 6,
    name: 'Fone de Ouvido Bluetooth',
    price: 299.90,
    description: 'Fone de ouvido sem fio com tecnologia Bluetooth 5.0, bateria de longa duração e qualidade de som excepcional. Inclui estojo de carregamento portátil e diferentes tamanhos de ponteiras para melhor ajuste.',
    shortDescription: 'Fone wireless com cancelamento de ruído e bateria de longa duração.',
    images: [
      'https://images.pexels.com/photos/3394654/pexels-photo-3394654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'Eletrônicos',
    tags: ['fone', 'áudio', 'música', 'bluetooth'],
    rating: 4.4,
    stock: 18,
    new: true
  },
  {
    id: 7,
    name: 'Relógio Smartwatch',
    price: 549.90,
    oldPrice: 699.90,
    description: 'Smartwatch com múltiplas funcionalidades como monitoramento cardíaco, contagem de passos, notificações e mais de 20 modos esportivos. Resistente à água e com bateria que dura até 14 dias.',
    shortDescription: 'Relógio inteligente com monitor cardíaco e múltiplas funções esportivas.',
    images: [
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'Eletrônicos',
    tags: ['relógio', 'smartwatch', 'fitness'],
    rating: 4.5,
    stock: 15,
    sale: true
  },
  {
    id: 8,
    name: 'Mochila Urbana',
    price: 179.90,
    description: 'Mochila com design urbano, compartimentos organizadores e porta notebook. Material resistente à água e alças acolchoadas para maior conforto durante o uso diário ou em viagens curtas.',
    shortDescription: 'Mochila resistente com compartimento para notebook e múltiplos bolsos.',
    images: [
      'https://images.pexels.com/photos/1294731/pexels-photo-1294731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'Moda',
    tags: ['mochila', 'acessório', 'viagem'],
    rating: 4.2,
    stock: 22,
    new: true
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.new);
};

export const getSaleProducts = (): Product[] => {
  return products.filter(product => product.sale);
};