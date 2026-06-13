from pydantic import BaseModel
from pydantic import EmailStr


class CustomerCreate(BaseModel):

    full_name: str

    email: EmailStr

    phone: str


class CustomerResponse(BaseModel):

    id: int

    full_name: str

    email: str

    phone: str

    class Config:
        from_attributes = True