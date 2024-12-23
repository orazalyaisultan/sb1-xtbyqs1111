from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    # Authentication settings
    SECRET_KEY: str = "development-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Test account credentials - for development only
    TEST_USER_EMAIL: str = "test@example.com"
    TEST_USER_PASSWORD: str = "test123"
    
    # Database settings
    DATABASE_URL: str = "sqlite:///./vc_crm.db"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

@lru_cache()
def get_settings():
    return Settings()

settings = get_settings()