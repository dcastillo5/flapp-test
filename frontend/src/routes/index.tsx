import { useContext, useState } from "react";
import { Button } from "../components/button";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { CartContext } from "../providers/cart";
import { fetchRandomCart } from "../utils/api";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { cart, setCart } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateCart = async () => {
    setIsLoading(true);
    const products = await fetchRandomCart();
    setCart(products);
    setIsLoading(false);
  };

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      <header className="flex flex-col items-center justify-center h-screen text-2xl text-black">
        <h1 className="lg:text-9xl font-mono text-5xl font-semibold tracking-wide italic">Flapp</h1>
        <h2 className="text-3xl font-mono lg:text-7xl font-semibold text-center tracking-wide">
          <a className="underline decoration-sky-500 decoration-wavy">Random e-commerce</a>
        </h2>
        <p className="mt-8 text-2xl font-medium text-pretty text-neutral-500 text-center">
          Sorpréndete con un carrito lleno de productos al azar.
        </p>
        <div className="flex gap-x-4 mt-8">
          <Button
            label={cart?.length ? "Generar otro carrito" : "Generar carrito"}
            onClick={handleGenerateCart}
            isLoading={isLoading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </Button>
          <Link
            to="/checkout"
            inactiveProps={{ className: !cart?.length || isLoading ? "pointer-events-none" : "pointer-events-auto" }}
          >
            <Button label="Finalizar compra" disabled={!cart?.length || isLoading}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
            </Button>
          </Link>
        </div>
      </header>
    </div>
  );
}
