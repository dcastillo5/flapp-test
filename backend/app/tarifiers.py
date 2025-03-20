from data_model import Product, Store, Customer
from fastapi import HTTPException
from dotenv import load_dotenv
import requests
import json
import math
import os

load_dotenv()


CLP_TO_USD_CONVERSION_RATE = 919.88
TRAELOYA_API_URL = os.getenv("TRAELOYA_API_URL")
TRAELOYA_API_KEY = os.getenv("TRAELOYA_API_KEY")
UDER_API_URL = os.getenv("UDER_API_URL")
UDER_API_KEY = os.getenv("UDER_API_KEY")

def get_best_shipping_fee(products: list[Product], customer_data: Customer):
    uder_fee = fetch_uder_shipping_fee(products, customer_data)
    traeloYa_fee = fetch_traeloYa_shipping_fee(products, customer_data)

    if uder_fee == math.inf and traeloYa_fee == math.inf:
        raise HTTPException(
            status_code=400,
            detail="No courier has fee available for the requested shipment.",
        )

    print(f"🚛 Uder fee: {uder_fee}")
    print(f"🚛 TraeloYa fee: {traeloYa_fee}")

    if uder_fee <= traeloYa_fee:
        return {"courier": "Uder", "fee": uder_fee}
    else:
        return {"courier": "TraeloYa", "fee": traeloYa_fee}


def fetch_uder_shipping_fee(products: list[Product], customer_data: Customer):
    uder_response = fetch_Uder(products, customer_data)
    return uder_response.get("fee", math.inf)


def fetch_traeloYa_shipping_fee(products: list[Product], customer_data: Customer):
    traeloYa_tarifier = fetch_TraeloYa(products, customer_data)
    return clp_to_usd(
        traeloYa_tarifier.get("deliveryOffers", {})
        .get("pricing", {})
        .get("total", math.inf)
    )


def fetch_TraeloYa(products: list[Product], customer_data: Customer):
    headers = {"X-Api-Key": TRAELOYA_API_KEY, "Content-Type": "application/json"}
    body = build_TraeloYa_payload(products, customer_data)
    print("TraeloYa response: \n")
    response = request_tarifier(TRAELOYA_API_URL, json.dumps(body), headers)
    return response


def fetch_Uder(products: list[Product], customer_data: Customer):
    headers = {"X-Api-Key": UDER_API_KEY, "Content-Type": "application/json"}
    body = build_Uder_payload(products, customer_data)
    print("Uder response: \n")
    response = request_tarifier(UDER_API_URL, json.dumps(body), headers)
    return response


def request_tarifier(url: str, body: dict, headers: dict):
    res = requests.post(url, headers=headers, data=body, verify=False)
    response = res.json()
    print(json.dumps(response, indent=2))
    print("\n---------------------\n")
    return response


def clp_to_usd(clp: int):
    usd = clp / CLP_TO_USD_CONVERSION_RATE
    return usd


def build_TraeloYa_payload(products: list[Product], customer_data: Customer):
    store = Store()
    items = [
        {
            "quantity": product.quantity,
            "value": product.price,
            "volume": product.dimensions["width"]
            * product.dimensions["height"]
            * product.dimensions["depth"],
        }
        for product in products
    ]

    body = {
        "items": items,
        "waypoints": [
            {
                "type": "PICK_UP",
                "addressStreet": store.address,
                "city": store.commune,
                "phone": store.phone,
                "name": store.name,
            },
            {
                "type": "DROP_OFF",
                "addressStreet": customer_data.shipping_street,
                "city": customer_data.commune,
                "phone": customer_data.phone,
                "name": customer_data.name,
            },
        ],
    }

    return body


def build_Uder_payload(products: list[Product], customer_data: Customer):
    store = Store()
    items = [
        {
            "name": product.title,
            "quantity": product.quantity,
            "price": product.price,
            "dimensions": {
                "width": product.dimensions["width"],
                "height": product.dimensions["height"],
                "depth": product.dimensions["depth"],
            },
        }
        for product in products
    ]

    body = {
        "manifest_items": items,
        "pickup_address": store.address,
        "pickup_name": store.name,
        "pickup_phone_number": store.phone,
        "dropoff_address": customer_data.shipping_street,
        "dropoff_name": customer_data.name,
        "dropoff_phone_number": customer_data.phone,
    }

    return body
