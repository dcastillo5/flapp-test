import { createContext, useState } from "react";

type Product = {
  id: number;
  discountPercentage: number;
  discountedTotal: number;
  price: number;
  quantity: number;
  thumbnail: string;
  title: string;
  total: number;
};

type CartContextType = {
  cart: Product[] | undefined;
  setCart: (cart: Product[]) => void;
};

export const CartContext = createContext<CartContextType>({
  cart: [] as Product[],
  setCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Product[]>();
  return <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>;
};
