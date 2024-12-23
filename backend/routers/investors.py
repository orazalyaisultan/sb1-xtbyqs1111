from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def read_investors():
    return {"message": "Investors endpoint"}