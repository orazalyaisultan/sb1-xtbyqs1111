from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from models import DealStage

class DealBase(BaseModel):
    company_name: str
    stage: DealStage
    valuation: float
    industry: str
    status: str
    score: float

class DealCreate(DealBase):
    pass

class Deal(DealBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None