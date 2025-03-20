import { useContext, useState } from "react";
import { Button } from "./button";
import { CartContext } from "../providers/cart";
import { submitCart } from "../utils/api";

const TextInput = ({ label, name }: { label: string; name: string }) => {
  return (
    <div className="relative w-full">
      <label
        htmlFor="name"
        className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6"
        required
      />
    </div>
  );
};

const Alert = ({ message, type }: { message: string; type: string }) => {
  const bgColor = type === "success" ? "bg-green-50" : "bg-red-50";
  const textColor = type === "success" ? "text-green-800" : "text-red-800";

  return (
    <div className={`rounded-md ${bgColor} p-4`}>
      <p className={`text-sm font-base ${textColor}`}>{message}</p>
    </div>
  );
};

export const Form = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<{ message: string; type: string }>();
  
  const { cart } = useContext(CartContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    const customer = {
      name: formValues.name + " " + formValues.last_name,
      shipping_street: formValues.shipping_street,
      commune: formValues.commune,
      phone: formValues.phone,
    };

    const products = cart?.map((product: any) => ({
      productId: product.id,
      quantity: product.quantity,
      price: product.price,
      discount: product.discountPercentage,
    }));

    try {
      const { message, type } = await submitCart(customer, products);
      setResponse({ message, type });
    } catch (error: any) {
      console.error(error);
      setResponse({ message: error.message, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col space-y-4 m-10 w-1/2 place-self-center" onSubmit={handleSubmit}>
      <div className="flex lg:flex-row lg:space-x-2 w-full flex-col space-y-2">
        <TextInput label="Nombre" name="name" />
        <TextInput label="Apellido" name="last_name" />
      </div>
      <TextInput label="Dirección" name="shipping_street" />
      <TextInput label="Comuna" name="commune" />
      <TextInput label="Teléfono" name="phone" />
      <div className="place-self-center">
        <Button label="Cotizar despacho" type="submit" isLoading={isLoading}>
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
      </div>
      {response && <Alert message={response?.message} type={response?.type} />}
    </form>
  );
};
