from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from app.database import Base
from app.database import engine

from app.models import *

from app.routers.products import router as product_router
from app.routers.customers import router as customer_router
from app.routers.orders import router as order_router
from app.routers.dashboard import router as dashboard_router

from app.utils.exception_handler import (
    generic_exception_handler
)

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Inventory Management System",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.add_exception_handler(
    Exception,
    generic_exception_handler
)

app.include_router(product_router)
app.include_router(customer_router)
app.include_router(order_router)
app.include_router(dashboard_router)

@app.get("/")
def health_check():

    return {
        "message": "Inventory API Running"
    }