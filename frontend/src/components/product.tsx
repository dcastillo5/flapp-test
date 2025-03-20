export const Product = ({ product }: any) => {
  const totalDiscount = (product.discountPercentage / 100) * product.total;
  return (
    <div className="flex flex-col lg:flex-row border-b-1 border-gray-200 p-4 place-self-center w-9/12">
      <div className="mr-4 shrink-0 self-center bg-gray-300/10">
        <img src={product.thumbnail} alt={product.name} className="lg:w-24 w-40 h-40 lg:h-24 bg-gray-300/10 rounded-xl" />
      </div>
      <div className="flex flex-row w-full justify-between">
        <div className="min-w-max space-y-1">
          <h4 className="text-lg font-bold whitespace-pre">{product.title}</h4>
          <p className="font-mono tabular-nums">Precio: ${product.price} </p>
          <p className="font-mono tabular-nums">Items: {product.quantity} </p>
          <p className="font-mono tabular-nums">Descuento: {product.discountPercentage}% </p>
        </div>
        <div className="flex flex-col w-full place-self-end text-lg font-medium font-mono tabular-nums">
          <div className="place-self-end shrink-0"> ${product.total.toFixed(2)}</div>
          <div className="border-b-1 border-black place-self-end whitespace-nowrap">- ${totalDiscount.toFixed(2)}</div>
          <div className="place-self-end shrink-0">${product.discountedTotal.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};
