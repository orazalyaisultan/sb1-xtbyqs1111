from sqlalchemy.orm import Session
from sqlalchemy import desc
import models, schemas
from datetime import datetime

def get_deals(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Deal).order_by(desc(models.Deal.updated_at)).offset(skip).limit(limit).all()

def get_deal(db: Session, deal_id: int):
    return db.query(models.Deal).filter(models.Deal.id == deal_id).first()

def create_deal(db: Session, deal: schemas.DealCreate):
    now = datetime.utcnow()
    db_deal = models.Deal(
        **deal.dict(),
        created_at=now,
        updated_at=now
    )
    db.add(db_deal)
    db.commit()
    db.refresh(db_deal)
    return db_deal