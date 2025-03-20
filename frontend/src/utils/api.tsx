
const REACT_APP_BACKEND_URL = import.meta.env.BACKEND_URL

export const submitCart = async (customer: any, products: any) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers,
    body: JSON.stringify({ customer_data: customer, products }),
  };

  const response = await fetch(`${REACT_APP_BACKEND_URL}/api/cart`, requestOptions);

  if (response.status !== 200) {
    throw new Error("No hay envíos disponibles :(");
  }

  const data = await response.json();

  return {
    message: `Envío Flapp con ${data?.courier} ⚡️ - $${data?.fee.toFixed(2)}.`,
    type: "success",
  };
};

export const fetchRandomCart = async () => {
  const cartID = Math.floor(Math.random() * 50);
  const response = await fetch(`https://dummyjson.com/carts/${cartID}`);
  
  if (response.status !== 200) {
    throw new Error("No se pudo cargar el carrito :(");
  }

  const { products } = await response.json();

  return products;
};
