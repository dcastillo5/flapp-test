import { Button } from "../components/button";
import { Form } from "../components/form";
import { Product } from "../components/product";
import { CartContext } from "../providers/cart";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useContext } from "react";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
});

function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  if (!cart?.length) {
    navigate({ to: "/" });
  }

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      <div className="flex flex-col space-y-2 items-center mt-10 w-full">
        <div className="pl-40 flex w-full">
          <Link to="/">
            <Button label="Volver">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
              </svg>
            </Button>
          </Link>
        </div>
        <h1 className="text-4xl font-semibold tracking-wide w-full text-center">
          Tu carrito ({cart?.reduce((acc: number, product: any) => acc + product.quantity, 0)} Items)
        </h1>
        <div className="flex space-x-2 m-4 text-2xl font-medium font-mono tabular-nums">
          <p className=" text-gray-400 line-through">
            ${cart?.reduce((acc: number, product: any) => acc + product.total, 0).toFixed(2)}
          </p>
          <p> ${cart?.reduce((acc: number, product: any) => acc + product.discountedTotal, 0).toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-start flex-col lg:flex-row px-4">
        <div className="space-y-2 lg:w-1/2 w-full">
          {cart?.map((product: any) => <Product key={product.id} product={product} />)}
          <div className="flex justify-center mb-6 w-full">
            <Link to="/">
              <Button
                label="Limpiar carrito"
                onClick={() => {
                  setCart([]);
                }}
              />
            </Link>
          </div>
        </div>
        <div className="space-y-2 lg:w-1/2 w-full flex flex-col justify-center">
          <h1 className="place-self-center text-2xl font-semibold tracking-wide">Información de envío</h1>
          <Form />
        </div>
      </div>
    </div>
  );
}
