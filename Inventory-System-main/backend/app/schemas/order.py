from pydantic import BaseModel
from pydantic import Field


class OrderCreate(BaseModel):

    customer_id: int

    product_id: int

    quantity: int = Field(gt=0)


class OrderResponse(BaseModel):

    id: int

    customer_id: int

    product_id: int

    quantity: int

    total_amount: float

    class Config:
        from_attributes = True