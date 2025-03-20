from data_model import Cart
from fastapi import FastAPI, HTTPException
from products import process_cart_products, validate_products_stock
from tarifiers import get_best_shipping_fee
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/cart")
def process_cart(cart: Cart):
    try:
        print(f"========= Processing cart: {cart.customer_data.name} =========")
        processed_products = process_cart_products(cart.products)
        validate_products_stock(processed_products)
        best_fee = get_best_shipping_fee(processed_products, cart.customer_data)
        return best_fee

    except HTTPException as error:
        print(f"Error processing cart: {error.detail}")
        raise error

    except Exception as error:
        print(f"Unknown Error: {error}")
        raise HTTPException(status_code=500, detail=str(error))

    finally:
        print("\n===========================")

@app.get("/")
def health():
    return {"status": "ok"}
