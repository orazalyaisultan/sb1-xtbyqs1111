from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import crud, models, schemas
from database import get_db
from datetime import datetime

router = APIRouter()

@router.get("/", response_model=List[schemas.Deal])
async def read_deals(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    # Create some sample deals if none exist
    deals = crud.get_deals(db, skip=skip, limit=limit)
    if not deals:
        sample_deals = [
            {
                "company_name": "TechStart AI",
                "stage": "sourcing",
                "valuation": 5000000,
                "industry": "Artificial Intelligence",
                "status": "active",
                "score": 85
            },
            {
                "company_name": "CloudScale",
                "stage": "diligence",
                "valuation": 15000000,
                "industry": "Cloud Infrastructure",
                "status": "active",
                "score": 92
            }
        ]
        for deal_data in sample_deals:
            crud.create_deal(db, schemas.DealCreate(**deal_data))
        deals = crud.get_deals(db, skip=skip, limit=limit)
    
    return deals

@router.post("/", response_model=schemas.Deal)
async def create_deal(
    deal: schemas.DealCreate,
    db: Session = Depends(get_db)
):
    return crud.create_deal(db=db, deal=deal)