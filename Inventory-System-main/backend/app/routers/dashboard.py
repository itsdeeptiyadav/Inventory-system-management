from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.dependencies import get_db

from app.models.product import Product
from app.models.customer import Customer
from app.models.order import Order

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)
@router.get("/")
def dashboard(
    db: Session = Depends(get_db)
):

    total_products = db.query(
        Product
    ).count()

    total_customers = db.query(
        Customer
    ).count()

    total_orders = db.query(
        Order
    ).count()

    low_stock_products = db.query(
        Product
    ).filter(
        Product.quantity < 10
    ).all()

    return {
        "total_products": total_products,
        "total_customers": total_customers,
        "total_orders": total_orders,
        "low_stock_products": low_stock_products
    }