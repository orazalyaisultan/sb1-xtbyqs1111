from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def read_portfolio():
    return {"message": "Portfolio endpoint"}