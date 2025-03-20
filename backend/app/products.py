from fastapi import HTTPException
import requests
from data_model import Product, CartProduct
from math import floor

DEFAULT_LIMIT = 100
DEFAULT_SKIP = 0


def validate_products_stock(products: list[Product]):
    for product in products:
        if product.quantity > product.real_stock:
            raise HTTPException(
                status_code=400,
                detail=f"Not enough real stock available for product with id {product.productId}.",
            )
    return True


def process_cart_products(products: list[CartProduct]):
    all_products = fetch_all_products()
    processed_products: list[Product] = []
    for cart_product in products:
        processed_product = process_cart_product(cart_product, all_products)
        processed_products.append(processed_product)
        print(str(processed_product))
    print("\n---------------------\n")
    return processed_products


def process_cart_product(cart_product: CartProduct, all_products):
    product_data = get_product_by_id(cart_product.productId, all_products)

    if not product_data:
        raise HTTPException(
            status_code=400,
            detail=f"Product with id {cart_product.productId} not found.",
        )

    processed_product = Product(**product_data, **cart_product.dict())
    processed_product.real_stock = floor(processed_product.stock / processed_product.rating)
    return processed_product


def fetch_all_products():
    skip = DEFAULT_SKIP
    limit = DEFAULT_LIMIT
    all_products = []
    while limit == DEFAULT_LIMIT:
        response = fetch_data(
            f"https://dummyjson.com/products?limit={limit}&skip={skip}&select=id,title,stock,rating,dimensions"
        )
        limit = response["limit"]
        skip = response["skip"] + limit
        all_products.extend(response["products"])
    return all_products


def fetch_data(url: str):
    res = requests.get(url)
    return res.json()


def get_product_by_id(product_id, all_products):
    for product in all_products:
        if product["id"] == product_id:
            return product
