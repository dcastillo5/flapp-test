from pydantic import BaseModel, Field


class CartProduct(BaseModel):
    productId: int
    price: float
    quantity: int
    discount: float


class Product(CartProduct):
    title: str
    dimensions: dict
    stock: int
    rating: float
    real_stock: int = Field(default=None)

    def __str__(self):
        msg = f"\nProduct {self.productId} - {self.title}\n"
        msg += f"    price: {self.price}\n"
        msg += f"    discount: {self.discount}\n"
        msg += f"    quantity: {self.quantity}\n"
        msg += f"    stock: {self.stock}\n"
        msg += f"    rating: {self.rating}\n"
        msg += f"    real stock: {self.real_stock}\n"
        return msg


class Customer(BaseModel):
    name: str
    shipping_street: str
    commune: str
    phone: str


class Cart(BaseModel):
    products: list[CartProduct]
    customer_data: Customer


class Store(BaseModel):
    name: str = Field(default="Tienda Flapp")
    address: str = Field(default="Juan de Valiente 3630")
    phone: str = Field(default="+569 1234 5678")
    commune: str = Field(default="Vitacura")
