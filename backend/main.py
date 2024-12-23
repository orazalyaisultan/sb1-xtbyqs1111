from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models
from database import engine
from auth.router import router as auth_router
from routers import deals

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="VC CRM API")

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(deals.router, prefix="/api/deals", tags=["deals"])

@app.get("/")
async def root():
    return {"message": "VC CRM API is running"}